import { Declaro } from "../Declaro";
import { ColumnDecoratorOptions } from "./ColumnDecoratorOptions";
import { InternalColumnDeclaration } from "../InternalColumnDeclaration";
import { InternalForeignKeyDeclaration } from "../InternalForeignKeyDeclaration";
import { ColumnDecoratorForeignKeyOptions } from "./ColumnDecoratorForeignKeyOptions";
const declaro = Declaro.instance;

const transformForeignKey = (
    foreignKey: ColumnDecoratorForeignKeyOptions | undefined
): InternalForeignKeyDeclaration | undefined => {
    if (!foreignKey) {
        return undefined;
    } else if (typeof foreignKey === "function") {
        return {
            targetConstructor: foreignKey,
            targetColumnName: undefined,
        };
    } else {
        return {
            targetConstructor: foreignKey[0],
            targetColumnName: foreignKey[1],
        };
    }
};

export const column = (typeOrOptions: string | ColumnDecoratorOptions) => {
    const decorator: PropertyDecorator = (target, propertyKey) => {
        const columnOptions = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions;

        const columnDeclaration: InternalColumnDeclaration = {
            tableConstructor: target.constructor,
            name: propertyKey as string, // TODO [RM]: is OK to cast? (handle symbol type here)
            type: columnOptions.type,
            notNull: columnOptions.notNull,
            unique: columnOptions.unique,
            primaryKey: columnOptions.primaryKey,
            foreignKey: transformForeignKey(columnOptions.foreignKey),
        };

        declaro.declareColumn(columnDeclaration);
    };
    return decorator;
};
