import { AdapterAccount } from "@auth/core/adapters"
import { Account } from "../models";
import { randomUUID } from "crypto";
import { ProviderType } from "next-auth/providers";

export function buildAccountFromAdapterAccount(
    account: AdapterAccount
): Account {
    const uuid = (): string => randomUUID()
    const accountType: ProviderType | "oidc" = account.type

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
        session_state: account?.session_state ? account?.session_state.toString() : null,
        id: uuid(),
    }
}
