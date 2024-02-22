import { AdapterUser } from "next-auth/adapters";
import { parseJSON } from "date-fns"

import { UserCreated, BaseUserCreated, BaseUser } from "../models";

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

export function toAdapterUser(_user: BaseUser): AdapterUser {
    return {
        id: _user.id,
        email: _user.email,
        name: _user?.name,
        image: _user?.image,
        emailVerified: _user.emailVerified ? parseJSON(_user.emailVerified) : null
    }
}

