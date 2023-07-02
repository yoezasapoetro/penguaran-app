declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string
        NEXTAUTH_SECRET: string
        PG_DATABASE_URL: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
        SQLITE_DATABASE_URL: string
        TURSO_AUTH_TOKEN: string
        PG_HOST: string
        PG_POR: string
        PG_USER: string
        PG_PASS: string
        PG_DATABASE: string
    }
}
