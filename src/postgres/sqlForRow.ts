import { RowDeclaration } from "../RowDeclaration";
import { _i } from "./_i";

export const sqlForRow = (row: RowDeclaration): string => {
    // Other row constraints, like `PRIMARY`, `UNIQUE`, `REFERENCES` are done on table level.
    const details = row.notNull !== false ? " NOT NULL" : "";
    return `${_i(row.name)} ${row.type}${details}`;
};
