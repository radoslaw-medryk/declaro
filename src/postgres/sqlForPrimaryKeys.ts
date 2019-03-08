import { ProcessedColumnDeclaration } from "../ProcessedColumnDeclaration";
import { _i } from "./_i";

export const sqlForPrimaryKeys = (primaryKeyColumns: ProcessedColumnDeclaration[]): string[] => {
    if (primaryKeyColumns.length === 0) {
        return [];
    }

    return [`PRIMARY KEY (${primaryKeyColumns.map(q => _i(q.name)).join(", ")})`];
};
