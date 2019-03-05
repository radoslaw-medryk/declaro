import { TableDeclaration } from "./TableDeclaration";
import { ProcessedRowDeclaration } from "./ProcessedRowDeclaration";

export type ProcessedTableDeclaration = TableDeclaration & {
    rows: ProcessedRowDeclaration[];
};
