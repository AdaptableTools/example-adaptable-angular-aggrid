import * as React from 'react';
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/CellSummaryRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import { CellSummaryOperationDefinition } from '../../PredefinedConfig/CellSummaryState';
interface CellSummaryToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<CellSummaryToolbarControlComponent> {
    SelectedCellInfo: SelectedCellInfo;
    CellSummaryOperationDefinitions: CellSummaryOperationDefinition[];
    CellSummaryOperation: CellSummaryOperation | string;
    OptionalSummaryOperations: string[];
    onCellSummaryOperationChange: (summaryOperation: CellSummaryOperation | string) => SelectedCellsRedux.CellSummaryChangeOperationAction;
    onCreateCellSummary: () => GridRedux.GridCreateCellSummaryAction;
    CellSummary: CellSummmary;
}
declare class CellSummaryToolbarControlComponent extends React.Component<CellSummaryToolbarControlComponentProps, {}> {
    constructor(props: CellSummaryToolbarControlComponentProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onSelectionChanged;
    private getOperationValue;
}
export declare let CellSummaryToolbarControl: import("react-redux").ConnectedComponent<typeof CellSummaryToolbarControlComponent, any>;
export {};
