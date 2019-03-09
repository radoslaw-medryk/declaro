import { ClassConstructor } from "./primitives";

export type InternalForeignKeyDeclaration = {
    targetConstructor: ClassConstructor;
    targetColumnName?: string;
};
