import { ProcessedRowDeclaration } from "../ProcessedRowDeclaration";
import { groupBy } from "../groupBy";
import { _i } from "./_i";

export const sqlForForeignKeys = (foreignKeyRows: ProcessedRowDeclaration[]): string[] => {
    if (foreignKeyRows.length === 0) {
        return [];
    }

    const foreignKeyRowDatas = foreignKeyRows.map(q => ({
        rowName: q.name,
        targetDeclaration: q.foreignKey!.targetDeclaration,
        targetRowName: q.foreignKey!.targetRowName,
    }));

    const groupedByTarget = groupBy(foreignKeyRowDatas, "targetDeclaration");

    return groupedByTarget.map(group => {
        const rowNames = group.items.map(row => _i(row.rowName)).join(", ");
        const targetName = _i(group.keyValue.name);
        const targetRowNamesArray = group.items.map(row => row.targetRowName);
        const targetRowNames = targetRowNamesArray.every(targetRowName => !!targetRowName)
            ? targetRowNamesArray.map(q => _i(q!)).join(", ")
            : undefined;

        return `FOREIGN KEY (${rowNames}) REFERENCES ${targetName}${targetRowNames ? ` (${targetRowNames})` : ""}`;
    });
};
