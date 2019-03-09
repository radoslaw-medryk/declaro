import { CreateTableSqlOptions } from "./CreateTableSqlOptions";
import { _i } from "./_i";
import { sqlForColumn } from "./sqlForColumn";
import { sqlForConstraints } from "./sqlForConstraints";
import { TableDeclaration } from "../TableDeclaratrion";
import { Declarations } from "../Declarations";

export const sqlForTable = (
    table: TableDeclaration,
    declarations: Declarations,
    options: CreateTableSqlOptions = {}
) => {
    const columns = declarations.columns.filter(q => q.tableName === table.name);

    const entriesSql = columns
        .map(column => sqlForColumn(column))
        .concat(sqlForConstraints(table, columns))
        .join(`,\n`);

    let sql = ``;
    if (options.dropCascade) {
        sql += `DROP TABLE IF EXISTS ${_i(table.name)} CASCADE;\n`;
    }

    const ifNotExistsPart = options.ifNotExists ? " IF NOT EXISTS" : "";
    sql += `CREATE TABLE ${_i(table.name)}${ifNotExistsPart} (\n${entriesSql}\n);`;
    return sql;
};
