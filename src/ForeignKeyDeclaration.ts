import { ClassConstructor } from "./primitives";

export type ForeignKeyDeclaration = {
    targetConstructor: ClassConstructor;
    targetRowName?: string;
};
