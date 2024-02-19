import { eq, desc, and, isNull, sql } from "drizzle-orm";

import { category } from "db/schemas/pg";
import { Category, CategoryModel } from "db/models"
import AbstractRepository from "./AbstractRepository";

type CategoryPayload = {
    name: string
    priority: number
}

export default class CategoryRepository extends AbstractRepository<Category> {
    private selectAllSubquery() {
        return this.client
            .$with("selectAllSubquery")
            .as(
                this.client
                    .select()
                    .from(category)
                    .where(and(
                        eq(category.userId, this.userId),
                        isNull(category.deletedAt)
                    ))
                    .orderBy(
                        desc(category.priority),
                        desc(category.updatedAt)
                    )
            )
    }

    async getAll(offset: number, limit: number): Promise<Array<Partial<Category>>> {
        const subquery = this.selectAllSubquery()

        const data = await this.client
            .with(subquery)
            .select({
                id: subquery.id,
                name: subquery.name,
                priority: subquery.priority,
                createdAt: subquery.createdAt,
                updatedAt: subquery.updatedAt,
            })
            .from(subquery)
            .offset(offset)
            .limit(limit)

        return data
    }

    async countAll(): Promise<number> {
        const subquery = this.selectAllSubquery()

        const [{ total }]: Array<{ total: number }> = await this.client
            .with(subquery)
            .select({
                total: sql<number>`count(*)`
            })
            .from(subquery)

        return total
    }

    async getById(id: number): Promise<Partial<Category> | null> {
        const [singleCategory] = await this.client
            .select({
                id: category.id,
                name: category.name,
                priority: category.priority,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            })
            .from(category)
            .where(and(
                eq(category.id, id),
                eq(category.userId, this.userId),
                isNull(category.deletedAt)
            ))

        return singleCategory ?? null
    }

    async create(payload: CategoryPayload): Promise<Category> {
        const createCategory: CategoryModel = {
            name: payload.name,
            userId: this.userId,
            priority: payload.priority,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString()
        }

        const [created] = await this.client
            .insert(category)
            .values(createCategory)
            .returning()
        return created
    }

    async edit(id: number, payload: CategoryPayload): Promise<Category> {
        const updateCategory: CategoryModel = {
            name: payload.name,
            priority: payload.priority,
            updatedAt: new Date().toUTCString()
        }

        const [updated] = await this.client
            .update(category)
            .set(updateCategory)
            .where(and(
                eq(category.id, id),
                eq(category.userId, this.userId),
            ))
            .returning()

        return updated
    }

    async remove(id: number, forceDelete: boolean = false): Promise<Category> {
        let source: Category
        if (forceDelete) {
            const [forceDeleted] = await this.client
                .delete(category)
                .where(and(
                    eq(category.id, id),
                    eq(category.userId, this.userId),
                ))
                .returning()
            source = forceDeleted
        } else {
            const [softDeleted] = await this.client
                .update(category)
                .set({
                    deletedAt: new Date().toUTCString()
                })
                .where(and(
                    eq(category.id, id),
                    eq(category.userId, this.userId),
                ))
                .returning()
            source = softDeleted
        }

        return source
    }
}
