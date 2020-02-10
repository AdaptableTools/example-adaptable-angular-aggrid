import * as React from 'react';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
export interface GridSortRowProps<GridSortRow> extends SharedEntityExpressionRowProps<GridSortRow> {
    ColumnSort: ColumnSort;
    onColumnSortColumnChanged: (column: AdaptableColumn) => void;
    onColumnSortOrderChanged: (sortOrder: SortOrder) => void;
    onDeleteColumnSort: () => void;
}
export declare class GridSortRow extends React.Component<GridSortRowProps<GridSortRow>, {}> {
    render(): any;
    private onColumnSelectedChanged;
    private onSortOrderChanged;
}
