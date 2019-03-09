import { InternalTableDeclaration } from "./InternalTableDeclaration";
import { InternalColumnDeclaration } from "./InternalColumnDeclaration";

export type InternalDeclarations = {
    tables: InternalTableDeclaration[];
    columns: InternalColumnDeclaration[];
};
