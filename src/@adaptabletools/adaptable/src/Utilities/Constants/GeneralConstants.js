"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ChartEnums_1 = require("../../PredefinedConfig/Common/ChartEnums");
var UIHelper_1 = require("../../View/UIHelper");
exports.MISSING_COLUMN = ' [MISSING]';
exports.DEFAULT_LAYOUT = 'Ab_Default_Layout';
exports.LIGHT_THEME = 'light';
exports.DARK_THEME = 'dark';
exports.USER_NAME = 'anonymous';
exports.ADAPTABLE_ID = 'adaptable_id';
exports.ADAPTABLE = 'AdapTable';
exports.MENU_PREFIX = 'ab_';
exports.READ_ONLY_STYLE = 'ab_readonly';
exports.ALL_COLUMN_VALUES = 'ALL_COLUMN_VALUES';
exports.FILTER_ALWAYS = 'Always';
exports.FILTER_NEVER = 'Never';
exports.FILTER_THROTTLE = 'Throttle';
exports.EMPTY_STRING = '';
exports.EMPTY_ARRAY = [];
exports.HALF_SECOND = 500;
exports.YEAR_ADD = 1985;
exports.MONTH_ADD = 47;
/*
Redux / State Defaults
Try to put all our Redux / State defaults here and ONLY reference from here - avoid magic numbers / strings.
Please!!!
*/
// Alert
exports.ALERT_DEFAULT_MAX_ALERTS_IN_STORE = 20;
// Calendar
exports.CALENDAR_DEFAULT_CURRENT_CALENDER = 'United States';
// Charts
exports.CHART_DEFAULT_REFRESH_RATE = 3; // refresh the chart every 3 seconds if stuff chnanges
// Quick Search
exports.QUICK_SEARCH_DEFAULT_DISPLAY_ACTION = Enums_1.DisplayAction.HighlightCell;
exports.QUICK_SEARCH_DEFAULT_BACK_COLOR = UIHelper_1.getHexForName(UIHelper_1.LIGHT_YELLOW);
exports.QUICK_SEARCH_DEFAULT_FORE_COLOR = UIHelper_1.getHexForName(UIHelper_1.BLACK);
// Flashing Cells
exports.FLASHING_CELLS_DEFAULT_DURATION = 500;
exports.UPDATED_ROWS_DEFAULT_DURATION = 1000;
// Selected Cells
exports.SMART_EDIT_DEFAULT_VALUE = 1;
exports.SMART_EDIT_DEFAULT_OPERATION = Enums_1.MathOperation.Multiply;
// Cells Summary
exports.CELL_SUMMARY_DEFAULT_OPERATION = Enums_1.CellSummaryOperation.Sum;
// system
exports.SYSTEM_DEFAULT_CHART_VISIBILITY = ChartEnums_1.ChartVisibility.Hidden;
// export const SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR: 'Red' | 'Amber' | 'Green' | 'Blue' =
//  StatusColour.Green;
exports.SYSTEM_DEFAULT_SYSTEM_STATUS_TYPE = Enums_1.MessageType.Info;
// theme
exports.THEME_DEFAULT_CURRENT_THEME = exports.LIGHT_THEME;
// Updated Row
exports.UPDATED_ROW_DEFAULT_MAX_ALERTS_IN_STORE = Infinity;
// Live Report Throttle Time (used in OpenFin, IPushPull, Glue42 etc.)
exports.DEFAULT_LIVE_REPORT_THROTTLE_TIME = 2000;
/**
 * Object Factory
 */
exports.CHART_DEFAULT_YAXIS_TOTAL = ChartEnums_1.AxisTotal.Sum;
exports.PLUS_MINUS_DEFAULT_NUDGE_VALUE = 1;
exports.ALERT_DEFAULT_OPERATOR = Enums_1.LeafExpressionOperator.AnyChange;
exports.ALERT_DEFAULT_RANGE_OPERAND_TYPE = 'Column';
exports.ALERT_DEFAULT_MESSAGE_TYPE = 'Error';
exports.ALERT_DEFAULT_SHOW_POPUP = true;
exports.ALERT_DEFAULT_HIGHLIGHT_CELL = true;
exports.ALERT_DEFAULT_HIGHLIGHT_ROW = true;
/**
 * Constants for State (primarily for audit property events) - good idea?
 */
exports.CURRENT_ADVANCED_SEARCH_STATE_PROPERTY = 'CurrentAdvancedSearch';
exports.CURRENT_CHART_NAME_STATE_PROPERTY = 'CurrentChartName';
exports.BULK_UPDATE_VALUE_STATE_PROPERTY = 'BulkUpdateValue';
exports.CURRENT_CALENDAR_STATE_PROPERTY = 'CurrentCalendar';
exports.SUMMARY_OPERATION_STATE_PROPERTY = 'SummaryOperation';
exports.CURRENT_LAYOUT_STATE_PROPERTY = 'CurrentLayout';
exports.CURRENT_DATA_SOURCE_STATE_PROPERTY = 'CurrentDataSource';
exports.CURRENT_REPORT_STATE_PROPERTY = 'CurrentReport';
exports.FLASHING_CELL_DEFAULT_UP_COLOR_STATE_PROPERTY = 'DefaultUpColor';
exports.FLASHING_CELL_DEFAULT_DOWN_COLOR_STATE_PROPERTY = 'DefautDownColor';
exports.FLASHING_CELL_DEFAULT_DURATION_STATE_PROPERTY = 'DefaultDuration';
exports.CURRENT_THEME_STATE_PROPERTY = 'CurrentTheme';
exports.QUICK_SEARCH_TEXT_STATE_PROPERTY = 'QuickSearchText';
exports.QUICK_SEARCH_DISPLAY_ACTION_STATE_PROPERTY = 'DisplayAction';
exports.QUICK_SEARCH_STYLE_STATE_PROPERTY = 'Style';
exports.SMART_EDIT_VALUE_STATE_PROPERTY = 'SmartEditValue';
exports.SMART_EDIT_MATH_OPERATION_STATE_PROPERTY = 'MathOperationz';
// consts for Themes
exports.SYSTEM_THEMES = [
    {
        Name: exports.LIGHT_THEME,
        Description: 'Light Theme',
    },
    {
        Name: exports.DARK_THEME,
        Description: 'Dark Theme',
    },
];
exports.ALL_DATA_REPORT = 'All Data';
exports.VISIBLE_DATA_REPORT = 'Visible Data';
exports.SELECTED_CELLS_REPORT = 'Selected Cells';
exports.SELECTED_ROWS_REPORT = 'Selected Rows';
