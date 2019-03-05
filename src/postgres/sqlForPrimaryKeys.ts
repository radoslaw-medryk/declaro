import { ProcessedRowDeclaration } from "../ProcessedRowDeclaration";
import { _i } from "./_i";

export const sqlForPrimaryKeys = (primaryKeyRows: ProcessedRowDeclaration[]): string[] => {
    if (primaryKeyRows.length === 0) {
        return [];
    }

    return [`PRIMARY KEY (${primaryKeyRows.map(q => _i(q.name)).join(", ")})`];
};
