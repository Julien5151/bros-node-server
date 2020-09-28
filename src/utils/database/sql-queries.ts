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
        // Construct base query
        let sqlQuery = `SELECT ${fieldsString} FROM ${fromTable}`;
        // Initiliaze conditions inputs to be used in prepared statements
        const conditionsInputs = [];
        if (conditions) {
            let conditionsString = " WHERE ";
            for (let i = 0; i < conditions.length; i += 4) {
                // Concatenate conditions
                conditionsString += `${conditions[i]} ${conditions[i + 1]} ? ${
                    conditions[i + 3] ?? ""
                }`;
                // Push field value to be used in placeholder
                conditionsInputs.push(conditions[i + 2]);
            }
            sqlQuery += conditionsString;
        }
        // Check that this user exists in database
        return await connectionPool.execute(sqlQuery, conditionsInputs);
    }
    // Update
    // Delete
}
