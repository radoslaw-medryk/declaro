// TODO [RM]: find light library replacement or move to own library

export type GroupByGroup<TItem, TKey extends keyof TItem> = {
    keyValue: TItem[TKey];
    items: TItem[];
};

export const groupBy = <TItem, TKey extends keyof TItem>(
    array: TItem[],
    key: TKey
): Array<GroupByGroup<TItem, TKey>> => {
    return array.reduce(
        (prev, curr) => {
            const currValue = curr[key];
            const prevGroup = prev.find(q => q.keyValue === currValue);
            const prevItems = prevGroup ? prevGroup.items : [];

            return [
                ...prev.filter(q => q.keyValue !== currValue),
                {
                    keyValue: currValue,
                    items: [...prevItems, curr],
                },
            ];
        },
        [] as Array<GroupByGroup<TItem, TKey>>
    );
};
