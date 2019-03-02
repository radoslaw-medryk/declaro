import { TableDeclaration } from "../TableDeclaration";
import { RowDeclaration } from "../RowDeclaration";
import { i } from "./i";

// TODO [RM]: Can be moved to new project

export type CreateTableSqlOptions = {
    ifNotExists?: boolean;
    dropCascade?: boolean;
};

const sqlForRow = (row: RowDeclaration): string => `${i(row.name)} ${row.details}`;

const sqlForTable = (table: TableDeclaration, options: CreateTableSqlOptions = {}) => {
    if (!table.name) {
        throw new Error(`table.name is not a valid value.`);
    }

    const entriesSql = table.rows
        .map(row => sqlForRow(row))
        .concat(table.details ? [table.details] : [])
        .join(`,\n`);

    let sql = ``;
    if (options.dropCascade) {
        sql += `DROP TABLE IF EXISTS ${i(table.name)} CASCADE;\n`;
    }

    sql += `CREATE TABLE ${i(table.name)} ${options.ifNotExists ? `IF NOT EXISTS` : ``} (\n${entriesSql}\n);`;
    return sql;
};

// TODO [RM]: how to ensure correct order of tables (e.g. for Foreign Keys)?
export const sqlForTables = (tables: TableDeclaration[], options: CreateTableSqlOptions = {}) => {
    return tables
        .map(table => sqlForTable(table, options))
        .join(`\n\n`);
};
