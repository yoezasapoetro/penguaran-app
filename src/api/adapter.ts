import { AdapterAccount, AdapterUser, AdapterSession, } from "next-auth/adapters"
import type { Adapter as DefaultAdapter } from "next-auth/adapters"
import { parseJSON } from "date-fns"
import type { NeonDatabase } from "drizzle-orm/neon-serverless"
import { LibSQLDatabase } from "drizzle-orm/libsql"
import { User, BaseUser, Session, SessionCreated, } from "db/models"
import { dbPg, dbSqlite } from "db/instance"
import { buildUserFromAdapterUser, buildBaseUserFromAdapterUser, toAdapterUser } from "db/dto/baseUser.dto"
import { buildBaseUserFromUser } from "db/dto/user.dto"
import { buildAccountFromAdapterAccount, toAdapterAccount } from "db/dto/account.dto"

import BaseUserRepository from "api/repository/Auth/BaseUserRepository"
import UserRepository from "api/repository/UserRepository"
import AccountRepository from "api/repository/Auth/AccountRepository"
import SessionRepository from "api/repository/Auth/SessionRepository"

function toNextSession(_session: Session): AdapterSession {
    const _nextSession: AdapterSession = {
        userId: _session.userId,
        sessionToken: _session.sessionToken,
        expires: parseJSON(_session.expires as string)
    }

    return _nextSession
}

export const PenguaranAuthenticationAdapter = (): DefaultAdapter => {
    const client: NeonDatabase<any> = dbPg
    const clientSqlite: LibSQLDatabase<any> = dbSqlite
    const userRepository = new UserRepository(client, "")
    const baseUserRepository = new BaseUserRepository(clientSqlite)
    const accountRepository = new AccountRepository(clientSqlite)
    const sessionRepository = new SessionRepository(clientSqlite)

    return {
        async createUser(adapterUser: Omit<AdapterUser, "id">): Promise<AdapterUser> {
            try {
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
            } catch (error) {
                console.error('createUser', error)
                return toAdapterUser({
                    id: "",
                    name: "",
                    email: "",
                    emailVerified: "",
                    image: "",
                })
            }
        },
        async getUser(id: string): Promise<AdapterUser | null> {
            const _user = await baseUserRepository.getById(id)
            if (!_user) return null
            return toAdapterUser(_user)
        },
        async getUserByEmail(email: string): Promise<AdapterUser | null> {
            const _user = await baseUserRepository.getByEmail(email)
            if (!_user) return null
            return toAdapterUser(_user)
        },
        async getUserByAccount({ providerAccountId, provider }: Pick<AdapterAccount, "provider" | "providerAccountId">): Promise<AdapterUser | null> {
            const _account = await accountRepository.getAccountByProvider(providerAccountId, provider)
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
                const _session = await sessionRepository.getBySessionToken(sessionToken)

                if (!_session) return null;

                const _user = await baseUserRepository.getById(_session.userId)

                if (!_user) return null;

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
