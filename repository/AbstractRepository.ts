import type { NeonDatabase } from "drizzle-orm/neon-serverless"

import * as pgSchema from "@/db/schemas/pg"

export default abstract class AbstractRepository {
    protected client: NeonDatabase<typeof pgSchema>
    protected userId: string

    constructor(client: NeonDatabase<typeof pgSchema>, userId: string) {
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
