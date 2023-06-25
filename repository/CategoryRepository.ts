import { eq, desc, and, isNull } from "drizzle-orm";
import { type NeonDatabase } from "drizzle-orm/neon-serverless";

import { category } from "@/db/schemas/pg";
import { Category, CategoryModel } from "@/lib/models"

type CategoryPayload = {
    name: string
}

export default class CategoryRepository {
    private client: NeonDatabase<Category>
    private userId: string

    constructor(client: NeonDatabase<Category>, userId: string) {
        this.client = client
        this.userId = userId
    }

    async getAll(): Promise<Array<Partial<Category>>> {
        return await this.client
            .select({
                id: category.id,
                name: category.name,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            })
            .from(category)
            .where(and(
                eq(category.userId, this.userId),
                isNull(category.deletedAt)
            ))
            .orderBy(desc(category.createdAt))
    }

    async getById(id: number): Promise<Partial<Category> | null> {
        const [singleCategory] = await this.client
            .select({
                id: category.id,
                name: category.name,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            })
            .from(category)
            .where(and(
                eq(category.id, id),
                isNull(category.deletedAt)
            ))

        return singleCategory ?? null
    }

    async create(payload: CategoryPayload): Promise<Category> {
        const createCategory: CategoryModel = {
            name: payload.name,
            userId: this.userId,
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
            updatedAt: new Date().toUTCString()
        }

        const [updated] = await this.client
            .update(category)
            .set(updateCategory)
            .where(eq(category.id, id))
            .returning()

        return updated
    }

    async remove(id: number, forceDelete: boolean = false): Promise<Category> {
        let source: Category
        if (forceDelete) {
            const [forceDeleted] = await this.client
                .delete(category)
                .where(eq(category.id, id))
                .returning()
            source = forceDeleted
        } else {
            const [softDeleted] = await this.client
                .update(category)
                .set({
                    deletedAt: new Date().toUTCString()
                })
                .where(eq(category.id, id))
                .returning()
            source = softDeleted
        }

        return source
    }
}
