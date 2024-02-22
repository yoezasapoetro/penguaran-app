import { randomUUID } from "crypto";
import { AdapterAccount } from "next-auth/adapters"
import { ProviderType } from "next-auth/providers";

import { Account } from "../models";

export function buildAccountFromAdapterAccount(account: AdapterAccount): Account {
    const uuid = (): string => randomUUID()
    const accountType: ProviderType | "oidc" = account.type
    const sessionState = account?.session_state ? account?.session_state.toString() : null

    return {
        type: accountType.toString(),
        userId: account.userId,
        providerAccountId: account.providerAccountId,
        provider: account.provider,
        access_token: account?.access_token || null,
        token_type: account?.token_type || null,
        id_token: account?.id_token || null,
        refresh_token: account?.refresh_token || null,
        scope: account?.scope || null,
        expires_at: account?.expires_at || null,
        session_state: sessionState,
        id: uuid(),
    }
}

export function toAdapterAccount(_account: Account): AdapterAccount {
    return {
        userId: _account.userId,
        providerAccountId: _account.providerAccountId,
        provider: _account.provider,
        type: _account.type as any,
        access_token: _account?.access_token || undefined,
        token_type: _account?.token_type || undefined,
        id_token: _account?.id_token || undefined,
        refresh_token: _account?.refresh_token || undefined,
        scope: _account?.scope || undefined,
        expires_at: _account?.expires_at || undefined,
        session_state: _account?.session_state || undefined,
    }
}
