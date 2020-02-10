import * as React from 'react';
import * as Redux from 'redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { EntitlementState } from '../../PredefinedConfig/EntitlementState';
interface DashboardComponentProps extends StrategyViewPopupProps<DashboardComponent> {
    DashboardState: DashboardState;
    EntitlementState: EntitlementState;
    onClick: (action: Redux.Action) => Redux.Action;
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
}
declare class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
    render(): JSX.Element;
}
export declare let Dashboard: import("react-redux").ConnectedComponent<typeof DashboardComponent, any>;
export {};
