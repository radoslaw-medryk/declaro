import { TableDeclaration } from "./TableDeclaration";
import { RowDeclaration } from "./RowDeclaration";

export type Declarations = {
    tables: TableDeclaration[];
    rows: RowDeclaration[];
};
