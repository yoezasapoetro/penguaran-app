import { AdapterUser } from "next-auth/adapters";

import { User, BaseUserCreated } from "../models";

export function buildBaseUserFromUser(user: User, adapterUser: Omit<AdapterUser, "id"> | Partial<AdapterUser> & Pick<AdapterUser, "id">): BaseUserCreated {
    const emailVerified = adapterUser.emailVerified ? adapterUser.emailVerified.toISOString() : null

    return {
        id: user.id,
        email: user.email,
        name: adapterUser?.name,
        image: adapterUser?.image,
        emailVerified
    }
}
