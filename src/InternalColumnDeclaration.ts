import { ClassConstructor } from "./primitives";
import { InternalForeignKeyDeclaration } from "./InternalForeignKeyDeclaration";

export type InternalColumnDeclaration = {
    tableConstructor: ClassConstructor;
    name: string;
    type: string;
    notNull?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
    foreignKey?: InternalForeignKeyDeclaration;
};
