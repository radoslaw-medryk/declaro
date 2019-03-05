import { CreateTableSqlOptions } from "./CreateTableSqlOptions";
import { ProcessedTableDeclaration } from "../ProcessedTableDeclaration";
import { _i } from "./_i";
import { sqlForRow } from "./sqlForRow";
import { sqlForConstraints } from "./sqlForConstraints";

export const sqlForTable = (table: ProcessedTableDeclaration, options: CreateTableSqlOptions = {}) => {
    const entriesSql = table.rows
        .map(row => sqlForRow(row))
        .concat(sqlForConstraints(table))
        .join(`,\n`);

    let sql = ``;
    if (options.dropCascade) {
        sql += `DROP TABLE IF EXISTS ${_i(table.name)} CASCADE;\n`;
    }

    const ifNotExistsPart = options.ifNotExists ? " IF NOT EXISTS" : "";
    sql += `CREATE TABLE ${_i(table.name)}${ifNotExistsPart} (\n${entriesSql}\n);`;
    return sql;
};
