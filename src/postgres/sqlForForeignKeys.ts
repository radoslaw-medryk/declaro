import { ProcessedColumnDeclaration } from "../ProcessedColumnDeclaration";
import { groupBy } from "../groupBy";
import { _i } from "./_i";

export const sqlForForeignKeys = (foreignKeyColumns: ProcessedColumnDeclaration[]): string[] => {
    if (foreignKeyColumns.length === 0) {
        return [];
    }

    const foreignKeyColumnDatas = foreignKeyColumns.map(q => ({
        columnName: q.name,
        targetDeclaration: q.foreignKey!.targetDeclaration,
        targetColumnName: q.foreignKey!.targetColumnName,
    }));

    const groupedByTarget = groupBy(foreignKeyColumnDatas, "targetDeclaration");

    return groupedByTarget.map(group => {
        const columnNames = group.items.map(column => _i(column.columnName)).join(", ");
        const targetName = _i(group.keyValue.name);
        const targetColumnNamesArray = group.items.map(column => column.targetColumnName);
        const targetColumnNames = targetColumnNamesArray.every(targetColumnName => !!targetColumnName)
            ? targetColumnNamesArray.map(q => _i(q!)).join(", ")
            : undefined;

        return `FOREIGN KEY (${columnNames}) REFERENCES ${targetName}${
            targetColumnNames ? ` (${targetColumnNames})` : ""
        }`;
    });
};
