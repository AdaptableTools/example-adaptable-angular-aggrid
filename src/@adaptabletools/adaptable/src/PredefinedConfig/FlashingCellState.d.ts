import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
/**
 * The Predefined Configuration for the Flashing Cell function
 *
 */
export interface FlashingCellState extends RunTimeState {
    /**
     * Collection of Flashing Cell objects which define how a single cell will flash when it is changed.
     *
     * Ony operates on Numeric Cells
     */
    FlashingCells?: FlashingCell[];
    /**
     * The default colour to use for flashing when the numeric change in value is **up**.
     *
     * **Default Value: dark green**
     */
    DefaultUpColor?: string;
    /**
     * The default colour to use for flashing when the numeric change in value is **down**.
     *
     * **Default Value: red**
     */
    DefautDownColor?: string;
    /**
     * The default duration (in miliseconds) that a cell will flash when it has changed
     *
     * **Default Value: 500**
     */
    DefaultDuration?: 250 | 500 | 750 | 1000;
}
export interface FlashingCell extends AdaptableObject {
    IsLive: boolean;
    ColumnId: string;
    FlashingCellDuration: 250 | 500 | 750 | 1000;
    UpColor: string;
    DownColor: string;
}
