import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";
import { TableDeclaration } from "./TableDeclaration";

export type ProcessedForeignKeyDeclaration = ForeignKeyDeclaration & {
    targetDeclaration: TableDeclaration;
};
