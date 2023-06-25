import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@/lib/adapter";
import { dbPg, dbSqlite } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(dbPg, dbSqlite),
    providers: [
        GoogleProvider({
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                },
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        })
    ],
    useSecureCookies: process.env.NODE_ENV !== "development",
    pages: {
        signIn: "/login"
    },
    session: {
        maxAge: 24 * 60 * 60,
        updateAge: 8 * 60 * 60
    },
    callbacks: {
        async jwt(data) {
            console.log('jwt', data)
            return data.token
        },
    },
}

export default NextAuth(authOptions)
