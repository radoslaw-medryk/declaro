import { ClassConstructor } from "../primitives";

export type ColumnDecoratorForeignKeyOptions = ClassConstructor | [ClassConstructor, string?];
