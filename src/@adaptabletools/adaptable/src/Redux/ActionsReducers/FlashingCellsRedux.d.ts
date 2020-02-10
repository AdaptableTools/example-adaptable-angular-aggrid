import { FlashingCellState, FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import * as Redux from 'redux';
export declare const FLASHING_CELL_SELECT = "FLASHING_CELL_SELECT";
export declare const FLASHING_CELL_SELECT_ALL = "FLASHING_CELL_SELECT_ALL";
export declare const FLASHING_CELL_CHANGE_UP_COLOR = "FLASHING_CELL_CHANGE_UP_COLOR";
export declare const FLASHING_CELL_CHANGE_DOWN_COLOR = "FLASHING_CELL_CHANGE_DOWN_COLOR";
export declare const FLASHING_CELL_CHANGE_DURATION = "FLASHING_CELL_CHANGE_DURATION";
export interface FlashingCellSelectAction extends Redux.Action {
    FlashingCell: FlashingCell;
}
export interface FlashingCellSelectAllAction extends Redux.Action {
    FlashingCells: FlashingCell[];
    shouldTurnOn: boolean;
}
export interface FlashingCellChangeDurationAction extends Redux.Action {
    FlashingCell: FlashingCell;
    NewFlashDuration: number;
}
export interface FlashingCellChangeUpColorAction extends Redux.Action {
    FlashingCell: FlashingCell;
    UpColor: string;
}
export interface FlashingCellChangeDownColorAction extends Redux.Action {
    FlashingCell: FlashingCell;
    DownColor: string;
}
export declare const FlashingCellSelect: (FlashingCell: FlashingCell) => FlashingCellSelectAction;
export declare const FlashingCellSelectAll: (shouldTurnOn: boolean, FlashingCells: FlashingCell[]) => FlashingCellSelectAllAction;
export declare const FlashingCellChangeDuration: (FlashingCell: FlashingCell, NewFlashDuration: number) => FlashingCellChangeDurationAction;
export declare const FlashingCellChangeUpColor: (FlashingCell: FlashingCell, UpColor: string) => FlashingCellChangeUpColorAction;
export declare const FlashingCellChangeDownColor: (FlashingCell: FlashingCell, DownColor: string) => FlashingCellChangeDownColorAction;
export declare const FlashingCellReducer: Redux.Reducer<FlashingCellState>;
