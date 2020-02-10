import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ExpressionMode, QueryBuildStatus, QueryTab } from '../../PredefinedConfig/Common/Enums';
import { IRawValueDisplayValuePair } from '../UIInterfaces';
import { Expression, QueryRange } from '../../PredefinedConfig/Common/Expression';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
export interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<AdaptableColumn>;
    Expression: Expression;
    ExpressionMode: ExpressionMode;
    onExpressionChange: (Expression: Expression) => void;
    onSelectedColumnChange: (ColumnId: string, Tab: QueryTab) => void;
    UserFilters: UserFilter[];
    SystemFilters: string[];
    NamedFilters: NamedFilter[];
    ColumnCategories: ColumnCategory[];
    SelectedColumnId: string;
    SelectedTab: QueryTab;
    QueryBuildStatus: QueryBuildStatus;
    Adaptable: IAdaptable;
}
export interface ExpressionBuilderConditionSelectorState {
    SelectedColumnId: string;
    ColumnRawValueDisplayValuePairs: IRawValueDisplayValuePair[];
    SelectedColumnDisplayValues: Array<any>;
    AllFilterExpresions: Array<string>;
    SelectedFilterExpressions: Array<string>;
    SelectedColumnRanges: Array<QueryRange>;
    QueryBuildStatus: QueryBuildStatus;
    ShowWaitingMessage: boolean;
    SelectedTab: QueryTab;
}
export declare class ExpressionBuilderConditionSelector extends React.Component<ExpressionBuilderConditionSelectorProps, ExpressionBuilderConditionSelectorState> {
    constructor(props: ExpressionBuilderConditionSelectorProps);
    static getDerivedStateFromProps(props: ExpressionBuilderConditionSelectorProps, state: ExpressionBuilderConditionSelectorState): any;
    private static buildState;
    private static buildColumnValuesState;
    componentDidMount(): void;
    setStateForColumnValues(props?: Readonly<ExpressionBuilderConditionSelectorProps> & Readonly<{
        children?: React.ReactNode;
    }>): void;
    componentDidUpdate(_prevState: any, prevProps: any): void;
    lazyLoadColumnValues: (props: ExpressionBuilderConditionSelectorProps) => Promise<{}>;
    render(): JSX.Element;
    onSelectTab(): any;
    onTabChanged(tab: QueryTab): any;
    onSelectedColumnChanged(): void;
    onSelectedColumnRangesChange(selectedRanges: Array<QueryRange>): void;
    onSelectedColumnValuesChange(selectedColumnDisplayValues: Array<any>): void;
    onSelectedFiltersChanged(selectedFilters: Array<string>): void;
    private onColumnSelectChange;
    private getRawValuesForDisplayValues;
}
