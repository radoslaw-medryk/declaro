import { ColumnDecoratorForeignKeyOptions } from "./ColumnDecoratorForeignKeyOptions";

export type ColumnDecoratorOptions = {
    type: string;
    notNull?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
    foreignKey?: ColumnDecoratorForeignKeyOptions;
};
