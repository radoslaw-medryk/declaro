import { RowDeclaration } from "./RowDeclaration";
import { ProcessedForeignKeyDeclaration } from "./ProcessedForeignKeyDeclaration";

export type ProcessedRowDeclaration = RowDeclaration & {
    foreignKey?: ProcessedForeignKeyDeclaration;
};
