import { eq, desc, and, isNull } from "drizzle-orm";
import { type NeonDatabase } from "drizzle-orm/neon-serverless";

import { store } from "@/db/schemas/pg";
import { Store, StoreModel } from "@/lib/models"

type StorePayload = {
    name: string
    type: string
    address?: string
}

export default class StoreRepository {
    private client: NeonDatabase<Store>
    private userId: string

    constructor(client: NeonDatabase<Store>, userId: string) {
        this.client = client
        this.userId = userId
    }

    async getAll(limit: number): Promise<Array<Partial<Store>>> {
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
            .limit(limit)
            .orderBy(desc(store.createdAt))
    }

    async getById(id: number): Promise<Partial<Store> | null> {
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

        return singleStore ?? null
    }

    async create(payload: StorePayload): Promise<Store> {
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

    async edit(id: number, payload: StorePayload): Promise<Store> {
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

    async remove(id: number, forceDelete: boolean = false): Promise<Store> {
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


