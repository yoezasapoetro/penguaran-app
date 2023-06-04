import { NextRequest, NextResponse } from "next/server";
import type { WebhookEvent, UserJSON } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import { CreateUserPayload, addUser } from "@/repository/Users";

export async function POST(request: NextRequest) {
    const secret = process.env.CLERK_SIGNING_SECRET as string
    const payload = await request.text()
    const header = request.headers
    const headers = {
        "svix-id": header.get("svix-id") as string,
        "svix-timestamp": header.get("svix-timestamp") as string,
        "svix-signature": header.get("svix-signature") as string,
    }

    const webhook = new Webhook(secret)

    try {
        const event = webhook.verify(payload, headers) as WebhookEvent

        if (event.type === "user.created") {
            const data = event.data as UserJSON
            const emailAddressId = data.primary_email_address_id
            const [{ email_address }] = data.email_addresses.filter((row) => {
                return row.id === emailAddressId
            })
            const user: CreateUserPayload = {
                username: data.username,
                email: email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                passwordHash: null,
            }
            await addUser(user)

            return NextResponse.json({ data: 'created' }, { status: 201 })
        }

        return NextResponse.json({ data: 'ok' }, { status: 200 })
    } catch (error) {
        console.error('Server Error', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
