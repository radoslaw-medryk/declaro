import { TableDeclaration } from "./TableDeclaration";
import { ProcessedColumnDeclaration } from "./ProcessedColumnDeclaration";

export type ProcessedTableDeclaration = TableDeclaration & {
    columns: ProcessedColumnDeclaration[];
};
