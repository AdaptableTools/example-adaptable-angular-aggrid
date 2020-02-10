import * as React from 'react';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
interface ColumnFilterToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
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
declare class ColumnFilterToolbarControlComponent extends React.Component<ColumnFilterToolbarControlComponentProps, {}> {
    render(): any;
    private onClearFilters;
    private onClearColumnFilter;
    private onSaveColumnFilterasUserFilter;
}
export declare let ColumnFilterToolbarControl: import("react-redux").ConnectedComponent<typeof ColumnFilterToolbarControlComponent, any>;
export {};
