import { RowDecoratorForeignKeyOptions } from "./RowDecoratorForeignKeyOptions";

export type RowDecoratorOptions = {
    type: string;
    notNull?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
    foreignKey?: RowDecoratorForeignKeyOptions;
};
