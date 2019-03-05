import { TableDeclaration } from "../TableDeclaration";
import { CreateTableSqlOptions } from "./CreateTableSqlOptions";
import { sqlForRow } from "./sqlForRow";
import { _i } from "./_i";
import { RowDeclaration } from "../RowDeclaration";
import { Declaro } from "../Declaro";
import { ClassConstructor } from "../primitives";

const declaro = Declaro.instance;

const sqlForPrimaryKeys = (rows: RowDeclaration[]) => {
    const primaryKeyRows = rows
        .filter(q => q.primaryKey);

    if (primaryKeyRows.length === 0) {
        return undefined;
    }

    return `PRIMARY KEY (${primaryKeyRows.map(q => _i(q.name)).join(", ")})`;
};

type ForeignKeyRowDetails = {
    row: RowDeclaration,
    targetRowName?: string,
};

type ForeignKeyDetails = {
    rowsDetails: ForeignKeyRowDetails[],
    targetConstructor: ClassConstructor,
    targetTable: TableDeclaration,
};

const getForeignKeysDetials = (foreignKeyRows: RowDeclaration[]): ForeignKeyDetails[] => {
    const groupedByTargetRows = foreignKeyRows
        .reduce((groups, row, i, a) => {
            const rowGroup = groups.get(row.) || [];

            return groups;
        }, new Map());

    // const row = foreignKeyRow;

    const [targetConstructor, targetRowName] = typeof row.foreignKey === "function"
        ? [row.foreignKey, undefined]
        : [row.foreignKey![0], row.foreignKey![1]];

    const targetTable = declaro.findTable(targetConstructor);
    if (!targetTable) {
        // tslint:disable-next-line:max-line-length
        throw new Error(`Foreign Key table with constructor with name = '${targetConstructor.prototype.name}' not found in declaro.`);
    }

    return {
        row: row,
        targetConstructor: targetConstructor,
        targetRowName: targetRowName,
        targetTable: targetTable,
    };
};

const sqlForForeignKeys = (rows: RowDeclaration[]) => {
    const foreignKeysRows = rows
        .filter(q => q.foreignKey);

    if (foreignKeysRows.length === 0) {
        return undefined;
    }

    const foreignKeysDetails = foreignKeysRows
        .map(q => getForeignKeyDetials(q));

    if (foreignKeysDetails.length > 1 && foreignKeysDetails.some(q => !q.targetRowName)) {
        throw new Error(`Some rows of composite foreign key haven't specified targetRowName.`);
    }

    return `FOREIGN KEY () REFERENCES `;

    // if (foreignKeysDetails.length === 1) {
    //     return `FOREIGN KEY (${i(row.name)}) REFERENCES ${i(targetTable.name!)} ()`;
    // }

    /*FOREIGN KEY (role_id) REFERENCES role (role_id) */
};

export const sqlForTable = (table: TableDeclaration, options: CreateTableSqlOptions = {}) => {
    if (!table.name) {
        throw new Error("table.name is null/empty/falsey.");
    }

    let constraintsSql: string[] = [];

    // TODO [RM]: move somewhere else:
    const primaryKeysSql = sqlForPrimaryKeys(table.rows);
    constraintsSql = primaryKeysSql
        ? [...constraintsSql, primaryKeysSql]
        : constraintsSql;
    //

    const entriesSql = table.rows
        .map(row => sqlForRow(row))
        .concat(constraintsSql)
        .join(`,\n`);

    let sql = ``;
    if (options.dropCascade) {
        sql += `DROP TABLE IF EXISTS ${_i(table.name)} CASCADE;\n`;
    }

    const ifNotExistsPart = options.ifNotExists ? " IF NOT EXISTS" : "";
    sql += `CREATE TABLE ${_i(table.name)}${ifNotExistsPart} (\n${entriesSql}\n);`;
    return sql;
};
