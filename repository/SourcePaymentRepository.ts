import { eq, desc, and, isNull } from "drizzle-orm";
import { type NeonDatabase } from "drizzle-orm/neon-serverless";

import { sourcePayment } from "@/db/schemas/pg";
import { SourcePayment, SourcePaymentModel } from "@/lib/models"

type SourcePaymentPayload = {
    name: string
    type: string
}

export default class SourcePaymentRepository {
    private client: NeonDatabase<SourcePayment>
    private userId: string

    constructor(client: NeonDatabase<SourcePayment>, userId: string) {
        this.client = client
        this.userId = userId
    }

    async getAll(limit: number): Promise<Array<Partial<SourcePayment>>> {
        return await this.client
            .select({
                id: sourcePayment.id,
                name: sourcePayment.name,
                type: sourcePayment.type,
                createdAt: sourcePayment.createdAt,
                updatedAt: sourcePayment.updatedAt,
            })
            .from(sourcePayment)
            .where(and(
                eq(sourcePayment.userId, this.userId),
                isNull(sourcePayment.deletedAt)
            ))
            .limit(limit)
            .orderBy(desc(sourcePayment.createdAt))
    }

    async getById(id: number): Promise<Partial<SourcePayment> | null> {
        const [singleSourcePayment] = await this.client
            .select({
                id: sourcePayment.id,
                name: sourcePayment.name,
                type: sourcePayment.type,
                createdAt: sourcePayment.createdAt,
                updatedAt: sourcePayment.updatedAt,
            })
            .from(sourcePayment)
            .where(and(
                eq(sourcePayment.id, id),
                eq(sourcePayment.userId, this.userId),
                isNull(sourcePayment.deletedAt)
            ))

        return singleSourcePayment ?? null
    }

    async create(payload: SourcePaymentPayload): Promise<SourcePayment> {
        const createSourcePayment: SourcePaymentModel = {
            name: payload.name,
            type: payload.type,
            userId: this.userId,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString()
        }

        const [created] = await this.client
            .insert(sourcePayment)
            .values(createSourcePayment)
            .returning()
        return created
    }

    async edit(id: number, payload: SourcePaymentPayload): Promise<SourcePayment> {
        const updateSourcePayment: SourcePaymentModel = {
            name: payload.name,
            type: payload.type,
            updatedAt: new Date().toUTCString()
        }

        const [updated] = await this.client
            .update(sourcePayment)
            .set(updateSourcePayment)
            .where(and(
                eq(sourcePayment.id, id),
                eq(sourcePayment.userId, this.userId),
            ))
            .returning()

        return updated
    }

    async remove(id: number, forceDelete: boolean = false): Promise<SourcePayment> {
        let source: SourcePayment
        if (forceDelete) {
            const [forceDeleted] = await this.client
                .delete(sourcePayment)
                .where(and(
                    eq(sourcePayment.id, id),
                    eq(sourcePayment.userId, this.userId),
                ))
                .returning()
            source = forceDeleted
        } else {
            const [softDeleted] = await this.client
                .update(sourcePayment)
                .set({
                    deletedAt: new Date().toUTCString()
                })
                .where(and(
                    eq(sourcePayment.id, id),
                    eq(sourcePayment.userId, this.userId),
                ))
                .returning()
            source = softDeleted
        }

        return source
    }
}

