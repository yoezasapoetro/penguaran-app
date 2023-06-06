declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string
        NEXTAUTH_SECRET: string
        DATABASE_URL: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
    }
}
