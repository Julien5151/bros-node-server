import { connectionPool } from "./connectionPool";

export class SqlQueries {
    // Create
    // Read
    /**
     *
     * @param fromTable table name from which data are extracted
     * @param tableFieldNames field names which should be retrieved from table, "*" if argument is omitted
     * @param conditions array of string listing conditions, must respect the following pattern :
     * [fieldName, SqlOperator, fieldValue, SqlChainingOperator,fieldName, SqlOperator, fieldValue, ...]
     * Example : ["email", SqlOperator["="], "jclenovacom@gmail.com", SqlChainingOperator["AND"], "age", SqlOperator["<="], 12]
     */
    static async selectFrom(
        fromTable: string,
        tableFieldNames?: string[],
        conditions?: string[]
    ): Promise<any> {
        // Construct field names string
        const fieldsString = tableFieldNames ? tableFieldNames.join(", ") : "*";
        // Construct conditions string
        const conditionsString = conditions
            ? "WHERE ".concat(conditions.join(" "))
            : "";
        // Check that this user exists in database
        return await connectionPool.execute("SELECT ? FROM ? ?;", [
            fieldsString,
            fromTable,
            conditionsString,
        ]);
    }
    // Update
    // Delete
}
