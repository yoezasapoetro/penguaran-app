import type { NeonDatabase } from "drizzle-orm/neon-serverless"

export default abstract class AbstractRepository<T extends Record<string, any>> {
    protected client: NeonDatabase<T>
    protected userId: string

    constructor(client: NeonDatabase<T>, userId: string) {
        this.client = client
        this.userId = userId
    }

    get currentDate(): Date {
        return new Date()
    }

    get currentYear(): number {
        return this.currentDate.getFullYear()
    }

    get currentMonth(): number {
        return this.currentDate.getMonth() - 1
    }

    getDateString(): string {
        return this.currentDate.toISOString()
    }
}
