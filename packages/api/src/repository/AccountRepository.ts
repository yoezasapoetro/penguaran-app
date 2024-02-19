import { and, eq } from "drizzle-orm";

import { account } from "db/schemas/sqlite";
import { AccountCreated, Account } from "db/models";
import SqliteAbstractRepository from "./SqliteAbstractRepository";

export default class AccountRepository extends SqliteAbstractRepository<Account> {
    async getAccountByProvider(providerAccountId: string, provider: string): Promise<Account | undefined> {
        return this.client
            .select()
            .from(account)
            .where(and(
                eq(account.providerAccountId, providerAccountId),
                eq(account.provider, provider)
            ))
            .get()
    }

    async create(_account: AccountCreated): Promise<Account | undefined> {
        return this.client
            .insert(account)
            .values(_account)
            .returning()
            .get()
    }
}
