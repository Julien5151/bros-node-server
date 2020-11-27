"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlQueries = void 0;
const connectionPool_1 = require("./connectionPool");
class SqlQueries {
    // Create
    /**
     *
     * @param table table name into which data is inserted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names to fill the new entries - array order must match values array - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param values array of arrays containing field values to fill the new entries - array order must match tableFieldNames array
     */
    static insertInto(table, tableFieldNames, values) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construct field names string
            const fieldsString = tableFieldNames.join(", ");
            // Global values string
            let globalValuesString = "";
            // Global values array
            const valuesArray = [];
            // Loop on each array of values
            for (let i = 0; i < values.length; i++) {
                const fieldValues = values[i];
                // Open parenthesis for each value block
                let valuesString = "(";
                // Construct values string which only holds the relevant number of placeholders
                for (let i = 0; i < fieldValues.length; i++) {
                    if (i < fieldValues.length - 1) {
                        valuesString += "?, ";
                    }
                    else {
                        valuesString += "?";
                    }
                }
                // Close parenthesis for each value block
                valuesString += ")";
                // Add value block to global value string
                if (i < values.length - 1) {
                    globalValuesString += `${valuesString}, `;
                }
                else {
                    globalValuesString += valuesString;
                }
                // Add values to global values array
                valuesArray.push(...fieldValues);
            }
            // Construct query
            const sqlQuery = `INSERT INTO ${table} (${fieldsString}) VALUES ${globalValuesString}`;
            // Check that this user exists in database
            return yield connectionPool_1.connectionPool.execute(sqlQuery, valuesArray);
        });
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
    static selectFrom(fromTable, tableFieldNames, conditions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
                    conditionsString += `${conditions[i]} ${conditions[i + 1]} ? ${(_a = conditions[i + 3]) !== null && _a !== void 0 ? _a : ""}`;
                    // Push field value to be used in placeholder
                    conditionsInputs.push(conditions[i + 2]);
                }
                sqlQuery += conditionsString;
            }
            // Check that this user exists in database
            return yield connectionPool_1.connectionPool.execute(sqlQuery, conditionsInputs);
        });
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
    static update(table, tableFieldNames, values, conditions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Construct values string which only holds the relevant number of placeholders
            let fieldsString = "";
            for (let i = 0; i < tableFieldNames.length; i++) {
                if (i < values.length - 1) {
                    fieldsString += `${tableFieldNames[i]} = ?, `;
                }
                else {
                    fieldsString += `${tableFieldNames[i]} = ?`;
                }
            }
            // Initiliaze conditions inputs to be used in prepared statements
            const conditionsInputs = [];
            let conditionsString = "";
            for (let i = 0; i < conditions.length; i += 4) {
                // Concatenate conditions
                conditionsString += `${conditions[i]} ${conditions[i + 1]} ? ${(_a = conditions[i + 3]) !== null && _a !== void 0 ? _a : ""}`;
                // Push field value to be used in placeholder
                conditionsInputs.push(conditions[i + 2]);
            }
            // Construct query
            const sqlQuery = `UPDATE ${table} SET ${fieldsString} WHERE ${conditionsString}`;
            // Check that this user exists in database
            return yield connectionPool_1.connectionPool.execute(sqlQuery, [
                ...values,
                ...conditionsInputs,
            ]);
        });
    }
    // Delete
    /**
     *
     * @param table table name from which data is deleted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param conditions array of values listing conditions, must respect the following pattern :
     * [fieldName, SqlOperator, fieldValue, SqlChainingOperator,fieldName, SqlOperator, fieldValue, ...]
     * Example : ["email", SqlOperator["="], "jclenovacom@gmail.com", SqlChainingOperator["AND"], "age", SqlOperator["<="], 12]
     */
    static deleteFrom(table, conditions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Initiliaze conditions inputs to be used in prepared statements
            const conditionsInputs = [];
            let conditionsString = "";
            for (let i = 0; i < conditions.length; i += 4) {
                // Concatenate conditions
                conditionsString += `${conditions[i]} ${conditions[i + 1]} ? ${(_a = conditions[i + 3]) !== null && _a !== void 0 ? _a : ""}`;
                // Push field value to be used in placeholder
                conditionsInputs.push(conditions[i + 2]);
            }
            // Construct query
            const sqlQuery = `DELETE FROM ${table} WHERE ${conditionsString}`;
            // Check that this user exists in database
            return yield connectionPool_1.connectionPool.execute(sqlQuery, conditionsInputs);
        });
    }
}
exports.SqlQueries = SqlQueries;
