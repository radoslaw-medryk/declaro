import { ClassConstructor } from "./primitives";
import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";

export type ColumnDeclaration = {
    tableConstructor: ClassConstructor;
    name: string;
    type: string;
    notNull?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
    foreignKey?: ForeignKeyDeclaration;
};
