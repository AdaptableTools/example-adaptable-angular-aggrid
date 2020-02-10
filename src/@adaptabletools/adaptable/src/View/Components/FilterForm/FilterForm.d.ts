import * as React from 'react';
import * as Redux from 'redux';
import * as ColumnFilterRedux from '../../../Redux/ActionsReducers/ColumnFilterRedux';
import * as GridRedux from '../../../Redux/ActionsReducers/GridRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { DistinctCriteriaPairValue, LeafExpressionOperator, ColumnMenuTab } from '../../../PredefinedConfig/Common/Enums';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/ColumnFilterState';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { IUIPrompt } from '../../../Utilities/Interface/IMessage';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';
interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
    CurrentColumn: AdaptableColumn;
    Adaptable: IAdaptable;
    Columns: AdaptableColumn[];
    UserFilters: UserFilter[];
    SystemFilters: string[];
    NamedFilters: NamedFilter[];
    ColumnCategories: ColumnCategory[];
    ColumnFilters: ColumnFilter[];
    MenuItems: AdaptableMenuItem[];
    EmbedColumnMenu: boolean;
    ShowCloseButton: boolean;
    onClearColumnFilter: (columnfilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
    onAddColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterAddAction;
    onEditColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterEditAction;
    onSetColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterSetAction;
    onHideFilterForm: () => GridRedux.FilterFormHideAction;
    onMenuItemClick: (action: Redux.Action) => Redux.Action;
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
}
export interface FilterFormState {
    ColumnValuePairs: Array<IRawValueDisplayValuePair>;
    ShowWaitingMessage: boolean;
    SelectedTab: ColumnMenuTab;
    DistinctCriteriaPairValue: DistinctCriteriaPairValue;
    editedColumnFilter: ColumnFilter | undefined;
}
declare class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
    constructor(props: FilterFormProps);
    componentDidMount(): void;
    render(): any;
    isFilterable(): string;
    onSelectTab(tab: any): any;
    getLeafExpressionOperatorsForDataType(dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'): LeafExpressionOperator[];
    onClickColumValue(columnValues: string[]): void;
    onClickUserFilter(userFilters: string[]): void;
    onSetCustomExpression(rangeExpression: QueryRange): void;
    persistFilter(columnDisplayValues: string[], columnRawValues: string[], userFilters: string[], rangeExpressions: QueryRange[]): void;
    onSaveFilter(): void;
    onClearFilter(): void;
    onFilterApplied(): void;
    onCloseForm(): void;
    onMenuItemClick(action: Redux.Action): any;
}
export declare let FilterForm: import("react-redux").ConnectedComponent<typeof FilterFormComponent, any>;
export declare const FilterFormReact: (FilterContext: IColumnFilterContext) => JSX.Element;
export {};
