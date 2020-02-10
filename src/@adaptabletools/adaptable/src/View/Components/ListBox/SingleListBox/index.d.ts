import * as React from 'react';
import { SortOrder, SelectionMode } from '../../../../PredefinedConfig/Common/Enums';
export interface SingleListBoxProps {
    Values: Array<any>;
    UiSelectedValues: Array<any>;
    onSelectedChange: (SelectedValues: Array<any>) => void;
    DisplayMember?: string;
    ValueMember?: string;
    SortMember?: string;
    SelectionMode: SelectionMode;
    style?: React.CSSProperties;
    listStyle?: React.CSSProperties;
}
export interface SingleListBoxState extends React.ClassAttributes<SingleListBox> {
    Values: Array<any>;
    UiSelectedValues: Array<any>;
    FilterValue: string;
    SortOrder: SortOrder;
}
export declare class SingleListBox extends React.Component<SingleListBoxProps, SingleListBoxState> {
    constructor(props: SingleListBoxProps);
    UNSAFE_componentWillReceiveProps(nextProps: SingleListBoxProps, nextContext: any): void;
    render(): JSX.Element;
    private getItemId;
    handleChangeFilterValue(x: string): void;
    sortColumnValues(): void;
    raiseOnChange(): void;
    private onSelectionChange;
}
