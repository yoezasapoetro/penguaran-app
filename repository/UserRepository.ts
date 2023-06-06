"use server"

import sql from "@/lib/db"

export type CreateUserPayload = {
    username: string | null
    email: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
}

export type User = {
    userId: string
    username: string
    email: string
    passwordHash: string
    firstName: string
    lastName: string
}

export async function getSingleUser(username: string) {
    const [currentUser]: [User?] = await sql`
        select
            user_id as userId,
            username,
            email,
            password_hash as passwordHash,
            first_name as firstName,
            last_name as lastName
        from users
        where username = ${username}
    `
    return currentUser
}

export async function addUser(user: CreateUserPayload) {
    const currentUser = await getSingleUser(user.username as string)

    if (!currentUser) {
        await sql`
            insert into users(username, email, first_name, last_name, password_hash)
            values (
                ${user.username}, ${user.email},
                ${user.firstName}, ${user.lastName}, ${user.passwordHash})
        `
    }
}
