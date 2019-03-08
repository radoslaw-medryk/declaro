import { TableDeclaration } from "./TableDeclaration";
import { ColumnDeclaration } from "./ColumnDeclaration";
import { Declarations } from "./Declarations";

export class Declaro {
    public static readonly instance: Declaro = new Declaro();

    private tables: TableDeclaration[] = [];
    private columns: ColumnDeclaration[] = [];

    public declareTable = (tableDeclaration: TableDeclaration) => {
        this.validateTable(tableDeclaration);

        this.tables = [...this.tables, tableDeclaration];
    };

    public declareColumn = (columnDeclaration: ColumnDeclaration) => {
        this.validateColumn(columnDeclaration);

        this.columns = [...this.columns, columnDeclaration];
    };

    public getDeclarations = (): Declarations => {
        return {
            tables: [...this.tables],
            columns: [...this.columns],
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

    private validateColumn = (columnDeclaration: ColumnDeclaration) => {
        // TODO [RM]: include case-sensivity in check:
        if (
            this.columns
                .filter(q => q.tableConstructor === columnDeclaration.tableConstructor)
                .some(q => q.name === columnDeclaration.name)
        ) {
            throw new Error(`Column with name '${columnDeclaration.name}' already declared for the same table.`);
        }

        if (!columnDeclaration.type && !columnDeclaration.foreignKey) {
            throw new Error(`'type' cannot be ommited for non-foreign key.`);
        }

        // TODO [RM]: Investigate if this check needed:
        if (columnDeclaration.foreignKey && columnDeclaration.primaryKey) {
            throw new Error(`'foreignKey' and 'primaryKey' cannot be both set.`);
        }

        if (columnDeclaration.primaryKey && columnDeclaration.notNull === false) {
            throw new Error(`For Primary Key 'notNull' cannot be explicitly set to 'false'.`);
        }

        if (columnDeclaration.primaryKey && columnDeclaration.unique === false) {
            throw new Error(`For Primary Key 'unique' cannot be explicitly set to 'false'.`);
        }
    };
}
