import { _i } from "./_i";
import { ColumnDeclaration } from "../ColumnDeclaration";

export const sqlForPrimaryKeys = (primaryKeyColumns: ColumnDeclaration[]): string[] => {
    if (primaryKeyColumns.length === 0) {
        return [];
    }

    return [`PRIMARY KEY (${primaryKeyColumns.map(q => _i(q.name)).join(", ")})`];
};
