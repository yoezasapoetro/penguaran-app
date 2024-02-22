import { eq } from "drizzle-orm";

import { session } from "db/schemas/sqlite";
import { Session, SessionCreated } from "db/models";
import AbstractRepository from "./AbstractRepository";

export default class SessionRepository extends AbstractRepository<Session> {
    async create(payload: SessionCreated): Promise<Session> {
        return this.client
            .insert(session)
            .values(payload)
            .returning()
            .get()
    }

    async getBySessionToken(sessionToken: string): Promise<Session | undefined> {
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
