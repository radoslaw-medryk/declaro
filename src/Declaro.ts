import { InternalTableDeclaration } from "./InternalTableDeclaration";
import { InternalColumnDeclaration } from "./InternalColumnDeclaration";
import { Declarations } from "./Declarations";
import { References } from "./References";
import { TableDeclaration } from "./TableDeclaratrion";
import { ColumnDeclaration } from "./ColumnDeclaration";
import { InternalForeignKeyDeclaration } from "./InternalForeignKeyDeclaration";
import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";
import { ClassConstructor } from "./primitives";

export class Declaro {
    public static readonly instance: Declaro = new Declaro();

    private tables: InternalTableDeclaration[] = [];
    private columns: InternalColumnDeclaration[] = [];

    public declareTable = (tableDeclaration: InternalTableDeclaration) => {
        this.validateTable(tableDeclaration);

        this.tables = [...this.tables, tableDeclaration];
    };

    public declareColumn = (columnDeclaration: InternalColumnDeclaration) => {
        this.validateColumn(columnDeclaration);

        this.columns = [...this.columns, columnDeclaration];
    };

    public getDeclarations = (): Declarations => {
        const tableDeclarations = this.tables.map(q => this.tableFromInternal(q));
        const columnDeclarations = this.columns.map(q => this.columnFromInternal(q));

        return {
            tables: tableDeclarations,
            columns: columnDeclarations,
        };
    };

    public getReferences = (): References => {
        const tableReferences = this.tables.map(q => ({
            name: q.name,
            classConstructor: q.classConstructor,
        }));

        return {
            tables: tableReferences,
        };
    };

    private validateTable = (tableDeclaration: InternalTableDeclaration) => {
        if (this.tables.some(q => q.classConstructor === tableDeclaration.classConstructor)) {
            throw new Error(`Table with constructor '${tableDeclaration.classConstructor.name}' already declared.`);
        }

        // TODO [RM]: include case-sensivity in check:
        if (this.tables.some(q => q.name === tableDeclaration.name)) {
            throw new Error(`Table with name '${tableDeclaration.name}' already declared.`);
        }
    };

    private validateColumn = (columnDeclaration: InternalColumnDeclaration) => {
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

    private tableFromInternal = (tableDeclaration: InternalTableDeclaration): TableDeclaration => {
        return {
            name: tableDeclaration.name,
        };
    };

    private columnFromInternal = (columnDeclaration: InternalColumnDeclaration): ColumnDeclaration => {
        const tableDeclaration = this.tableDeclarationFromConstructor(columnDeclaration.tableConstructor);

        const { tableConstructor, foreignKey, ...rest } = columnDeclaration;

        return {
            ...rest,
            tableName: tableDeclaration.name,
            foreignKey: this.foreignKeyFromInternal(foreignKey),
        };
    };

    private foreignKeyFromInternal = (
        foreignKey: InternalForeignKeyDeclaration | undefined
    ): ForeignKeyDeclaration | undefined => {
        if (!foreignKey) {
            return undefined;
        }

        const targetDeclaration = this.tableDeclarationFromConstructor(foreignKey.targetConstructor);

        return {
            targetName: targetDeclaration.name,
            targetColumnName: foreignKey.targetColumnName,
        };
    };

    private tableDeclarationFromConstructor = (clasConstructor: ClassConstructor): InternalTableDeclaration => {
        const tableDeclaration = this.tables.find(q => q.classConstructor === clasConstructor);

        if (!tableDeclaration) {
            throw new Error(`Table not declared for constructor named '${clasConstructor.name}'.`);
        }

        return tableDeclaration;
    };
}
