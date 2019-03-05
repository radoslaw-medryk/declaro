import { TableDeclaration } from "./TableDeclaration";
import { RowDeclaration } from "./RowDeclaration";
import { Declarations } from "./Declarations";

export class Declaro {
    public static readonly instance: Declaro = new Declaro();

    private tables: TableDeclaration[] = [];
    private rows: RowDeclaration[] = [];

    public declareTable = (tableDeclaration: TableDeclaration) => {
        this.validateTable(tableDeclaration);

        this.tables = [...this.tables, tableDeclaration];
    };

    public declareRow = (rowDeclaration: RowDeclaration) => {
        this.validateRow(rowDeclaration);

        this.rows = [...this.rows, rowDeclaration];
    };

    public getDeclarations = (): Declarations => {
        return {
            tables: [...this.tables],
            rows: [...this.rows],
        };
    };

    private validateTable = (tableDeclaration: TableDeclaration) => {
        if (this.tables.some(q => q.classConstructor === tableDeclaration.classConstructor)) {
            throw new Error(`Table with constructor '${tableDeclaration.classConstructor.name}' already declared.`);
        }

        // TODO [RM]: include case-sensivity in check:
        if (this.tables.some(q => q.name === tableDeclaration.name)) {
            throw new Error(`Table with name '${tableDeclaration.name}' already declared.`);
        }
    };

    private validateRow = (rowDeclaration: RowDeclaration) => {
        // TODO [RM]: include case-sensivity in check:
        if (
            this.rows
                .filter(q => q.tableConstructor === rowDeclaration.tableConstructor)
                .some(q => q.name === rowDeclaration.name)
        ) {
            throw new Error(`Row with name '${rowDeclaration.name}' already declared for the same table.`);
        }

        if (!rowDeclaration.type && !rowDeclaration.foreignKey) {
            throw new Error(`'type' cannot be ommited for non-foreign key.`);
        }

        // TODO [RM]: Investigate if this check needed:
        if (rowDeclaration.foreignKey && rowDeclaration.primaryKey) {
            throw new Error(`'foreignKey' and 'primaryKey' cannot be both set.`);
        }

        if (rowDeclaration.primaryKey && rowDeclaration.notNull === false) {
            throw new Error(`For Primary Key 'notNull' cannot be explicitly set to 'false'.`);
        }

        if (rowDeclaration.primaryKey && rowDeclaration.unique === false) {
            throw new Error(`For Primary Key 'unique' cannot be explicitly set to 'false'.`);
        }
    };
}
