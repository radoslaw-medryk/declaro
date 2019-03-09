import { InternalTableDeclaration } from "./InternalTableDeclaration";
import { InternalColumnDeclaration } from "./InternalColumnDeclaration";
import { Declarations } from "./Declarations";
import { References } from "./References";
import { Processor } from "./Processor";
import { InternalDeclarationsStore } from "./InternalDeclarationsStore";

const processor = Processor.instance;
const internalDeclarationsStore = InternalDeclarationsStore.instance;

export class Declaro {
    public static readonly instance: Declaro = new Declaro();

    public declareTable = (tableDeclaration: InternalTableDeclaration) => {
        internalDeclarationsStore.declareTable(tableDeclaration);
    };

    public declareColumn = (columnDeclaration: InternalColumnDeclaration) => {
        internalDeclarationsStore.declareColumn(columnDeclaration);
    };

    public getDeclarations = (): Declarations => {
        const internalDeclarations = internalDeclarationsStore.getDeclarations();
        return processor.declarationsFromInternal(internalDeclarations);
    };

    public getReferences = (): References => {
        const internalDeclarations = internalDeclarationsStore.getDeclarations();
        return processor.referencesFromInternal(internalDeclarations);
    };
}
