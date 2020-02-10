import * as Redux from 'redux';
import { GridCell } from '../Selection/GridCell';
import { AdaptableColumn } from './AdaptableColumn';
import { AdaptableFunctionName } from './Types';
/**
 * The main menu item used by Adaptable.
 *
 * It is used in 3 places:
 *
 * - **Function Menu**: the menu at the left of the Home Toolbar (with a home icon) and at the top of Adaptable Tool Panel that shows all the available functions.  Clicking a menu item will open the popup for that Function.
 *
 * - **Column Header Menu**: the menu that appears in the Column Header.  We add our menu items after those provided by the vendor grid.
 *
 * - **Context Menu**: when you right-click any cell in the grid.
 */
export interface AdaptableMenuItem {
    /**
     * The name that appears in the menu
     */
    Label: string;
    /**
     * The name of the function.
     */
    FunctionName: AdaptableFunctionName;
    ReduxAction?: Redux.Action;
    ClickFunction?: () => void;
    IsVisible: boolean;
    Icon: string;
}
/**
 * Provides details about the context for the current Menu
 *
 * Used for both Column and Context Menus though for the former only the `column' property is populated.
 */
export interface MenuInfo {
    /**
     *  The cell that has been clicked.  Contains the current value of the cell
     */
    GridCell: GridCell;
    /**
     * The current Column
     */
    Column: AdaptableColumn;
    /**
     * Whether or not the cell clicked is one that is currently selected.
     *
     * If it is not, then some options are not available.
     */
    IsSelectedCell: boolean;
    /**
     * Whether or not the column that has been clicked is the ONLY column with selected cells.
     *
     * If it is not, then some options are not available.
     */
    IsSingleSelectedColumn: boolean;
    /**
     * The current row node
     */
    RowNode: any;
    /**
     * The value of the primary key column in the current row
     */
    PrimaryKeyValue: any;
}
