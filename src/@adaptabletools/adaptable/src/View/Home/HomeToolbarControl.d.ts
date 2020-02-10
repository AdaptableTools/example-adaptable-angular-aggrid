import * as React from 'react';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import { GridState } from '../../PredefinedConfig/GridState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Visibility, DashboardSize } from '../../PredefinedConfig/Common/Enums';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';
import { AdaptableDashboardToolbar, AdaptableDashboardToolbars } from '../../PredefinedConfig/Common/Types';
interface HomeToolbarComponentProps extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
    GridState: GridState;
    DashboardState: DashboardState;
    Columns: AdaptableColumn[];
    StatusMessage: string;
    StatusType: string;
    HeaderText: string;
    DashboardSize: DashboardSize;
    onNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) => SystemRedux.SetNewColumnListOrderAction;
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
    onSetToolbarVisibility: (toolbars: AdaptableDashboardToolbars) => DashboardRedux.DashboardSetToolbarsAction;
    onShowGridInfo: () => PopupRedux.PopupShowGridInfoAction;
}
declare class HomeToolbarControlComponent extends React.Component<HomeToolbarComponentProps, {}> {
    constructor(props: HomeToolbarComponentProps);
    render(): JSX.Element;
    createToolbar(toolbar: AdaptableDashboardToolbar | string, title: string, isVisible: boolean): any;
    onClick(menuItem: AdaptableMenuItem): void;
    onShowSystemStatus(): void;
    onClickGridInfo(): void;
    onSetColumnVisibility(name: string): void;
    onSetToolbarVisibility(name: string, checked: boolean): void;
}
export declare const HomeToolbarControl: import("react-redux").ConnectedComponent<typeof HomeToolbarControlComponent, any>;
export {};
