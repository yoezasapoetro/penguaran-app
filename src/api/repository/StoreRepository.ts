import { eq, desc, and, isNull, sql } from "drizzle-orm";

import { store } from "db/schemas/pg";
import { Store, StoreModel } from "db/models"
import AbstractRepository from "./AbstractRepository";
import { StoreItemsReturn, StoreFormData } from "types/Store";

export default class StoreRepository extends AbstractRepository<Store> {
    async getAll(offset: number, limit: number): Promise<StoreItemsReturn> {
        return await this.client
            .select({
                id: store.id,
                name: store.name,
                type: store.type,
                address: store.address,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
            })
            .from(store)
            .where(and(
                eq(store.userId, this.userId),
                isNull(store.deletedAt)
            ))
            .offset(offset)
            .limit(limit)
            .orderBy(desc(store.createdAt))
    }

    async countAll(): Promise<number> {
        const [{ count }] = await this.client
            .select({
                count: sql<number>`count(*)`
            })
            .from(store)
            .where(and(
                eq(store.userId, this.userId),
                isNull(store.deletedAt)
            ))

        return count
    }

    async getById(id: number): Promise<Omit<Store, "deletedAt" | "userId"> | null> {
        const [singleStore] = await this.client
            .select({
                id: store.id,
                name: store.name,
                type: store.type,
                address: store.address,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
            })
            .from(store)
            .where(and(
                eq(store.id, id),
                eq(store.userId, this.userId),
                isNull(store.deletedAt)
            ))

        return singleStore
    }

    async create(payload: StoreFormData): Promise<StoreModel> {
        const createStore: StoreModel = {
            name: payload.name,
            type: payload.type,
            address: payload.address,
            userId: this.userId,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString()
        }

        const [created] = await this.client
            .insert(store)
            .values(createStore)
            .returning()
        return created
    }

    async edit(id: number, payload: StoreFormData): Promise<StoreModel> {
        const updateStore: StoreModel = {
            name: payload.name,
            type: payload.type,
            address: payload.address,
            updatedAt: new Date().toUTCString()
        }

        const [updated] = await this.client
            .update(store)
            .set(updateStore)
            .where(and(
                eq(store.id, id),
                eq(store.userId, this.userId),
            ))
            .returning()

        return updated
    }

    async remove(id: number, forceDelete: boolean = false): Promise<StoreModel> {
        let source: Store
        if (forceDelete) {
            const [forceDeleted] = await this.client
                .delete(store)
                .where(and(
                    eq(store.id, id),
                    eq(store.userId, this.userId),
                ))
                .returning()
            source = forceDeleted
        } else {
            const [softDeleted] = await this.client
                .update(store)
                .set({
                    deletedAt: new Date().toUTCString()
                })
                .where(and(
                    eq(store.id, id),
                    eq(store.userId, this.userId),
                ))
                .returning()
            source = softDeleted
        }

        return source
    }
}


