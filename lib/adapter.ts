import {
    AdapterAccount,
    AdapterUser,
    AdapterSession,
    DefaultAdapter,
} from "next-auth/adapters"
import type { NeonDatabase } from "drizzle-orm/neon-serverless"
import { LibSQLDatabase } from "drizzle-orm/libsql"
import { parseJSON } from "date-fns"

import {
    User,
    BaseUser,
    Account,
    Session,
    SessionCreated,
} from "@/lib/models"
import {
    buildUserFromAdapterUser,
    buildBaseUserFromAdapterUser
} from "@/lib/dto/baseUserDto"
import { buildBaseUserFromUser } from "./dto/userDto"
import { buildAccountFromAdapterAccount } from "./dto/accountDto"

import BaseUserRepository from "@/repository/BaseUserRepository"
import UserRepository from "@/repository/UserRepository"
import AccountRepository from "@/repository/AccountRepository"
import SessionRepository from "@/repository/SessionRepository"

function toNextSession(_session: Session): AdapterSession {
    const _nextSession: AdapterSession = {
        userId: _session.userId,
        sessionToken: _session.sessionToken,
        expires: parseJSON(_session.expires as string)
    }

    return _nextSession
}

function toAdapterUser(_user: BaseUser): AdapterUser {
    return {
        id: _user.id,
        email: _user.email,
        name: _user?.name,
        image: _user?.image,
        emailVerified: _user.emailVerified ? parseJSON(_user.emailVerified) : null
    }
}

function toAdapterAccount(_account: Account): AdapterAccount {
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

export function DrizzleAdapter(client: NeonDatabase<User>, clientSqlite: LibSQLDatabase<BaseUser | Session | Account>): DefaultAdapter {
    const userRepository = new UserRepository(client)
    const baseUserRepository = new BaseUserRepository<BaseUser>(clientSqlite)
    const accountRepository = new AccountRepository<Account>(clientSqlite)
    const sessionRepository = new SessionRepository<Session>(clientSqlite)

    return {
        async createUser(adapterUser: Omit<AdapterUser, "id">): Promise<AdapterUser> {
            let user: User
            const existingUser = await userRepository.getByEmail(adapterUser.email)

            if (!existingUser) {
                user = await userRepository.create(
                    buildUserFromAdapterUser(adapterUser)
                )
            } else {
                user = existingUser
            }

            const _user: BaseUser = await baseUserRepository.create(
                buildBaseUserFromUser(user, adapterUser)
            )

            return toAdapterUser(_user)
        },
        async getUser(id: string): Promise<AdapterUser | null> {
            const _user: BaseUser = await baseUserRepository.getById(id)
            if (!_user) return null
            return toAdapterUser(_user)
        },
        async getUserByEmail(email: string): Promise<AdapterUser | null> {
            const _user: BaseUser = await baseUserRepository.getByEmail(email)
            if (!_user) return null
            return toAdapterUser(_user)
        },
        async getUserByAccount({ providerAccountId, provider }: Pick<AdapterAccount, "provider" | "providerAccountId">): Promise<AdapterUser | null> {
            const _account: Account = await accountRepository.getAccountByProvider(providerAccountId, provider)
            if (!_account) return null
            const _user = await baseUserRepository.getById(_account?.userId)
            if (!_user) return null
            return toAdapterUser(_user)
        },
        async updateUser(adapterUser: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
            await userRepository.update(
                buildUserFromAdapterUser(adapterUser),
                adapterUser.id
            )
            const _base_user = await baseUserRepository.update(
                buildBaseUserFromAdapterUser(adapterUser),
                adapterUser.id
            )

            return toAdapterUser(_base_user)
        },
        async deleteUser(id: string): Promise<void> {
            await baseUserRepository.remove(id)
            await userRepository.remove(id)
        },
        async linkAccount(_account: AdapterAccount): Promise<AdapterAccount> {
            const payload = buildAccountFromAdapterAccount(_account)
            const __account = await accountRepository.create(payload)
            return toAdapterAccount(__account)
        },
        async createSession(data: AdapterSession): Promise<AdapterSession> {
            try {
                const payload: SessionCreated = {
                    sessionToken: data.sessionToken,
                    userId: data.userId,
                    expires: data.expires.toISOString(),
                }

                const _session = await sessionRepository.create(payload)

                return toNextSession(_session)
            } catch (error) {
                console.error('createSession', error)
                return data
            }
        },
        async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession, user: AdapterUser } | null> {
            try {
                const _session: Session = await sessionRepository.getBySessionToken(sessionToken)
                const _user: BaseUser = await baseUserRepository.getById(_session.userId)

                return {
                    session: toNextSession(_session),
                    user: toAdapterUser(_user)
                }
            } catch (error) {
                console.error('getSessionAndUser', error)
                return null
            }
        },
        async updateSession(data: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Promise<AdapterSession | null> {
            const payload: SessionCreated = {
                sessionToken: data?.sessionToken || "",
                userId: data?.userId || "",
                expires: data?.expires?.toISOString() || "",
            }

            const _session = await sessionRepository.update(payload, data?.sessionToken || "")

            return toNextSession(_session)
        },
        async deleteSession(sessionToken): Promise<AdapterSession | null> {
            const _session = await sessionRepository.remove(sessionToken)
            if (!_session) return null
            return toNextSession(_session)
        }
    }
}
