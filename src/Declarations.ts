import { TableDeclaration } from "./TableDeclaratrion";
import { ColumnDeclaration } from "./ColumnDeclaration";

export type Declarations = {
    tables: TableDeclaration[];
    columns: ColumnDeclaration[];
};
