import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';
import { FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
interface FlashingCellsPopupProps extends StrategyViewPopupProps<FlashingCellsPopupComponent> {
    FlashingCells: FlashingCell[] | undefined;
    CalculatedColumns: CalculatedColumn[] | undefined;
    onSelectColumn: (flashingCell: FlashingCell) => FlashingCellsRedux.FlashingCellSelectAction;
    onSelectAllColumns: (shouldTurnOn: boolean, numericColumns: FlashingCell[]) => FlashingCellsRedux.FlashingCellSelectAllAction;
    onChangeFlashDuration: (flashingCell: FlashingCell, newFlashDuration: number) => FlashingCellsRedux.FlashingCellChangeDurationAction;
    onChangeDownColorFlashingCell: (flashingCell: FlashingCell, DownColor: string) => FlashingCellsRedux.FlashingCellChangeDownColorAction;
    onChangeUpColorFlashingCell: (flashingCell: FlashingCell, UpColor: string) => FlashingCellsRedux.FlashingCellChangeUpColorAction;
}
declare class FlashingCellsPopupComponent extends React.Component<FlashingCellsPopupProps, {}> {
    constructor(props: FlashingCellsPopupProps);
    render(): JSX.Element;
}
export declare let FlashingCellsPopup: import("react-redux").ConnectedComponent<typeof FlashingCellsPopupComponent, Pick<FlashingCellsPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
