import { CreateTableSqlOptions } from "./CreateTableSqlOptions";
import { sqlForTable } from "./sqlForTable";
import { ProcessedDeclarations } from "../ProcessedDeclarations";

// TODO [RM]: how to ensure correct order of tables (e.g. for Foreign Keys)?
export const sqlForTables = (processedDeclarations: ProcessedDeclarations, options: CreateTableSqlOptions = {}) => {
    return processedDeclarations.tables.map(table => sqlForTable(table, options)).join(`\n\n`);
};
