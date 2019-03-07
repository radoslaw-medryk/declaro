import { Declaro } from "../Declaro";
import { TableDeclaration } from "../TableDeclaration";

const declaro = Declaro.instance;

export const table = (name: string) => {
    const decorator: ClassDecorator = target => {
        const tableDeclaration: TableDeclaration = {
            classConstructor: target,
            name: name,
        };

        declaro.declareTable(tableDeclaration);
    };
    return decorator;
};
