import * as React from 'react';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
    ColumnList: AdaptableColumn[];
    SelectedColumnIds: string[];
    onColumnChange: (SelectedColumns: AdaptableColumn[]) => void;
    SelectionMode: SelectionMode;
    className?: string;
    placeHolder?: string;
    showClearButton?: boolean;
}
export declare class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
    render(): JSX.Element;
    onClearButton(): void;
    onColumnChange(selected: AdaptableColumn[], isEmptySelection: boolean): void;
}
