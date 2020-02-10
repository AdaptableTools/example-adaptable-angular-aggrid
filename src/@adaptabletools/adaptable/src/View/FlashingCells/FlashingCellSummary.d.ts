import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';
import { FlashingCell } from '../../PredefinedConfig/FlashingCellState';
export interface FlashingCellSummaryProps extends StrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCells: FlashingCell[];
    onSelectFlashingCell: (flashingCell: FlashingCell) => FlashingCellRedux.FlashingCellSelectAction;
}
export declare class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, EditableConfigEntityState> {
    render(): any;
    onFlashingSelectedChanged(flashingCell: FlashingCell): void;
}
export declare let FlashingCellSummary: import("react-redux").ConnectedComponent<typeof FlashingCellSummaryComponent, any>;
