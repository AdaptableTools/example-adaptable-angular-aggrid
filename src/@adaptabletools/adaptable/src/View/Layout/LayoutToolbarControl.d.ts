import * as React from 'react';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { Layout } from '../../PredefinedConfig/LayoutState';
interface LayoutToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<LayoutToolbarControlComponent> {
    onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
    onRestoreLayout: (layout: Layout) => LayoutRedux.LayoutRestoreAction;
    onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
    onNewLayout: () => PopupRedux.PopupShowScreenAction;
    Layouts: Layout[];
    CurrentLayout: string;
}
declare class LayoutToolbarControlComponent extends React.Component<LayoutToolbarControlComponentProps, {}> {
    render(): any;
    private onSelectedLayoutChanged;
    private onSaveLayout;
    private onRestoreLayout;
}
export declare let LayoutToolbarControl: import("react-redux").ConnectedComponent<typeof LayoutToolbarControlComponent, any>;
export {};
