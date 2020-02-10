import * as React from 'react';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { StrategyParams } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { ToolPanelStrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface ChartToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<ChartToolPanelComponent> {
    ChartDefinitions: ChartDefinition[];
    CurrentChartDefinition: ChartDefinition;
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
    onNewChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
    onEditChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
    onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
}
interface ChartToolPanelComponentState {
    IsMinimised: boolean;
}
declare class ChartToolPanelComponent extends React.Component<ChartToolPanelComponentProps, ChartToolPanelComponentState> {
    constructor(props: ChartToolPanelComponentProps);
    render(): JSX.Element;
    onSelectedChartDefinitionChanged(chartDefinitionName: string): void;
    onShowChart(): void;
}
export declare let ChartToolPanel: import("react-redux").ConnectedComponentClass<typeof ChartToolPanelComponent, Pick<ChartToolPanelComponentProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "ColumnSorts" | "onClosePopup" | "ColumnFilters" | "ColorPalette" | "AdaptableApi">>;
export {};
