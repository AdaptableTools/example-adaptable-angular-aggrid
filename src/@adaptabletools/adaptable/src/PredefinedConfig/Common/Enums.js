"use strict";
// General Enums
Object.defineProperty(exports, "__esModule", { value: true });
var DataType;
(function (DataType) {
    DataType["String"] = "String";
    DataType["Number"] = "Number";
    DataType["NumberArray"] = "NumberArray";
    DataType["Boolean"] = "Boolean";
    DataType["Date"] = "Date";
    DataType["Object"] = "Object";
    DataType["All"] = "All";
    DataType["Unknown"] = "Unknown";
})(DataType = exports.DataType || (exports.DataType = {}));
var ExpressionMode;
(function (ExpressionMode) {
    ExpressionMode["SingleColumn"] = "SingleColumn";
    ExpressionMode["MultiColumn"] = "MultiColumn";
})(ExpressionMode = exports.ExpressionMode || (exports.ExpressionMode = {}));
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["ReadOnly"] = "ReadOnly";
    AccessLevel["Hidden"] = "Hidden";
    AccessLevel["Full"] = "Full";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var LeafExpressionOperator;
(function (LeafExpressionOperator) {
    // Still not sure about this tbh
    LeafExpressionOperator["None"] = "None";
    // Numeric and Date
    LeafExpressionOperator["GreaterThan"] = "GreaterThan";
    LeafExpressionOperator["LessThan"] = "LessThan";
    LeafExpressionOperator["Equals"] = "Equals";
    LeafExpressionOperator["NotEquals"] = "NotEquals";
    LeafExpressionOperator["GreaterThanOrEqual"] = "GreaterThanOrEqual";
    LeafExpressionOperator["LessThanOrEqual"] = "LessThanOrEqual";
    LeafExpressionOperator["Between"] = "Between";
    // String
    LeafExpressionOperator["Contains"] = "Contains";
    LeafExpressionOperator["NotContains"] = "NotContains";
    LeafExpressionOperator["StartsWith"] = "StartsWith";
    LeafExpressionOperator["EndsWith"] = "EndsWith";
    LeafExpressionOperator["Regex"] = "Regex";
    // Cell Validations
    LeafExpressionOperator["AnyChange"] = "AnyChange";
    LeafExpressionOperator["ValueChange"] = "ValueChange";
    LeafExpressionOperator["PercentChange"] = "PercentChange";
    LeafExpressionOperator["NotBetween"] = "NotBetween";
    LeafExpressionOperator["IsPositive"] = "IsPositive";
    LeafExpressionOperator["IsNegative"] = "IsNegative";
    LeafExpressionOperator["IsNotNumber"] = "IsNotNumber";
    LeafExpressionOperator["IsTrue"] = "IsTrue";
    LeafExpressionOperator["IsFalse"] = "IsFalse";
    LeafExpressionOperator["NoDuplicateValues"] = "NoDuplicateValues";
    LeafExpressionOperator["ExistingValuesOnly"] = "ExistingValuesOnly";
    // Special
    LeafExpressionOperator["PrimaryKeyDuplicate"] = "PrimaryKeyDuplicate";
})(LeafExpressionOperator = exports.LeafExpressionOperator || (exports.LeafExpressionOperator = {}));
var MathOperation;
(function (MathOperation) {
    MathOperation["Add"] = "Add";
    MathOperation["Subtract"] = "Subtract";
    MathOperation["Multiply"] = "Multiply";
    MathOperation["Divide"] = "Divide";
    MathOperation["Replace"] = "Replace";
})(MathOperation = exports.MathOperation || (exports.MathOperation = {}));
// Enums used in Strategies
var ActionMode;
(function (ActionMode) {
    ActionMode["WarnUser"] = "Warn User";
    ActionMode["StopEdit"] = "Stop Edit";
})(ActionMode = exports.ActionMode || (exports.ActionMode = {}));
var LayoutSource;
(function (LayoutSource) {
    LayoutSource["Existing"] = "Existing";
    LayoutSource["New"] = "New";
})(LayoutSource = exports.LayoutSource || (exports.LayoutSource = {}));
var ReportColumnScope;
(function (ReportColumnScope) {
    ReportColumnScope["AllColumns"] = "AllColumns";
    ReportColumnScope["VisibleColumns"] = "VisibleColumns";
    ReportColumnScope["SelectedCellColumns"] = "SelectedCellColumns";
    ReportColumnScope["BespokeColumns"] = "BespokeColumns";
})(ReportColumnScope = exports.ReportColumnScope || (exports.ReportColumnScope = {}));
var ReportRowScope;
(function (ReportRowScope) {
    ReportRowScope["AllRows"] = "AllRows";
    ReportRowScope["VisibleRows"] = "VisibleRows";
    ReportRowScope["SelectedCellRows"] = "SelectedCellRows";
    ReportRowScope["SelectedRows"] = "SelectedRows";
    ReportRowScope["ExpressionRows"] = "ExpressionRows";
})(ReportRowScope = exports.ReportRowScope || (exports.ReportRowScope = {}));
var ExportDestination;
(function (ExportDestination) {
    ExportDestination["CSV"] = "CSV";
    ExportDestination["Clipboard"] = "Clipboard";
    ExportDestination["JSON"] = "JSON";
    ExportDestination["OpenfinExcel"] = "OpenfinExcel";
    ExportDestination["Glue42"] = "Glue42";
})(ExportDestination = exports.ExportDestination || (exports.ExportDestination = {}));
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["Report"] = "Report";
    ScheduleType["iPushPull"] = "iPushPull";
    ScheduleType["Glue42"] = "Glue42";
    ScheduleType["Reminder"] = "Reminder";
})(ScheduleType = exports.ScheduleType || (exports.ScheduleType = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["Ascending"] = "Ascending";
    SortOrder["Descending"] = "Descending";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var DisplayAction;
(function (DisplayAction) {
    DisplayAction["HighlightCell"] = "HighlightCell";
    DisplayAction["ShowRow"] = "ShowRow";
    DisplayAction["ShowRowAndHighlightCell"] = "ShowRowAndHighlightCell";
})(DisplayAction = exports.DisplayAction || (exports.DisplayAction = {}));
var RangeOperandType;
(function (RangeOperandType) {
    RangeOperandType["Column"] = "Column";
    RangeOperandType["Value"] = "Value";
})(RangeOperandType = exports.RangeOperandType || (exports.RangeOperandType = {}));
var SelectionMode;
(function (SelectionMode) {
    SelectionMode["Multi"] = "Multi";
    SelectionMode["Single"] = "Single";
})(SelectionMode = exports.SelectionMode || (exports.SelectionMode = {}));
// make sure enum items match IRawValueDisplayValuePair
var DistinctCriteriaPairValue;
(function (DistinctCriteriaPairValue) {
    DistinctCriteriaPairValue["RawValue"] = "RawValue";
    DistinctCriteriaPairValue["DisplayValue"] = "DisplayValue";
})(DistinctCriteriaPairValue = exports.DistinctCriteriaPairValue || (exports.DistinctCriteriaPairValue = {}));
var FontWeight;
(function (FontWeight) {
    FontWeight["Normal"] = "Normal";
    FontWeight["Bold"] = "Bold";
})(FontWeight = exports.FontWeight || (exports.FontWeight = {}));
var FontStyle;
(function (FontStyle) {
    FontStyle["Normal"] = "Normal";
    FontStyle["Italic"] = "Italic";
})(FontStyle = exports.FontStyle || (exports.FontStyle = {}));
var FontSize;
(function (FontSize) {
    FontSize["XSmall"] = "XSmall";
    FontSize["Small"] = "Small";
    FontSize["Medium"] = "Medium";
    FontSize["Large"] = "Large";
    FontSize["XLarge"] = "XLarge";
})(FontSize = exports.FontSize || (exports.FontSize = {}));
var PanelWidth;
(function (PanelWidth) {
    PanelWidth["Wide"] = "800px";
    PanelWidth["Medium"] = "600px";
    PanelWidth["Narrow"] = "400px";
})(PanelWidth = exports.PanelWidth || (exports.PanelWidth = {}));
var QueryBuildStatus;
(function (QueryBuildStatus) {
    QueryBuildStatus[QueryBuildStatus["SelectFirstColumn"] = 0] = "SelectFirstColumn";
    QueryBuildStatus[QueryBuildStatus["SelectFurtherColumn"] = 1] = "SelectFurtherColumn";
    QueryBuildStatus[QueryBuildStatus["ColumnSelected"] = 2] = "ColumnSelected";
    QueryBuildStatus[QueryBuildStatus["SingleConditionsAdded"] = 3] = "SingleConditionsAdded";
    QueryBuildStatus[QueryBuildStatus["MultipleConditionsAdded"] = 4] = "MultipleConditionsAdded";
})(QueryBuildStatus = exports.QueryBuildStatus || (exports.QueryBuildStatus = {}));
var SearchChangedTrigger;
(function (SearchChangedTrigger) {
    SearchChangedTrigger["DataSource"] = "DataSource";
    SearchChangedTrigger["AdvancedSearch"] = "AdvancedSearch";
    SearchChangedTrigger["QuickSearch"] = "QuickSearch";
    SearchChangedTrigger["ColumnFilter"] = "ColumnFilter";
    SearchChangedTrigger["UserFilter"] = "UserFilter";
    SearchChangedTrigger["DataChange"] = "DataChange";
    SearchChangedTrigger["Sort"] = "Sort";
})(SearchChangedTrigger = exports.SearchChangedTrigger || (exports.SearchChangedTrigger = {}));
var Visibility;
(function (Visibility) {
    Visibility["Minimised"] = "Minimised";
    Visibility["Visible"] = "Visible";
    Visibility["Hidden"] = "Hidden";
})(Visibility = exports.Visibility || (exports.Visibility = {}));
var QueryTab;
(function (QueryTab) {
    QueryTab["ColumnValue"] = "ColumnValue";
    QueryTab["Filter"] = "Filter";
    QueryTab["QueryRange"] = "QueryRange";
})(QueryTab = exports.QueryTab || (exports.QueryTab = {}));
var ColumnMenuTab;
(function (ColumnMenuTab) {
    ColumnMenuTab["Menu"] = "Menu";
    ColumnMenuTab["Filter"] = "Filter";
})(ColumnMenuTab = exports.ColumnMenuTab || (exports.ColumnMenuTab = {}));
var StatusColour;
(function (StatusColour) {
    StatusColour["Red"] = "var(--ab-color-error)";
    StatusColour["Amber"] = "var(--ab-color-warn)";
    StatusColour["Green"] = "var(--ab-color-success)";
    StatusColour["Blue"] = "var(--ab-color-info)";
})(StatusColour = exports.StatusColour || (exports.StatusColour = {}));
var MessageType;
(function (MessageType) {
    MessageType["Info"] = "Info";
    MessageType["Success"] = "Success";
    MessageType["Warning"] = "Warning";
    MessageType["Error"] = "Error";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var CellSummaryOperation;
(function (CellSummaryOperation) {
    CellSummaryOperation["Sum"] = "Sum";
    CellSummaryOperation["Average"] = "Average";
    CellSummaryOperation["Median"] = "Median";
    CellSummaryOperation["Mode"] = "Mode";
    CellSummaryOperation["Distinct"] = "Distinct";
    CellSummaryOperation["Max"] = "Max";
    CellSummaryOperation["Min"] = "Min";
    CellSummaryOperation["Count"] = "Count";
})(CellSummaryOperation = exports.CellSummaryOperation || (exports.CellSummaryOperation = {}));
var PinnedColumnDirection;
(function (PinnedColumnDirection) {
    PinnedColumnDirection["Left"] = "Leftt";
    PinnedColumnDirection["Right"] = "Right";
})(PinnedColumnDirection = exports.PinnedColumnDirection || (exports.PinnedColumnDirection = {}));
var FilterOnDataChangeOptions;
(function (FilterOnDataChangeOptions) {
    FilterOnDataChangeOptions["Always"] = "Always";
    FilterOnDataChangeOptions["Never"] = "Never";
    FilterOnDataChangeOptions["Throttle"] = "Throttle";
})(FilterOnDataChangeOptions = exports.FilterOnDataChangeOptions || (exports.FilterOnDataChangeOptions = {}));
var DashboardSize;
(function (DashboardSize) {
    DashboardSize["Small"] = "small";
    DashboardSize["XSmall"] = "xsmall";
})(DashboardSize = exports.DashboardSize || (exports.DashboardSize = {}));
var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["Text"] = "text";
    ButtonVariant["Outlined"] = "outlined";
    ButtonVariant["Raised"] = "raised";
    ButtonVariant["Unelevated"] = "unelevated";
})(ButtonVariant = exports.ButtonVariant || (exports.ButtonVariant = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
