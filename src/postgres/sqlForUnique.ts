import { ProcessedRowDeclaration } from "../ProcessedRowDeclaration";
import { _i } from "./_i";

// TODO [RM]: Need to handle unique groups as well, not only unique single fields e.g. `UNIQUE ("firstName", "lastName")`

export const sqlForUnique = (uniqueRows: ProcessedRowDeclaration[]): string[] => {
    if (uniqueRows.length === 0) {
        return [];
    }

    return uniqueRows.map(q => `UNIQUE (${_i(q.name)})`);
};
