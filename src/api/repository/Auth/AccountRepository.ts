import { and, eq } from "drizzle-orm";

import { account } from "db/schemas/sqlite";
import { AccountCreated, Account } from "db/models";

import AbstractRepository from "./AbstractRepository";

export default class AccountRepository extends AbstractRepository<Account> {
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

    async create(_account: AccountCreated): Promise<Account> {
        return this.client
            .insert(account)
            .values(_account)
            .returning()
            .get()
    }
}
