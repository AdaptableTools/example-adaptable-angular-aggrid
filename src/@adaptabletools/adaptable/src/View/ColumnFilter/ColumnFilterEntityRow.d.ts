import * as React from 'react';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: ColumnFilter) => void;
    onSaveColumnFilterasUserFilter: (columnFilter: ColumnFilter) => void;
    ColumnFilter: ColumnFilter;
    AccessLevel: AccessLevel;
}
export declare class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {
    render(): any;
}
