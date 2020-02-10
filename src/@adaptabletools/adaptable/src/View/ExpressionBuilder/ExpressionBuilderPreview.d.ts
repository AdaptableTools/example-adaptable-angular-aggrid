import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Expression } from '../../PredefinedConfig/Common/Expression';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { QueryTab } from '../../PredefinedConfig/Common/Enums';
export interface ExpressionBuilderPreviewProps extends React.ClassAttributes<ExpressionBuilderPreview> {
    Expression: Expression;
    UserFilters: UserFilter[];
    onSelectedColumnChange: (ColumnId: string, tab: QueryTab) => void;
    ColumnsList: Array<AdaptableColumn>;
    DeleteRange: (ColumnId: string, index: number) => void;
    DeleteUserFilterExpression: (ColumnId: string, index: number) => void;
    DeleteColumnValue: (ColumnId: string, ColumnValue: any) => void;
    DeleteAllColumnExpression: (ColumnId: string) => void;
    ShowPanel: boolean;
    ReadOnlyMode?: boolean;
}
export declare class ExpressionBuilderPreview extends React.Component<ExpressionBuilderPreviewProps, {}> {
    render(): JSX.Element;
    onColumnHeaderSelected(columnId: string): void;
    ensureSelectedColumnVisible(columnId: string): void;
    private getOperand1Value;
    private getOperand2Value;
}
