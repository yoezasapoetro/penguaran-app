import { LibSQLDatabase } from "drizzle-orm/libsql";

import { session } from "@/db/schemas/sqlite";
import { Session, SessionCreated } from "@/lib/models";
import { eq } from "drizzle-orm";

export default class SessionRepository<T extends Record<string, unknown>> {
    private client: LibSQLDatabase<T>

    constructor(client: LibSQLDatabase<T>) {
        this.client = client
    }

    async create(payload: SessionCreated): Promise<Session> {
        return this.client
            .insert(session)
            .values(payload)
            .returning()
            .get()
    }

    async getBySessionToken(sessionToken: string): Promise<Session> {
        return await this.client
            .select()
            .from(session)
            .where(
                eq(session.sessionToken, sessionToken)
            ).get()
    }

    async update(payload: SessionCreated, sessionToken: string): Promise<Session> {
        return this.client.update(session)
            .set(payload)
            .where(
                eq(session.sessionToken, sessionToken)
            )
            .returning()
            .get()
    }

    async remove(sessionToken: string): Promise<Session | null> {
        const _session: Session | undefined = await this.client.delete(session)
            .where(
                eq(session.sessionToken, sessionToken)
            )
            .returning()
            .get()
        if (!_session) return null
        return _session
    }
}
