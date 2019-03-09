import { ProcessedColumnDeclaration } from "./ProcessedColumnDeclaration";
import { TableDeclaration } from "./TableDeclaratrion";

export type ProcessedTableDeclaration = TableDeclaration & {
    columns: ProcessedColumnDeclaration[];
};
