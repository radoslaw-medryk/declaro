import { sqlForPrimaryKeys } from "./sqlForPrimaryKeys";
import { sqlForForeignKeys } from "./sqlForForeignKeys";
import { sqlForUnique } from "./sqlForUnique";
import { TableDeclaration } from "../TableDeclaratrion";
import { ColumnDeclaration } from "../ColumnDeclaration";

export const sqlForConstraints = (table: TableDeclaration, columns: ColumnDeclaration[]): string[] => {
    const primaryKeys = columns.filter(q => q.primaryKey);
    const foreignKeys = columns.filter(q => q.foreignKey);
    const unique = columns.filter(q => q.unique);

    return [...sqlForPrimaryKeys(primaryKeys), ...sqlForForeignKeys(foreignKeys), ...sqlForUnique(unique)];
};
