import { LibSQLDatabase } from "drizzle-orm/libsql";

export default abstract class AbstractRepository<T extends Record<string, unknown>> {
    protected client: LibSQLDatabase<T>

    constructor(client: LibSQLDatabase<T>) {
        this.client = client
    }
}
