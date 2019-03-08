import { ClassConstructor } from "./primitives";

export type ForeignKeyDeclaration = {
    targetConstructor: ClassConstructor;
    targetColumnName?: string;
};
