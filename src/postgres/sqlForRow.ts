import { RowDeclaration } from "../RowDeclaration";
import { _i } from "./_i";

// TODO [RM]: add (maybe) auto-resolution feature of row.type if not provided when row is foreign key, from target row type.

export const sqlForRow = (row: RowDeclaration): string => {
    // Other row constraints, like `PRIMARY`, `UNIQUE`, `REFERENCES`, etc. are done on table level.
    const details = row.notNull !== false ? " NOT NULL" : "";
    return `${_i(row.name)} ${row.type}${details}`;
};
