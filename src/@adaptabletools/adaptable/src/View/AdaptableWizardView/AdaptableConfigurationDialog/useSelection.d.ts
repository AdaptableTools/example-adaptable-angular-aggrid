declare const useSelection: (columns: {
    [key: string]: any;
}[], defaultValue: boolean, fieldName: string, changeListeners?: {
    onChange?: (column: any, flag: boolean) => void;
    onBatchChange?: (flag: boolean) => void;
}) => {
    selected: {
        [key: string]: boolean;
    };
    isSelected: (field: string) => boolean;
    isAllSelected: () => boolean;
    isNoneSelected: () => boolean;
    selectColumn: (field: string) => void;
    deselectColumn: (field: string) => void;
    toggleColumn: (field: string) => void;
    deselectAll: () => void;
    selectAll: () => void;
};
export default useSelection;
