import { ProcessedRowDeclaration } from "../ProcessedRowDeclaration";

export const sqlForUnique = (uniqueRows: ProcessedRowDeclaration[]): string[] => {
    if (uniqueRows.length === 0) {
        return [];
    }

    // TODO [RM]: Continue here next time
    throw new Error("Not implemented");
};
