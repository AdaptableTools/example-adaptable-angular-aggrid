import * as React from 'react';
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/CellSummaryRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import { CellSummaryOperationDefinition } from '../../PredefinedConfig/CellSummaryState';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface CellSummaryToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<CellSummaryToolPanelComponent> {
    SelectedCellInfo: SelectedCellInfo;
    CellSummaryOperationDefinitions: CellSummaryOperationDefinition[];
    CellSummaryOperation: CellSummaryOperation | string;
    onCellSummaryOperationChange: (summaryOperation: CellSummaryOperation | string) => SelectedCellsRedux.CellSummaryChangeOperationAction;
    onCreateCellSummary: () => GridRedux.GridCreateCellSummaryAction;
    CellSummary: CellSummmary;
}
interface CellSummaryToolPanelComponentState {
    IsMinimised: boolean;
}
declare class CellSummaryToolPanelComponent extends React.Component<CellSummaryToolPanelComponentProps, CellSummaryToolPanelComponentState> {
    constructor(props: CellSummaryToolPanelComponentProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onSelectionChanged;
    private getOperationValue;
}
export declare let CellSummaryToolPanel: import("react-redux").ConnectedComponent<typeof CellSummaryToolPanelComponent, any>;
export {};
