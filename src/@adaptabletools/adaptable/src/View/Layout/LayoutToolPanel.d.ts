import * as React from 'react';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { AdaptableApi } from '../../Api/AdaptableApi';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface LayoutToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<LayoutToolPanelComponent> {
    onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
    onRestoreLayout: (layout: Layout) => LayoutRedux.LayoutRestoreAction;
    onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
    onNewLayout: () => PopupRedux.PopupShowScreenAction;
    Layouts: Layout[];
    CurrentLayout: string;
    AdaptableApi: AdaptableApi;
}
interface LayoutToolPanelComponentState {
    IsMinimised: boolean;
}
declare class LayoutToolPanelComponent extends React.Component<LayoutToolPanelComponentProps, LayoutToolPanelComponentState> {
    constructor(props: LayoutToolPanelComponentProps);
    render(): any;
    private onSelectedLayoutChanged;
    private onSaveLayout;
    private onRestoreLayout;
}
export declare let LayoutToolPanel: import("react-redux").ConnectedComponent<typeof LayoutToolPanelComponent, any>;
export {};
