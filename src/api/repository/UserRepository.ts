import { eq } from "drizzle-orm";

import { user } from "db/schemas/pg"
import { User, UserCreated } from "db/models";
import AbstractRepository from "./AbstractRepository";

export default class UserRepository extends AbstractRepository<User> {
    async getByEmail(email: string): Promise<User | null> {
        const [existUser]: User[] = await this.client
            .select()
            .from(user)
            .where(
                eq(user.email, email)
            )

        if (!existUser) return null
        return existUser
    }

    async create(payload: UserCreated): Promise<User> {
        const [created]: User[] = await this.client
            .insert(user)
            .values(payload)
            .onConflictDoNothing()
            .returning()

        return created
    }

    async update(payload: Omit<UserCreated, "id">, id: string): Promise<User> {
        const [updated]: User[] = await this.client
            .update(user)
            .set(payload)
            .where(
                eq(user.id, id)
            )
            .returning()

        return updated
    }

    async remove(id: string): Promise<null> {
        await this.client
            .delete(user)
            .where(
                eq(user.id, id)
            )
        return null
    }
}
