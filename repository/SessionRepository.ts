import { LibSQLDatabase } from "drizzle-orm/libsql";

import { session } from "@/db/schemas/sqlite";
import { Session, SessionCreated } from "@/lib/models";
import { eq } from "drizzle-orm";

export default class SessionRepository<T extends Record<string, unknown>> {
    private client: LibSQLDatabase<T>

    constructor(client: LibSQLDatabase<T>) {
        this.client = client
    }

    async create(payload: SessionCreated): Promise<void> {
        this.client.insert(session).values(payload).run()
    }

    async getBySessionToken(sessionToken: string): Promise<Session> {
        const _session: Session = await this.client
            .select()
            .from(session)
            .where(
                eq(session.sessionToken, sessionToken)
            ).get()
        return _session
    }

    async update(payload: SessionCreated, sessionToken: string): Promise<Session> {
        const _session: Session = await this.client.update(session)
            .set(payload)
            .where(
                eq(session.sessionToken, sessionToken)
            )
            .returning()
            .get()
        return _session
    }

    async remove(sessionToken: string): Promise<void> {
        this.client.delete(session)
            .where(
                eq(session.sessionToken, sessionToken)
            )
    }
}
