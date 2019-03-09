import { InternalTableDeclaration } from "./InternalTableDeclaration";
import { TableDeclaration } from "./TableDeclaratrion";
import { InternalColumnDeclaration } from "./InternalColumnDeclaration";
import { ColumnDeclaration } from "./ColumnDeclaration";
import { InternalForeignKeyDeclaration } from "./InternalForeignKeyDeclaration";
import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";
import { ClassConstructor } from "./primitives";
import { Declarations } from "./Declarations";
import { References } from "./References";
import { InternalDeclarations } from "./InternalDeclarations";

export class Processor {
    public static readonly instance: Processor = new Processor();

    public declarationsFromInternal = (internalDeclarations: InternalDeclarations): Declarations => {
        const tableDeclarations = internalDeclarations.tables.map(q => this.tableFromInternal(q, internalDeclarations));
        const columnDeclarations = internalDeclarations.columns.map(q =>
            this.columnFromInternal(q, internalDeclarations)
        );

        return {
            tables: tableDeclarations,
            columns: columnDeclarations,
        };
    };

    public referencesFromInternal = (internalDeclarations: InternalDeclarations): References => {
        const tableReferences = internalDeclarations.tables.map(q => ({
            name: q.name,
            classConstructor: q.classConstructor,
        }));

        return {
            tables: tableReferences,
        };
    };

    private tableFromInternal = (
        tableDeclaration: InternalTableDeclaration,
        internalDeclarations: InternalDeclarations
    ): TableDeclaration => {
        this.validateTable(tableDeclaration, internalDeclarations);

        return {
            name: tableDeclaration.name,
        };
    };

    private columnFromInternal = (
        columnDeclaration: InternalColumnDeclaration,
        internalDeclarations: InternalDeclarations
    ): ColumnDeclaration => {
        this.validateColumn(columnDeclaration, internalDeclarations);

        const tableDeclaration = this.tableDeclarationFromConstructor(
            columnDeclaration.tableConstructor,
            internalDeclarations
        );

        const { tableConstructor, foreignKey, ...rest } = columnDeclaration;

        return {
            ...rest,
            tableName: tableDeclaration.name,
            foreignKey: this.foreignKeyFromInternal(foreignKey, internalDeclarations),
        };
    };

    private foreignKeyFromInternal = (
        foreignKey: InternalForeignKeyDeclaration | undefined,
        internalDeclarations: InternalDeclarations
    ): ForeignKeyDeclaration | undefined => {
        this.validateForeignKey(foreignKey, internalDeclarations);

        if (!foreignKey) {
            return undefined;
        }

        const targetDeclaration = this.tableDeclarationFromConstructor(
            foreignKey.targetConstructor,
            internalDeclarations
        );

        return {
            targetName: targetDeclaration.name,
            targetColumnName: foreignKey.targetColumnName,
        };
    };

    private tableDeclarationFromConstructor = (
        clasConstructor: ClassConstructor,
        internalDeclarations: InternalDeclarations
    ): InternalTableDeclaration => {
        const tableDeclaration = internalDeclarations.tables.find(q => q.classConstructor === clasConstructor);

        if (!tableDeclaration) {
            throw new Error(`Table not declared for constructor named '${clasConstructor.name}'.`);
        }

        return tableDeclaration;
    };

    private validateTable = (
        tableDeclaration: InternalTableDeclaration,
        internalDeclarations: InternalDeclarations
    ) => {
        const otherTables = internalDeclarations.tables.filter(q => q !== tableDeclaration);

        if (otherTables.some(q => q.name === tableDeclaration.name)) {
            throw new Error(`Duplicated table name '${tableDeclaration.name}'.`);
        }
    };

    private validateColumn = (
        columnDeclaration: InternalColumnDeclaration,
        internalDeclarations: InternalDeclarations
    ) => {
        const table = internalDeclarations.tables.find(q => q.classConstructor === columnDeclaration.tableConstructor);

        if (!table) {
            throw new Error(`Table definition not found for column '${columnDeclaration.name}'.`);
        }

        const otherColumnsOnSameTable = internalDeclarations.columns
            .filter(q => q.tableConstructor === columnDeclaration.tableConstructor)
            .filter(q => q !== columnDeclaration);

        // TODO [RM]: proper case sensitivity when comparing:
        if (otherColumnsOnSameTable.some(q => q.name === columnDeclaration.name)) {
            throw new Error(`Duplicated column name '${columnDeclaration.name}' on table '${table.name}'.`);
        }
    };

    private validateForeignKey = (
        foreignKeyDeclaration: InternalForeignKeyDeclaration | undefined,
        internalDeclarations: InternalDeclarations
    ) => {
        if (!foreignKeyDeclaration) {
            return; // OK
        }

        if (!internalDeclarations.tables.some(q => foreignKeyDeclaration.targetConstructor === q.classConstructor)) {
            throw new Error(
                `Foreign Key target named = '${
                    foreignKeyDeclaration.targetConstructor.name
                }' not found in declarations.`
            );
        }

        if (
            foreignKeyDeclaration.targetColumnName &&
            internalDeclarations.columns
                .filter(q => q.foreignKey)
                .filter(q => q.foreignKey!.targetConstructor === foreignKeyDeclaration.targetConstructor)
                .some(q => !q.foreignKey!.targetColumnName)
        ) {
            throw new Error(
                `Composite Foreign Key to target named = '${
                    foreignKeyDeclaration.targetConstructor.name
                }' have inconsistent declarations - some columns have targetColumnName, some doesn't.`
            );
        }
    };
}
