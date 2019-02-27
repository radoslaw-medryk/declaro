import { Declaro } from "../Declaro";

const declaro = Declaro.instance;

export const row = (details?: string) => {
    const decorator: PropertyDecorator = (target, propertyKey) => {
        declaro.declareRow(target, propertyKey, details);
    };
    return decorator;
};
