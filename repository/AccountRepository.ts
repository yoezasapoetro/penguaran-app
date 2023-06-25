import { and, eq } from "drizzle-orm";
import { LibSQLDatabase } from "drizzle-orm/libsql";

import { account } from "@/db/schemas/sqlite";
import { Account, AccountCreated } from "@/lib/models";

export default class AccountRepository<T extends Record<string, unknown>> {
    private client: LibSQLDatabase<T>

    constructor(client: LibSQLDatabase<T>) {
        this.client = client
    }

    async getAccountByProvider(providerAccountId: string, provider: string): Promise<Account> {
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
