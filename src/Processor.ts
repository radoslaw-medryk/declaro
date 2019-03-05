import { Declarations } from "./Declarations";
import { ProcessedDeclarations } from "./ProcessedDeclarations";
import { TableDeclaration } from "./TableDeclaration";
import { ProcessedTableDeclaration } from "./ProcessedTableDeclaration";
import { RowDeclaration } from "./RowDeclaration";
import { ProcessedRowDeclaration } from "./ProcessedRowDeclaration";
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

        const rows = declarations.rows
            .filter(q => q.tableConstructor === tableDeclaration.classConstructor)
            .map(q => this.processRow(q, declarations));

        return {
            ...tableDeclaration,
            rows: rows,
        };
    };

    private processRow = (rowDeclaration: RowDeclaration, declarations: Declarations): ProcessedRowDeclaration => {
        this.validateRow(rowDeclaration, declarations);

        const foreignKey = this.processForeignKey(rowDeclaration.foreignKey, declarations);

        return {
            ...rowDeclaration,
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

    private validateRow = (rowDeclaration: RowDeclaration, declarations: Declarations) => {
        const table = declarations.tables.find(q => q.classConstructor === rowDeclaration.tableConstructor);

        if (!table) {
            throw new Error(`Table definition not found for row '${rowDeclaration.name}'.`);
        }

        const otherRowsOnSameTable = declarations.rows
            .filter(q => q.tableConstructor === rowDeclaration.tableConstructor)
            .filter(q => q !== rowDeclaration);

        // TODO [RM]: proper case sensitivity when comparing:
        if (otherRowsOnSameTable.some(q => q.name === rowDeclaration.name)) {
            throw new Error(`Duplicated row name '${rowDeclaration.name}' on table '${table.name}'.`);
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
    };
}
