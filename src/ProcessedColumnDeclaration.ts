import { ProcessedForeignKeyDeclaration } from "./ProcessedForeignKeyDeclaration";
import { ColumnDeclaration } from "./ColumnDeclaration";

export type ProcessedColumnDeclaration = ColumnDeclaration & {
    foreignKey?: ProcessedForeignKeyDeclaration;
};
