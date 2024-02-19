import { LibSQLDatabase } from "drizzle-orm/libsql";

export default abstract class SqliteAbstractRepository<T extends Record<string, any>> {
    protected client: LibSQLDatabase<T>

    constructor(client: LibSQLDatabase<T>) {
        this.client = client
    }
}
