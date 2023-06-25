import { LibSQLDatabase } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm"

import { user as base_user } from "@/db/schemas/sqlite"
import { BaseUser, BaseUserCreated } from "@/lib/models"

export default class BaseUserRepository<T extends Record<string, unknown>> {
    private client: LibSQLDatabase<T>

    constructor(client: LibSQLDatabase<T>) {
        this.client = client
    }

    async getById(userId: string): Promise<BaseUser> {
        return this.client
            .select()
            .from(base_user)
            .where(
                eq(base_user.id, userId)
            )
            .get()
    }

    async getByEmail(email: string): Promise<BaseUser> {
        return this.client
            .select()
            .from(base_user)
            .where(
                eq(base_user.email, email)
            )
            .get()
    }

    async create(payload: BaseUserCreated): Promise<BaseUser> {
        return this.client
            .insert(base_user)
            .values(payload)
            .returning()
            .get()
    }

    async update(payload: Partial<BaseUserCreated>, id: string): Promise<BaseUser> {
        return this.client
            .update(base_user)
            .set(payload)
            .where(
                eq(base_user.id, id)
            )
            .returning()
            .get()
    }

    async remove(id: string): Promise<null> {
        await this.client
            .delete(base_user)
            .where(
                eq(base_user.id, id)
            )
            .run()
        return null
    }
}

