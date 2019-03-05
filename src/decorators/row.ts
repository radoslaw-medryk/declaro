import { Declaro } from "../Declaro";
import { RowOptions } from "../RowOptions";

const declaro = Declaro.instance;

export const row = (typeOrOptions: string | RowOptions) => {
    const decorator: PropertyDecorator = (target, propertyKey) => {
        const rowOptions = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions;

        const name = propertyKey as string; // TODO [RM]: handle symbol here

        declaro.declareRow(target, name, rowOptions);
    };
    return decorator;
};
