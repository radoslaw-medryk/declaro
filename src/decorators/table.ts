import { Declaro } from "../Declaro";
import { InternalTableDeclaration } from "../InternalTableDeclaration";

const declaro = Declaro.instance;

export const table = (name: string) => {
    const decorator: ClassDecorator = target => {
        const tableDeclaration: InternalTableDeclaration = {
            classConstructor: target,
            name: name,
        };

        declaro.declareTable(tableDeclaration);
    };
    return decorator;
};
