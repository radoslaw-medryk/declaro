import { _i } from "./_i";
import { ProcessedColumnDeclaration } from "../ProcessedColumnDeclaration";

// TODO [RM]: add (maybe) auto-resolution feature of column.type if not provided when column is foreign key, from target column type.

export const sqlForColumn = (column: ProcessedColumnDeclaration): string => {
    // Other column constraints, like `PRIMARY`, `UNIQUE`, `REFERENCES`, etc. are done on table level.
    const details = column.notNull !== false ? " NOT NULL" : "";
    return `${_i(column.name)} ${column.type}${details}`;
};
