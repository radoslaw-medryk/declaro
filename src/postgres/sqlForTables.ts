import { CreateTableSqlOptions } from "./CreateTableSqlOptions";
import { sqlForTable } from "./sqlForTable";
import { Declarations } from "../Declarations";

// TODO [RM]: how to ensure correct order of tables (e.g. for Foreign Keys)?
export const sqlForTables = (declarations: Declarations, options: CreateTableSqlOptions = {}) => {
    return declarations.tables.map(table => sqlForTable(table, declarations, options)).join(`\n\n`);
};
