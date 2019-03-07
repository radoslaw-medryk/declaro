import { Declaro } from "../Declaro";
import { RowDecoratorOptions } from "./RowDecoratorOptions";
import { RowDeclaration } from "../RowDeclaration";
import { ForeignKeyDeclaration } from "../ForeignKeyDeclaration";
import { RowDecoratorForeignKeyOptions } from "./RowDecoratorForeignKeyOptions";
const declaro = Declaro.instance;

const transformForeignKey = (
    foreignKey: RowDecoratorForeignKeyOptions | undefined
): ForeignKeyDeclaration | undefined => {
    if (!foreignKey) {
        return undefined;
    } else if (typeof foreignKey === "function") {
        return {
            targetConstructor: foreignKey,
            targetRowName: undefined,
        };
    } else {
        return {
            targetConstructor: foreignKey[0],
            targetRowName: foreignKey[1],
        };
    }
};

export const row = (typeOrOptions: string | RowDecoratorOptions) => {
    const decorator: PropertyDecorator = (target, propertyKey) => {
        const rowOptions = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions;

        const rowDeclaration: RowDeclaration = {
            tableConstructor: target.constructor,
            name: propertyKey as string, // TODO [RM]: is OK to cast? (handle symbol type here)
            type: rowOptions.type,
            notNull: rowOptions.notNull,
            unique: rowOptions.unique,
            primaryKey: rowOptions.primaryKey,
            foreignKey: transformForeignKey(rowOptions.foreignKey),
        };

        declaro.declareRow(rowDeclaration);
    };
    return decorator;
};
