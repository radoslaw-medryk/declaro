import { ProcessedColumnDeclaration } from "../ProcessedColumnDeclaration";
import { _i } from "./_i";

// TODO [RM]: Need to handle unique groups as well, not only unique single fields e.g. `UNIQUE ("firstName", "lastName")`

export const sqlForUnique = (uniqueColumns: ProcessedColumnDeclaration[]): string[] => {
    if (uniqueColumns.length === 0) {
        return [];
    }

    return uniqueColumns.map(q => `UNIQUE (${_i(q.name)})`);
};
