import * as React from 'react';
import * as ChartRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux';
import * as SystemRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ChartType } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
interface ChartPopupProps extends StrategyViewPopupProps<ChartPopupComponent> {
    onAddChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionAddAction;
    onEditChartDefinition: (chartDefinition: ChartDefinition) => ChartRedux.ChartDefinitionEditAction;
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
    onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
    ChartDefinitions: Array<ChartDefinition>;
    CurrentChartDefinition: ChartDefinition;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ChartPopupComponent extends React.Component<ChartPopupProps, EditableConfigEntityState> {
    constructor(props: ChartPopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    onShowChart(chartName: string): void;
    onEdit(Chart: ChartDefinition): void;
    onNew(chartType: ChartType): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ChartPopup: import("react-redux").ConnectedComponentClass<typeof ChartPopupComponent, any>;
export {};
