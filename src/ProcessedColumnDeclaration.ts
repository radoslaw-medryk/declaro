import { ColumnDeclaration } from "./ColumnDeclaration";
import { ProcessedForeignKeyDeclaration } from "./ProcessedForeignKeyDeclaration";

export type ProcessedColumnDeclaration = ColumnDeclaration & {
    foreignKey?: ProcessedForeignKeyDeclaration;
};
