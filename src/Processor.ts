import { Declarations } from "./Declarations";
import { ProcessedDeclarations } from "./ProcessedDeclarations";
import { TableDeclaration } from "./TableDeclaration";
import { ProcessedTableDeclaration } from "./ProcessedTableDeclaration";
import { ColumnDeclaration } from "./ColumnDeclaration";
import { ProcessedColumnDeclaration } from "./ProcessedColumnDeclaration";
import { ForeignKeyDeclaration } from "./ForeignKeyDeclaration";
import { ProcessedForeignKeyDeclaration } from "./ProcessedForeignKeyDeclaration";

export class Processor {
    public static readonly instance: Processor = new Processor();

    public processDeclarations = (declarations: Declarations): ProcessedDeclarations => {
        const tables = declarations.tables.map(q => this.processTable(q, declarations));

        return {
            tables: tables,
        };
    };

    private processTable = (
        tableDeclaration: TableDeclaration,
        declarations: Declarations
    ): ProcessedTableDeclaration => {
        this.validateTable(tableDeclaration, declarations);

        const columns = declarations.columns
            .filter(q => q.tableConstructor === tableDeclaration.classConstructor)
            .map(q => this.processColumn(q, declarations));

        return {
            ...tableDeclaration,
            columns: columns,
        };
    };

    private processColumn = (
        columnDeclaration: ColumnDeclaration,
        declarations: Declarations
    ): ProcessedColumnDeclaration => {
        this.validateColumn(columnDeclaration, declarations);

        const foreignKey = this.processForeignKey(columnDeclaration.foreignKey, declarations);

        return {
            ...columnDeclaration,
            foreignKey: foreignKey,
        };
    };

    private processForeignKey = (
        foreignKeyDeclaration: ForeignKeyDeclaration | undefined,
        declarations: Declarations
    ): ProcessedForeignKeyDeclaration | undefined => {
        this.validateForeignKey(foreignKeyDeclaration, declarations);

        if (!foreignKeyDeclaration) {
            return undefined;
        }

        const targetDeclaration = declarations.tables.find(
            q => q.classConstructor === foreignKeyDeclaration.targetConstructor
        )!;

        return {
            ...foreignKeyDeclaration,
            targetDeclaration: targetDeclaration,
        };
    };

    private validateTable = (tableDeclaration: TableDeclaration, declarations: Declarations) => {
        const otherTables = declarations.tables.filter(q => q !== tableDeclaration);

        if (otherTables.some(q => q.name === tableDeclaration.name)) {
            throw new Error(`Duplicated table name '${tableDeclaration.name}'.`);
        }
    };

    private validateColumn = (columnDeclaration: ColumnDeclaration, declarations: Declarations) => {
        const table = declarations.tables.find(q => q.classConstructor === columnDeclaration.tableConstructor);

        if (!table) {
            throw new Error(`Table definition not found for column '${columnDeclaration.name}'.`);
        }

        const otherColumnsOnSameTable = declarations.columns
            .filter(q => q.tableConstructor === columnDeclaration.tableConstructor)
            .filter(q => q !== columnDeclaration);

        // TODO [RM]: proper case sensitivity when comparing:
        if (otherColumnsOnSameTable.some(q => q.name === columnDeclaration.name)) {
            throw new Error(`Duplicated column name '${columnDeclaration.name}' on table '${table.name}'.`);
        }
    };

    private validateForeignKey = (
        foreignKeyDeclaration: ForeignKeyDeclaration | undefined,
        declarations: Declarations
    ) => {
        if (!foreignKeyDeclaration) {
            return; // OK
        }

        if (!declarations.tables.some(q => foreignKeyDeclaration.targetConstructor === q.classConstructor)) {
            throw new Error(
                `Foreign Key target named = '${
                    foreignKeyDeclaration.targetConstructor.name
                }' not found in declarations.`
            );
        }

        if (
            foreignKeyDeclaration.targetColumnName &&
            declarations.columns
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
