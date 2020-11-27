import { connectionPool } from "./connectionPool";

export class SqlQueries {
    // Create
    /**
     *
     * @param table table name into which data is inserted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names to fill the new entries - array order must match values array - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param values array of arrays containing field values to fill the new entries - array order must match tableFieldNames array
     */
    static async insertInto(
        table: string,
        tableFieldNames: Array<string>,
        values: Array<Array<any>>
    ): Promise<any> {
        // Construct field names string
        const fieldsString = tableFieldNames.join(", ");
        // Global values string
        let globalValuesString = "";
        // Global values array
        const valuesArray: Array<any> = [];
        // Loop on each array of values
        for (let i = 0; i < values.length; i++) {
            const fieldValues = values[i];
            // Open parenthesis for each value block
            let valuesString = "(";
            // Construct values string which only holds the relevant number of placeholders
            for (let i = 0; i < fieldValues.length; i++) {
                if (i < fieldValues.length - 1) {
                    valuesString += "?, ";
                } else {
                    valuesString += "?";
                }
            }
            // Close parenthesis for each value block
            valuesString += ")";
            // Add value block to global value string
            if (i < values.length - 1) {
                globalValuesString += `${valuesString}, `;
            } else {
                globalValuesString += valuesString;
            }
            // Add values to global values array
            valuesArray.push(...fieldValues);
        }
        // Construct query
        const sqlQuery = `INSERT INTO ${table} (${fieldsString}) VALUES ${globalValuesString}`;
        // Check that this user exists in database
        return await connectionPool.execute(sqlQuery, valuesArray);
    }

    // Read
    /**
     *
     * @param fromTable table name from which data is extracted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names which should be retrieved from table, "*" if argument is omitted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param conditions array of values listing conditions, must respect the following pattern :
     * [fieldName, SqlOperator, fieldValue, SqlChainingOperator,fieldName, SqlOperator, fieldValue, ...]
     * Example : ["email", SqlOperator["="], "jclenovacom@gmail.com", SqlChainingOperator["AND"], "age", SqlOperator["<="], 12]
     */
    static async selectFrom(
        fromTable: string,
        tableFieldNames?: Array<string>,
        conditions?: Array<any>
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
        return await connectionPool.execute(sqlQuery, conditionsInputs);
    }

    /**
     *
     * @param tables table names from which data is extracted (2 tables only supported at the moment : ["table1", "table2"]) - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param joinFields table fields for join condition, array must respect the same order as "tables" argument
     * ["name", "department"] will lead to the following join condition : "table1.name ON table2.department" - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names which should be retrieved from table, "*" if argument is omitted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param conditions array of values listing conditions, must respect the following pattern :
     * [fieldName, SqlOperator, fieldValue, SqlChainingOperator,fieldName, SqlOperator, fieldValue, ...]
     * Example : ["email", SqlOperator["="], "jclenovacom@gmail.com", SqlChainingOperator["AND"], "age", SqlOperator["<="], 12]
     */
    static async selectFromInnerJoin(
        tables: Array<string>,
        joinFields: Array<string>,
        tableFieldNames?: Array<string>,
        conditions?: Array<any>
    ): Promise<any> {
        // Construct field names string
        const fieldsString = tableFieldNames ? tableFieldNames.join(", ") : "*";
        // Construct base query
        let sqlQuery = `SELECT ${fieldsString} FROM ${tables[0]} INNER JOIN ${
            tables[0 + 1]
        } ON ${tables[0]}.${joinFields[0]} = ${tables[0 + 1]}.${
            joinFields[0 + 1]
        }`;
        // Add conditions
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
        return await connectionPool.execute(sqlQuery, conditionsInputs);
    }

    // Update
    /**
     *
     * @param table table name into which data is updated - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names to update - array order must match values array - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param values field values to fill updated rows - array order must match tableFieldNames array
     * @param conditions array of values listing conditions, must respect the following pattern :
     * [fieldName, SqlOperator, fieldValue, SqlChainingOperator,fieldName, SqlOperator, fieldValue, ...]
     * Example : ["email", SqlOperator["="], "jclenovacom@gmail.com", SqlChainingOperator["AND"], "age", SqlOperator["<="], 12]
     */
    static async update(
        table: string,
        tableFieldNames: Array<string>,
        values: Array<any>,
        conditions: Array<any>
    ): Promise<any> {
        // Construct values string which only holds the relevant number of placeholders
        let fieldsString = "";
        for (let i = 0; i < tableFieldNames.length; i++) {
            if (i < values.length - 1) {
                fieldsString += `${tableFieldNames[i]} = ?, `;
            } else {
                fieldsString += `${tableFieldNames[i]} = ?`;
            }
        }
        // Initiliaze conditions inputs to be used in prepared statements
        const conditionsInputs = [];
        let conditionsString = "";
        for (let i = 0; i < conditions.length; i += 4) {
            // Concatenate conditions
            conditionsString += `${conditions[i]} ${conditions[i + 1]} ? ${
                conditions[i + 3] ?? ""
            }`;
            // Push field value to be used in placeholder
            conditionsInputs.push(conditions[i + 2]);
        }
        // Construct query
        const sqlQuery = `UPDATE ${table} SET ${fieldsString} WHERE ${conditionsString}`;
        // Check that this user exists in database
        return await connectionPool.execute(sqlQuery, [
            ...values,
            ...conditionsInputs,
        ]);
    }

    // Delete
    /**
     *
     * @param table table name from which data is deleted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param conditions array of values listing conditions, must respect the following pattern :
     * [fieldName, SqlOperator, fieldValue, SqlChainingOperator,fieldName, SqlOperator, fieldValue, ...]
     * Example : ["email", SqlOperator["="], "jclenovacom@gmail.com", SqlChainingOperator["AND"], "age", SqlOperator["<="], 12]
     */
    static async deleteFrom(
        table: string,
        conditions?: Array<any>
    ): Promise<any> {
        // If conditions are provided
        if (conditions) {
            // Initiliaze conditions inputs to be used in prepared statements
            const conditionsInputs = [];
            let conditionsString = "";
            for (let i = 0; i < conditions.length; i += 4) {
                // Concatenate conditions
                conditionsString += `${conditions[i]} ${conditions[i + 1]} ? ${
                    conditions[i + 3] ?? ""
                }`;
                // Push field value to be used in placeholder
                conditionsInputs.push(conditions[i + 2]);
            }
            // Construct query
            const sqlQuery = `DELETE FROM ${table} WHERE ${conditionsString}`;
            // Check that this user exists in database
            return await connectionPool.execute(sqlQuery, conditionsInputs);
        } else {
            // Wipe all entires from table
            const sqlQuery = `DELETE FROM ${table}`;
            // Check that this user exists in database
            return await connectionPool.execute(sqlQuery);
        }
    }
}
