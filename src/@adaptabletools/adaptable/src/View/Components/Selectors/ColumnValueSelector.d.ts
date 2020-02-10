import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { DropdownButtonProps } from '../../../components/DropdownButton';
export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
    SelectedColumn: AdaptableColumn;
    SelectedColumnValue: string;
    onColumnValueChange: (columnvalue: any) => void;
    Adaptable: IAdaptable;
    AllowNew?: boolean;
    style?: React.CSSProperties;
    newLabel?: string;
    existingLabel?: string;
    dropdownButtonProps?: DropdownButtonProps;
}
declare enum NEW_OR_EXISTING {
    existing = "Existing value",
    new = "New value"
}
export declare class ColumnValueSelector extends React.Component<ColumnValueSelectorProps, {
    newOrExisting: NEW_OR_EXISTING;
}> {
    static defaultProps: {
        newLabel: string;
        existingLabel: string;
    };
    constructor(props: ColumnValueSelectorProps);
    UNSAFE_componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any): void;
    render(): JSX.Element;
    onSelectedValueChange(selected: any[]): void;
}
export {};
