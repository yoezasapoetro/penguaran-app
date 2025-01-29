import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PenguaranAuthenticationAdapter } from "api/adapter"

const isProd = process.env.NODE_ENV === "production"

export const authOptions: NextAuthOptions = {
    debug: !isProd,
    adapter: PenguaranAuthenticationAdapter(),
    providers: [
        GoogleProvider({
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
    useSecureCookies: isProd,
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 8 * 60 * 60
    },
    callbacks: {
        async jwt(data) {
            return data.token
        },
        async session({ session }) {
            return session
        },
    },
}

export default NextAuth(authOptions)
