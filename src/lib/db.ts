import postgres from 'postgres'

const { DATABASE_URL } = process.env

const sql = postgres(DATABASE_URL as string, {
    ssl: { sslmode: 'require' },
})

export default sql
