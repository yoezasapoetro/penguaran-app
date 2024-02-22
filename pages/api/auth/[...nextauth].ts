import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PenguaranAuthenticationAdapter } from "api/adapter";

const { NODE_ENV, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } = process.env
const isDev = NODE_ENV !== "development"

export const authOptions: NextAuthOptions = {
    debug: isDev,
    adapter: PenguaranAuthenticationAdapter(),
    providers: [
        GoogleProvider({
            name: "Google",
            clientId: GOOGLE_CLIENT_ID || "",
            clientSecret: GOOGLE_CLIENT_SECRET || "",
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
    useSecureCookies: isDev,
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
