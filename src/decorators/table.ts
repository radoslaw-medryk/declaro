import { Declaro } from "../Declaro";

const declaro = Declaro.instance;

export const table = (name: string) => {
    const decorator: ClassDecorator = target => {
        declaro.declareTable(target, name);
    };
    return decorator;
};
