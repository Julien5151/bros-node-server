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
     * @param table table name into which data are inserted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names to fill the new entry - array order must match values array - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param values field values to fill the new entry - array order must match tableFieldNames array
     */
    static insertInto(table, tableFieldNames, values) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construct field names string
            const fieldsString = tableFieldNames.join(", ");
            // Construct values string which only holds the relevant number of placeholders
            let valuesString = "";
            for (let i = 0; i < values.length; i++) {
                if (i < values.length - 1) {
                    valuesString += "?, ";
                }
                else {
                    valuesString += "?";
                }
            }
            // Construct query
            const sqlQuery = `INSERT INTO ${table} (${fieldsString}) VALUES (${valuesString})`;
            // Check that this user exists in database
            return yield connectionPool_1.connectionPool.execute(sqlQuery, values);
        });
    }
    // Read
    /**
     *
     * @param fromTable table name from which data are extracted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param tableFieldNames field names which should be retrieved from table, "*" if argument is omitted - /!\ DIRECTLY INSERTED INTO QUERY /!\
     * @param conditions array of string listing conditions, must respect the following pattern :
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
}
exports.SqlQueries = SqlQueries;
