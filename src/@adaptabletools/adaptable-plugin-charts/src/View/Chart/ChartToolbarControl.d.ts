import * as React from 'react';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import { ToolbarStrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ToolbarStrategyViewPopupProps';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { StrategyParams } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
interface ChartToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ChartToolbarControlComponent> {
    ChartDefinitions: ChartDefinition[];
    CurrentChartDefinition: ChartDefinition;
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
    onNewChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
    onEditChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
    onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
}
declare class ChartToolbarControlComponent extends React.Component<ChartToolbarControlComponentProps, {}> {
    render(): JSX.Element;
    onSelectedChartDefinitionChanged(chartDefinitionName: string): void;
    onShowChart(): void;
}
export declare let ChartToolbarControl: import("react-redux").ConnectedComponentClass<typeof ChartToolbarControlComponent, Pick<ChartToolbarControlComponentProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "ColumnSorts" | "onClosePopup" | "ColumnFilters" | "ColorPalette">>;
export {};
