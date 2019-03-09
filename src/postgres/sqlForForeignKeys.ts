import { groupBy } from "../groupBy";
import { _i } from "./_i";
import { ColumnDeclaration } from "../ColumnDeclaration";

export const sqlForForeignKeys = (foreignKeyColumns: ColumnDeclaration[]): string[] => {
    if (foreignKeyColumns.length === 0) {
        return [];
    }

    const foreignKeyColumnDatas = foreignKeyColumns.map(q => ({
        columnName: q.name,
        targetName: q.foreignKey!.targetName,
        targetColumnName: q.foreignKey!.targetColumnName,
    }));

    const groupedByTarget = groupBy(foreignKeyColumnDatas, "targetName");

    return groupedByTarget.map(group => {
        const columnNames = group.items.map(column => _i(column.columnName)).join(", ");
        const targetName = _i(group.keyValue);
        const targetColumnNamesArray = group.items.map(column => column.targetColumnName);
        const targetColumnNames = targetColumnNamesArray.every(targetColumnName => !!targetColumnName)
            ? targetColumnNamesArray.map(q => _i(q!)).join(", ")
            : undefined;

        return `FOREIGN KEY (${columnNames}) REFERENCES ${targetName}${
            targetColumnNames ? ` (${targetColumnNames})` : ""
        }`;
    });
};
