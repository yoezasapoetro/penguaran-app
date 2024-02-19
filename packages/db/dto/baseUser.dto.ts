import { AdapterUser } from "next-auth/adapters";

import { UserCreated, BaseUserCreated } from "../models";

export function buildUserFromAdapterUser(user: Omit<AdapterUser, "id"> | Partial<AdapterUser> & Pick<AdapterUser, "id">): UserCreated {
    return {
        email: user?.email || "",
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString()
    }
}

export function buildBaseUserFromAdapterUser(user: Omit<AdapterUser, "id"> | Partial<AdapterUser> & Pick<AdapterUser, "id">): Omit<BaseUserCreated, "id"> {
    return {
        name: user?.name,
        email: user?.email || "",
        emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null,
        image: user.image
    }
}
