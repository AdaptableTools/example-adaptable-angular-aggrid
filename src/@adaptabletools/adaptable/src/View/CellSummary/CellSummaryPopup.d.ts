import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
interface CellSummaryPopupProps extends StrategyViewPopupProps<CellSummaryPopupComponent> {
    CellSummary: CellSummmary;
    onSetSelectedCellSummary: () => GridRedux.GridSetCellSummaryAction;
}
declare class CellSummaryPopupComponent extends React.Component<CellSummaryPopupProps, EditableConfigEntityState> {
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare let CellSummaryPopup: import("react-redux").ConnectedComponent<typeof CellSummaryPopupComponent, any>;
export {};
