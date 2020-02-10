import * as React from 'react';
import { ChartDisplayPopupPropsBase } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ChartDisplayPopupPropsBase';
import { ChartDefinition, ChartProperties, ChartData } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ChartVisibility } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: ChartDefinition[];
    CurrentChartDefinition: ChartDefinition;
    ChartData: ChartData;
    ChartVisibility: ChartVisibility;
    onAddChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionAddAction;
    onEditChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionEditAction;
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
    onSetChartVisibility: (chartVisibility: ChartVisibility) => SystemRedux.ChartSetChartVisibiityAction;
    onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) => ChartRedux.ChartPropertiesUpdateAction;
}
export interface ChartDisplayPopupState {
    EditedChartDefinition: ChartDefinition;
}
declare class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayPopupState> {
    constructor(props: ChartDisplayPopupProps);
    UNSAFE_componentWillReceiveProps(nextProps: ChartDisplayPopupProps, nextContext: any): void;
    render(): JSX.Element;
    onEditChart(): void;
    onChartMinimised(): void;
    onChartMaximised(): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ChartDisplayPopup: import("react-redux").ConnectedComponentClass<typeof ChartDisplayPopupComponent, Pick<ChartDisplayPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ModalContainer" | "ColumnFilters" | "ColorPalette" | "onClose" | "ShowModal">>;
export {};
