import * as React from 'react';
import * as ColumnFilterRedux from '../../../Redux/ActionsReducers/ColumnFilterRedux';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/ColumnFilterState';
import { Expression } from '../../../PredefinedConfig/Common/Expression';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
interface QuickFilterFormProps extends StrategyViewPopupProps<QuickFilterFormComponent> {
    CurrentColumn: AdaptableColumn;
    ColumnWidth: number;
    Adaptable: IAdaptable;
    Columns: AdaptableColumn[];
    UserFilters: UserFilter[];
    SystemFilters: string[];
    NamedFilters: NamedFilter[];
    ColumnCategories: ColumnCategory[];
    ColumnFilters: ColumnFilter[];
    onAddColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterAddAction;
    onEditColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterEditAction;
    onClearColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
}
export interface QuickFilterFormState {
    quickFilterFormText: string;
    filterExpression: Expression;
    numberOperatorPairs: KeyValuePair[];
    stringOperatorPairs: KeyValuePair[];
    dateOperatorPairs: KeyValuePair[];
    placeholder: string;
}
declare class QuickFilterFormComponent extends React.Component<QuickFilterFormProps, QuickFilterFormState> {
    constructor(props: QuickFilterFormProps);
    componentDidUpdate(prevProps: any, prevState: QuickFilterFormState): void;
    componentDidMount(): void;
    reconcileFilters(): void;
    render(): any;
    OnTextChange(searchText: string): void;
    clearExistingColumnFilter(): void;
    createColumnFilter(expression: Expression, searchText: string): void;
    createRangeExpression(operatorKVP: KeyValuePair, searchText: string): void;
    handleFilterChange(searchText: string): void;
    doUpdate(state: Partial<QuickFilterFormState>): void;
    clearState(): void;
    clearExpressionState(searchText: string): void;
    isValidBetweenValues(values: any[]): boolean;
}
export declare let QuickFilterForm: import("react-redux").ConnectedComponent<typeof QuickFilterFormComponent, any>;
export declare const QuickFilterFormReact: (FilterContext: IColumnFilterContext) => JSX.Element;
export {};
