import * as React from 'react';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface ColumnFilterToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<ColumnFilterToolPanelComponent> {
    onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction;
    onClearColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
    onHideQuickFilterBar: () => GridRedux.QuickFilterBarHideAction;
    onShowQuickFilterBar: () => GridRedux.QuickFilterBarShowAction;
    ColumnFilters: ColumnFilter[];
    Columns: AdaptableColumn[];
    UserFilters: UserFilter[];
    Entitlements: Entitlement[];
    IsQuickFilterActive: boolean;
}
interface ColumnFilterTToolPanelComponentState {
    IsMinimised: boolean;
}
declare class ColumnFilterToolPanelComponent extends React.Component<ColumnFilterToolPanelComponentProps, ColumnFilterTToolPanelComponentState> {
    constructor(props: ColumnFilterToolPanelComponentProps);
    render(): any;
    private onClearFilters;
    private onClearColumnFilter;
    private onSaveColumnFilterasUserFilter;
}
export declare let ColumnFilterToolPanel: import("react-redux").ConnectedComponent<typeof ColumnFilterToolPanelComponent, any>;
export {};
