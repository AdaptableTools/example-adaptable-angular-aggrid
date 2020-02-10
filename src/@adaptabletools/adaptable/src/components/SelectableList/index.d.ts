import * as React from 'react';
declare type SelectableListValues = {
    [key: string]: boolean;
};
export declare const useSelectionEvent: () => (event: React.SyntheticEvent<Element, Event>, { index }: {
    index: number;
}) => void;
interface SelectableListProps {
    onSelectedChange?: (selected: SelectableListValues) => void;
    toggleOnSimpleClick?: boolean;
    getItemId: (index: number) => string | number;
}
declare const SelectableList: (props: React.HTMLProps<HTMLElement> & SelectableListProps) => JSX.Element;
export default SelectableList;
