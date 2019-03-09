import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";
import { TableDeclaration } from "./TableDeclaratrion";

export type ProcessedForeignKeyDeclaration = ForeignKeyDeclaration & {
    targetDeclaration: TableDeclaration;
};
