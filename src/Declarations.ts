import { TableDeclaration } from "./TableDeclaration";
import { ColumnDeclaration } from "./ColumnDeclaration";

export type Declarations = {
    tables: TableDeclaration[];
    columns: ColumnDeclaration[];
};
