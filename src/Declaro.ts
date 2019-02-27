import { TableDeclaration } from "./TableDeclaration";
import { ClassConstructor, WithStaticSql } from "./primitives";

export class Declaro {
    public static readonly instance: Declaro = new Declaro();

    public tables: TableDeclaration[] = [];

    public declareTable = (classConstructor: ClassConstructor, name: string) => {
        let table = this.findTable(classConstructor);
        if (!table) {
            table = this.newTable(classConstructor);
        }

        table.setName(name);

        const sql = (classConstructor as WithStaticSql).sql;
        if (sql) {
            table.setDetails(sql);
        }

        // TODO [RM]: handle duplicated declarations for the same table
        // TODO [RM]: handle table name duplicates
    }

    public declareRow = (target: object, propertyKey: string | symbol, details?: string) => {
        const classConstructor = target.constructor;
        const rowName = propertyKey as string; // TODO [RM]: handle symbol type here

        let table = this.findTable(classConstructor);
        if (!table) {
            table = this.newTable(classConstructor);
        }
        table.addRow(rowName, details);

        // TODO [RM]: handle duplicated declarations for the same property or property name duplicates
    }

    private findTable = (classConstructor: ClassConstructor): TableDeclaration | undefined => {
        return this.tables
            .filter(q => q.classConstructor === classConstructor)
            [0];
    }

    private newTable = (classConstructor: ClassConstructor): TableDeclaration => {
        const newTable = new TableDeclaration(classConstructor);

        this.tables = [
            ...this.tables,
            newTable,
        ];

        return newTable;
    }
}
