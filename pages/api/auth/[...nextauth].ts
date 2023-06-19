import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@/lib/adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
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
                    firstName: profile.given_name,
                    lastName: profile.family_name,
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
        strategy: "jwt",
    }
}

export default NextAuth(authOptions)
