import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";

export type ColumnDeclaration = {
    tableName: string;
    name: string;
    type: string;
    notNull?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
    foreignKey?: ForeignKeyDeclaration;
};
