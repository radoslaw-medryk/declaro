import { ProcessedTableDeclaration } from "../ProcessedTableDeclaration";
import { sqlForPrimaryKeys } from "./sqlForPrimaryKeys";
import { sqlForForeignKeys } from "./sqlForForeignKeys";
import { sqlForUnique } from "./sqlForUnique";

export const sqlForConstraints = (table: ProcessedTableDeclaration): string[] => {
    const primaryKeys = table.columns.filter(q => q.primaryKey);
    const foreignKeys = table.columns.filter(q => q.foreignKey);
    const unique = table.columns.filter(q => q.unique);

    return [...sqlForPrimaryKeys(primaryKeys), ...sqlForForeignKeys(foreignKeys), ...sqlForUnique(unique)];
};
