import { ProcessedRowDeclaration } from "../ProcessedRowDeclaration";

export const sqlForForeignKeys = (foreignKeyRows: ProcessedRowDeclaration[]): string[] => {
    if (foreignKeyRows.length === 0) {
        return [];
    }

    // TODO [RM]: Continue here next time
    throw new Error("Not implemented");
};
