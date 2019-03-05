import { ProcessedTableDeclaration } from "../ProcessedTableDeclaration";
import { sqlForPrimaryKeys } from "./sqlForPrimaryKeys";
import { sqlForForeignKeys } from "./sqlForForeignKeys";
import { sqlForUnique } from "./sqlForUnique";

export const sqlForConstraints = (table: ProcessedTableDeclaration): string[] => {
    const primaryKeys = table.rows.filter(q => q.primaryKey);
    const foreignKeys = table.rows.filter(q => q.foreignKey);
    const unique = table.rows.filter(q => q.unique);

    return [...sqlForPrimaryKeys(primaryKeys), ...sqlForForeignKeys(foreignKeys), ...sqlForUnique(unique)];
};
