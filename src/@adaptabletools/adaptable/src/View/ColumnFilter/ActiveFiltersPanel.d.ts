import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
export interface ActiveFiltersPanelProps extends React.ClassAttributes<ActiveFiltersPanel> {
    ColumnFilters: ColumnFilter[];
    Columns: AdaptableColumn[];
    AccessLevel: AccessLevel;
    onClear: (columnFilter: ColumnFilter) => void;
    onSaveColumnFilterasUserFilter: (columnFilter: ColumnFilter) => void;
}
export declare class ActiveFiltersPanel extends React.Component<ActiveFiltersPanelProps, {}> {
    render(): any;
    private createRow;
}
