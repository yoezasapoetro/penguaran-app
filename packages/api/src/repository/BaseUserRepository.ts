import { eq } from "drizzle-orm"

import { user as base_user } from "db/schemas/sqlite"
import { BaseUser, BaseUserCreated } from "db/models"
import SqliteAbstractRepository from "./SqliteAbstractRepository"

export default class BaseUserRepository extends SqliteAbstractRepository<BaseUser> {
    async getById(userId: string): Promise<BaseUser | undefined> {
        return this.client
            .select()
            .from(base_user)
            .where(
                eq(base_user.id, userId)
            )
            .get()
    }

    async getByEmail(email: string): Promise<BaseUser | undefined> {
        return this.client
            .select()
            .from(base_user)
            .where(
                eq(base_user.email, email)
            )
            .get()
    }

    async create(payload: BaseUserCreated): Promise<BaseUser | undefined> {
        return this.client
            .insert(base_user)
            .values(payload)
            .returning()
            .get()
    }

    async update(payload: Partial<BaseUserCreated>, id: string): Promise<BaseUser | undefined> {
        return this.client
            .update(base_user)
            .set(payload)
            .where(
                eq(base_user.id, id)
            )
            .returning()
            .get()
    }

    async remove(id: string): Promise<void> {
        await this.client
            .delete(base_user)
            .where(
                eq(base_user.id, id)
            )
            .run()
    }
}

