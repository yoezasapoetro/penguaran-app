import { type Adapter, AdapterAccount, AdapterUser } from "@auth/core/adapters"
import type { NeonDatabase } from "drizzle-orm/neon-serverless"
import { InferModel, eq, and } from "drizzle-orm"
import { user, profile } from "@/db/schema"

type User = InferModel<typeof user>
type UserCreated = InferModel<typeof user, "insert">
type ProfileCreated = InferModel<typeof profile, "insert">

function getSingleUser(currentUser: User): AdapterUser | null {
    if (currentUser) {
        return {
            id: currentUser.id,
            email: currentUser.email,
        } as AdapterUser
    }
    return null
}

export function DrizzleAdapter(client: NeonDatabase<User>): Adapter {
    return {
        async linkAccount(account: AdapterAccount) {
            const payload: Partial<UserCreated> = {
                source: account.provider,
                externalId: account.providerAccountId,
            }

            await client
                .update(user)
                .set(payload)
                .where(eq(user.id, account.userId))
        },
        async getUserByAccount({ providerAccountId, provider }: AdapterAccount) {
            const [currentUser] = await client
                .select()
                .from(user)
                .where(
                    and(
                        eq(user.externalId, providerAccountId),
                        eq(user.source, provider)
                    ))

            return getSingleUser(currentUser)
        },
        async getUserByEmail(email: string): Promise<AdapterUser | null> {
            const [currentUser] = await client
                .select()
                .from(user)
                .where(eq(user.email, email))

            return getSingleUser(currentUser)
        },
        async createUser(_user: any): Promise<AdapterUser> {
            let latestUser: User
            const payload: UserCreated = {
                email: _user.email,
                username: _user.email,
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString()
            }

            return await client.transaction<AdapterUser>(async (tx) => {
                const [createUser] = await tx
                    .insert(user)
                    .values(payload)
                    .returning()

                latestUser = createUser

                const profilePayload: ProfileCreated = {
                    userId: createUser.id,
                    firstName: _user.firstName as string,
                    lastName: _user.lastName as string,
                    createdAt: new Date().toUTCString(),
                    updatedAt: new Date().toUTCString()
                }

                await tx
                    .insert(profile)
                    .values(profilePayload)

                return {
                    id: latestUser.id,
                    email: latestUser.email,
                    emailVerified: null
                }
            })
        }
    }
}
