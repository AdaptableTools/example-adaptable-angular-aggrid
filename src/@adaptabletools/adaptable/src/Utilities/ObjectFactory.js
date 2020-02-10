"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var GeneralConstants_1 = require("./Constants/GeneralConstants");
var ChartEnums_1 = require("../PredefinedConfig/Common/ChartEnums");
var DefaultPieChartProperties_1 = require("./Defaults/DefaultPieChartProperties");
var DefaultCategoryChartProperties_1 = require("./Defaults/DefaultCategoryChartProperties");
var ExpressionHelper_1 = require("./Helpers/ExpressionHelper");
var Uuid_1 = require("../PredefinedConfig/Uuid");
var DefaultSparklinesChartProperties_1 = require("./Defaults/DefaultSparklinesChartProperties");
var UIHelper_1 = require("../View/UIHelper");
function CreateEmptyCustomSort() {
    return { Uuid: Uuid_1.createUuid(), ColumnId: GeneralConstants_1.EMPTY_STRING, SortedValues: [] };
}
exports.CreateEmptyCustomSort = CreateEmptyCustomSort;
function CreateEmptyDataSource() {
    return { Uuid: Uuid_1.createUuid(), Name: GeneralConstants_1.EMPTY_STRING, Description: GeneralConstants_1.EMPTY_STRING };
}
exports.CreateEmptyDataSource = CreateEmptyDataSource;
function CreateEmptyPieChartDefinition() {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.EMPTY_STRING,
        Description: GeneralConstants_1.EMPTY_STRING,
        PrimaryColumnId: GeneralConstants_1.EMPTY_STRING,
        SecondaryColumnId: undefined,
        SecondaryColumnOperation: ChartEnums_1.SecondaryColumnOperation.Count,
        ChartProperties: DefaultPieChartProperties_1.DefaultPieChartProperties,
        ChartType: ChartEnums_1.ChartType.PieChart,
        VisibleRowsOnly: true,
    };
}
exports.CreateEmptyPieChartDefinition = CreateEmptyPieChartDefinition;
function CreateEmptySparklinesChartDefinition() {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.EMPTY_STRING,
        Description: GeneralConstants_1.EMPTY_STRING,
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        Expression: undefined,
        ChartProperties: DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties,
        ChartType: ChartEnums_1.ChartType.SparklinesChart,
        VisibleRowsOnly: true,
    };
}
exports.CreateEmptySparklinesChartDefinition = CreateEmptySparklinesChartDefinition;
function CreateEmptyCategoryChartDefinition() {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.EMPTY_STRING,
        Description: GeneralConstants_1.EMPTY_STRING,
        YAxisColumnIds: [],
        YAxisTotal: GeneralConstants_1.CHART_DEFAULT_YAXIS_TOTAL,
        XAxisColumnId: GeneralConstants_1.EMPTY_STRING,
        XAxisExpression: undefined,
        ChartProperties: DefaultCategoryChartProperties_1.DefaultCategoryChartProperties,
        ChartType: ChartEnums_1.ChartType.CategoryChart,
        VisibleRowsOnly: true,
    };
}
exports.CreateEmptyCategoryChartDefinition = CreateEmptyCategoryChartDefinition;
function CreateEmptyCalculatedColumn() {
    return { Uuid: Uuid_1.createUuid(), ColumnId: GeneralConstants_1.EMPTY_STRING, ColumnExpression: GeneralConstants_1.EMPTY_STRING };
}
exports.CreateEmptyCalculatedColumn = CreateEmptyCalculatedColumn;
function CreateEmptyPlusMinusRule() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        IsDefaultNudge: false,
        NudgeValue: GeneralConstants_1.PLUS_MINUS_DEFAULT_NUDGE_VALUE,
        Expression: null,
    };
}
exports.CreateEmptyPlusMinusRule = CreateEmptyPlusMinusRule;
function CreateEmptyAlert() {
    return {
        Uuid: Uuid_1.createUuid(),
        Header: GeneralConstants_1.EMPTY_STRING,
        Msg: GeneralConstants_1.EMPTY_STRING,
        AlertDefinition: CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Info),
    };
}
exports.CreateEmptyAlert = CreateEmptyAlert;
function CreateAlert(alertHeader, alertMessage, alertDefinition, dataChangedInfo) {
    return {
        Uuid: Uuid_1.createUuid(),
        Header: alertHeader,
        Msg: alertMessage,
        AlertDefinition: alertDefinition,
        DataChangedInfo: dataChangedInfo,
    };
}
exports.CreateAlert = CreateAlert;
function CreateEmptyAlertDefinition() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        Range: {
            Operator: GeneralConstants_1.ALERT_DEFAULT_OPERATOR,
            Operand1: GeneralConstants_1.EMPTY_STRING,
            Operand2: GeneralConstants_1.EMPTY_STRING,
            Operand1Type: GeneralConstants_1.ALERT_DEFAULT_RANGE_OPERAND_TYPE,
            Operand2Type: GeneralConstants_1.ALERT_DEFAULT_RANGE_OPERAND_TYPE,
        },
        Expression: null,
        MessageType: GeneralConstants_1.ALERT_DEFAULT_MESSAGE_TYPE,
        AlertProperties: {
            ShowPopup: GeneralConstants_1.ALERT_DEFAULT_SHOW_POPUP,
        },
    };
}
exports.CreateEmptyAlertDefinition = CreateEmptyAlertDefinition;
function CreateInternalAlertDefinitionForMessages(messageType, showPopup) {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        Range: null,
        Expression: null,
        MessageType: messageType,
        AlertProperties: {
            ShowPopup: showPopup ? showPopup : GeneralConstants_1.ALERT_DEFAULT_SHOW_POPUP,
        },
    };
}
exports.CreateInternalAlertDefinitionForMessages = CreateInternalAlertDefinitionForMessages;
function CreateEmptyAdvancedSearch() {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.EMPTY_STRING,
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
    };
}
exports.CreateEmptyAdvancedSearch = CreateEmptyAdvancedSearch;
function CreateEmptyColumnCategory() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnCategoryId: GeneralConstants_1.EMPTY_STRING,
        ColumnIds: [],
    };
}
exports.CreateEmptyColumnCategory = CreateEmptyColumnCategory;
function CreateEmptyRange() {
    return {
        Operator: Enums_1.LeafExpressionOperator.None,
        Operand1: GeneralConstants_1.EMPTY_STRING,
        Operand2: GeneralConstants_1.EMPTY_STRING,
        Operand1Type: Enums_1.RangeOperandType.Value,
        Operand2Type: Enums_1.RangeOperandType.Value,
    };
}
exports.CreateEmptyRange = CreateEmptyRange;
function CreateEmptyColumnSort() {
    return {
        Column: GeneralConstants_1.EMPTY_STRING,
        SortOrder: Enums_1.SortOrder.Ascending,
    };
}
exports.CreateEmptyColumnSort = CreateEmptyColumnSort;
function CreateEmptyCellValidation() {
    return {
        Uuid: Uuid_1.createUuid(),
        ActionMode: 'Stop Edit',
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        Range: {
            Operator: Enums_1.LeafExpressionOperator.AnyChange,
            Operand1: GeneralConstants_1.EMPTY_STRING,
            Operand2: GeneralConstants_1.EMPTY_STRING,
            Operand1Type: Enums_1.RangeOperandType.Column,
            Operand2Type: Enums_1.RangeOperandType.Column,
        },
        Expression: null,
    };
}
exports.CreateEmptyCellValidation = CreateEmptyCellValidation;
function CreateEmptyPercentBar() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        PositiveValue: undefined,
        NegativeValue: undefined,
        PositiveColor: UIHelper_1.getHexForName(UIHelper_1.DARK_GREEN),
        NegativeColor: UIHelper_1.getHexForName(UIHelper_1.RED),
        ShowValue: false,
        ShowToolTip: true,
        PositiveValueColumnId: undefined,
        NegativeValueColumnId: undefined,
    };
}
exports.CreateEmptyPercentBar = CreateEmptyPercentBar;
function CreateEmptyGradientColumn() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        PositiveValue: undefined,
        BaseValue: 0,
        NegativeValue: undefined,
        PositiveColor: UIHelper_1.getHexForName(UIHelper_1.DARK_GREEN),
        NegativeColor: UIHelper_1.getHexForName(UIHelper_1.RED),
    };
}
exports.CreateEmptyGradientColumn = CreateEmptyGradientColumn;
function CreateEmptySparklineColumn() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        MaximumValue: undefined,
        MinimumValue: undefined,
        ShowToolTip: true,
        LineColor: DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties.Brush,
    };
}
exports.CreateEmptySparklineColumn = CreateEmptySparklineColumn;
function CreateEmptyUserFilter() {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.EMPTY_STRING,
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
    };
}
exports.CreateEmptyUserFilter = CreateEmptyUserFilter;
function CreateEmptyReport() {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.EMPTY_STRING,
        Expression: null,
        ColumnIds: null,
        ReportColumnScope: Enums_1.ReportColumnScope.AllColumns,
        ReportRowScope: Enums_1.ReportRowScope.AllRows,
    };
}
exports.CreateEmptyReport = CreateEmptyReport;
function CreateDefaultFlashingCell(column, upColor, downColor, duration) {
    return {
        Uuid: Uuid_1.createUuid(),
        IsLive: false,
        ColumnId: column.ColumnId,
        FlashingCellDuration: duration,
        UpColor: upColor,
        DownColor: downColor,
    };
}
exports.CreateDefaultFlashingCell = CreateDefaultFlashingCell;
function CreateEmptyBaseSchedule(scheduleType) {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: scheduleType,
        Schedule: CreateEmptySchedule(),
    };
}
exports.CreateEmptyBaseSchedule = CreateEmptyBaseSchedule;
function CreateEmptyReminderSchedule() {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.Reminder,
        Schedule: CreateEmptySchedule(),
        Alert: CreateEmptyAlert(),
    };
}
exports.CreateEmptyReminderSchedule = CreateEmptyReminderSchedule;
function CreateEmptyReportSchedule() {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.Report,
        Schedule: CreateEmptySchedule(),
        ReportName: GeneralConstants_1.EMPTY_STRING,
        ExportDestination: Enums_1.ExportDestination.CSV,
    };
}
exports.CreateEmptyReportSchedule = CreateEmptyReportSchedule;
function CreateEmptyIPushPullReport() {
    return {
        Uuid: Uuid_1.createUuid(),
        ReportName: GeneralConstants_1.EMPTY_STRING,
        Folder: GeneralConstants_1.EMPTY_STRING,
        Page: GeneralConstants_1.EMPTY_STRING,
    };
}
exports.CreateEmptyIPushPullReport = CreateEmptyIPushPullReport;
function CreateEmptyGlue42Report() {
    return {
        Uuid: Uuid_1.createUuid(),
        ReportName: GeneralConstants_1.EMPTY_STRING,
    };
}
exports.CreateEmptyGlue42Report = CreateEmptyGlue42Report;
function CreateEmptyIPushPullSchedule() {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.iPushPull,
        Schedule: CreateEmptySchedule(),
        IPushPullReport: CreateEmptyIPushPullReport(),
        Transmission: 'Snapshot',
    };
}
exports.CreateEmptyIPushPullSchedule = CreateEmptyIPushPullSchedule;
function CreateEmptyGlue42Schedule() {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.Glue42,
        Schedule: CreateEmptySchedule(),
        Glue42Report: CreateEmptyGlue42Report(),
        Transmission: 'Snapshot',
    };
}
exports.CreateEmptyGlue42Schedule = CreateEmptyGlue42Schedule;
function CreateEmptyReminder() {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: 'Reminder',
        Alert: CreateEmptyAlert(),
        Schedule: CreateEmptySchedule(),
    };
}
exports.CreateEmptyReminder = CreateEmptyReminder;
function CreateIPushPullSchedule(iPushPullReport) {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.iPushPull,
        Schedule: CreateEmptySchedule(),
        IPushPullReport: iPushPullReport,
        Transmission: 'Snapshot',
    };
}
exports.CreateIPushPullSchedule = CreateIPushPullSchedule;
function CreateGlue42Schedule(glue42Report) {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.Glue42,
        Schedule: CreateEmptySchedule(),
        Glue42Report: glue42Report,
        Transmission: 'Snapshot',
    };
}
exports.CreateGlue42Schedule = CreateGlue42Schedule;
function CreateReportSchedule(reportName) {
    return {
        Uuid: Uuid_1.createUuid(),
        ScheduleType: Enums_1.ScheduleType.Report,
        Schedule: CreateEmptySchedule(),
        ReportName: reportName,
        ExportDestination: Enums_1.ExportDestination.CSV,
    };
}
exports.CreateReportSchedule = CreateReportSchedule;
function CreateEmptySchedule() {
    return {
        // todo: base of tommorrow?
        Uuid: Uuid_1.createUuid(),
        OneOffDate: undefined,
        DaysOfWeek: [],
        Hour: 0,
        Minute: 0,
    };
}
exports.CreateEmptySchedule = CreateEmptySchedule;
function CreateEmptyShortcut() {
    return {
        Uuid: Uuid_1.createUuid(),
        ShortcutKey: GeneralConstants_1.EMPTY_STRING,
        ShortcutResult: undefined,
        ColumnType: Enums_1.DataType.Number,
        ShortcutOperation: Enums_1.MathOperation.Multiply,
        IsDynamic: false,
    };
}
exports.CreateEmptyShortcut = CreateEmptyShortcut;
function CreateEmptyConditionalStyle() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: undefined,
        ColumnCategoryId: undefined,
        Style: CreateEmptyStyle(),
        ConditionalStyleScope: 'Row',
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
    };
}
exports.CreateEmptyConditionalStyle = CreateEmptyConditionalStyle;
function CreateEmptyFormatColumn() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        Style: CreateEmptyStyle(),
    };
}
exports.CreateEmptyFormatColumn = CreateEmptyFormatColumn;
function CreateEmptyFreeTextColumn() {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: GeneralConstants_1.EMPTY_STRING,
        DefaultValue: GeneralConstants_1.EMPTY_STRING,
        FreeTextStoredValues: [],
    };
}
exports.CreateEmptyFreeTextColumn = CreateEmptyFreeTextColumn;
function CreateEmptyLayout() {
    return {
        Uuid: Uuid_1.createUuid(),
        Columns: [],
        ColumnSorts: [],
        GroupedColumns: null,
        PivotDetails: null,
        Name: '',
        VendorGridInfo: null,
        AdaptableGridInfo: null,
    };
}
exports.CreateEmptyLayout = CreateEmptyLayout;
function CreateLayout(columns, columnSorts, vendorGridInfo, name) {
    return {
        Uuid: Uuid_1.createUuid(),
        Columns: columns ? columns.map(function (x) { return x.ColumnId; }) : [],
        ColumnSorts: columnSorts,
        GroupedColumns: null,
        PivotDetails: null,
        Name: name,
        VendorGridInfo: vendorGridInfo,
        AdaptableGridInfo: {
            CurrentColumns: columns ? columns.map(function (x) { return x.ColumnId; }) : [],
            CurrentColumnSorts: columnSorts,
        },
    };
}
exports.CreateLayout = CreateLayout;
function CreateEmptyPivotDetails() {
    return {
        PivotColumns: [],
        AggregationColumns: [],
    };
}
exports.CreateEmptyPivotDetails = CreateEmptyPivotDetails;
function CreateColumnFilter(columnId, expression) {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: columnId,
        Filter: expression,
    };
}
exports.CreateColumnFilter = CreateColumnFilter;
function CreateUserFilterFromColumnFilter(columnFilter, name) {
    return {
        Uuid: Uuid_1.createUuid(),
        Name: name,
        ColumnId: columnFilter.ColumnId,
        Expression: columnFilter.Filter,
    };
}
exports.CreateUserFilterFromColumnFilter = CreateUserFilterFromColumnFilter;
function CreateRange(operator, operand1, operand2, rangeOperandType, rangeOperandType2) {
    return {
        Operator: operator,
        Operand1: operand1,
        Operand2: operand2,
        Operand1Type: rangeOperandType,
        Operand2Type: rangeOperandType2,
    };
}
exports.CreateRange = CreateRange;
function CreateRangeEvaluation(operator, operand1, operand2, newValue, initialValue, columnId) {
    return {
        operand1: operand1,
        operand2: operand2,
        newValue: newValue,
        operator: operator,
        initialValue: initialValue,
        columnId: columnId,
    };
}
exports.CreateRangeEvaluation = CreateRangeEvaluation;
function CreateCellValidationRule(columnId, range, actionMode, expression) {
    return {
        Uuid: Uuid_1.createUuid(),
        ColumnId: columnId,
        Range: range,
        ActionMode: actionMode,
        Expression: expression,
    };
}
exports.CreateCellValidationRule = CreateCellValidationRule;
function CreateEmptyStyle() {
    return {
        BackColor: undefined,
        ForeColor: undefined,
        FontWeight: Enums_1.FontWeight.Normal,
        FontStyle: Enums_1.FontStyle.Normal,
        FontSize: undefined,
        ClassName: GeneralConstants_1.EMPTY_STRING,
    };
}
exports.CreateEmptyStyle = CreateEmptyStyle;
function CreateEmptyCellSummmary() {
    return {
        Sum: null,
        Average: null,
        Median: null,
        Mode: null,
        Distinct: null,
        Max: null,
        Min: null,
        Count: null,
    };
}
exports.CreateEmptyCellSummmary = CreateEmptyCellSummmary;
function CreateSystemReports() {
    var _systemReports = [];
    _systemReports.push({
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.ALL_DATA_REPORT,
        ReportColumnScope: Enums_1.ReportColumnScope.AllColumns,
        ReportRowScope: Enums_1.ReportRowScope.AllRows,
        ColumnIds: [],
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
    });
    _systemReports.push({
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.VISIBLE_DATA_REPORT,
        ReportColumnScope: Enums_1.ReportColumnScope.VisibleColumns,
        ReportRowScope: Enums_1.ReportRowScope.VisibleRows,
        ColumnIds: [],
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
    });
    _systemReports.push({
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.SELECTED_CELLS_REPORT,
        ReportColumnScope: Enums_1.ReportColumnScope.SelectedCellColumns,
        ReportRowScope: Enums_1.ReportRowScope.SelectedCellRows,
        ColumnIds: [],
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
    });
    _systemReports.push({
        Uuid: Uuid_1.createUuid(),
        Name: GeneralConstants_1.SELECTED_ROWS_REPORT,
        ReportColumnScope: Enums_1.ReportColumnScope.VisibleColumns,
        ReportRowScope: Enums_1.ReportRowScope.SelectedRows,
        ColumnIds: [],
        Expression: ExpressionHelper_1.default.CreateEmptyExpression(),
    });
    return _systemReports;
}
exports.CreateSystemReports = CreateSystemReports;
exports.ObjectFactory = {
    CreateEmptyCustomSort: CreateEmptyCustomSort,
    CreateEmptyDataSource: CreateEmptyDataSource,
    CreateEmptyPieChartDefinition: CreateEmptyPieChartDefinition,
    CreateEmptySparklinesChartDefinition: CreateEmptySparklinesChartDefinition,
    CreateEmptyCategoryChartDefinition: CreateEmptyCategoryChartDefinition,
    CreateEmptyCalculatedColumn: CreateEmptyCalculatedColumn,
    CreateEmptyPlusMinusRule: CreateEmptyPlusMinusRule,
    CreateEmptyAlert: CreateEmptyAlert,
    CreateAlert: CreateAlert,
    CreateEmptyAlertDefinition: CreateEmptyAlertDefinition,
    CreateInternalAlertDefinitionForMessages: CreateInternalAlertDefinitionForMessages,
    CreateEmptyAdvancedSearch: CreateEmptyAdvancedSearch,
    CreateEmptyColumnCategory: CreateEmptyColumnCategory,
    CreateEmptyRange: CreateEmptyRange,
    CreateEmptyColumnSort: CreateEmptyColumnSort,
    CreateEmptyCellValidation: CreateEmptyCellValidation,
    CreateEmptyPercentBar: CreateEmptyPercentBar,
    CreateEmptyGradientColumn: CreateEmptyGradientColumn,
    CreateEmptySparklineColumn: CreateEmptySparklineColumn,
    CreateEmptyUserFilter: CreateEmptyUserFilter,
    CreateEmptyReport: CreateEmptyReport,
    CreateDefaultFlashingCell: CreateDefaultFlashingCell,
    CreateEmptyReminder: CreateEmptyReminder,
    CreateEmptyBaseSchedule: CreateEmptyBaseSchedule,
    CreateEmptyReminderSchedule: CreateEmptyReminderSchedule,
    CreateEmptyReportSchedule: CreateEmptyReportSchedule,
    CreateEmptyIPushPullSchedule: CreateEmptyIPushPullSchedule,
    CreateEmptyIPushPullReport: CreateEmptyIPushPullReport,
    CreateIPushPullSchedule: CreateIPushPullSchedule,
    CreateGlue42Schedule: CreateGlue42Schedule,
    CreateReportSchedule: CreateReportSchedule,
    CreateEmptySchedule: CreateEmptySchedule,
    CreateEmptyShortcut: CreateEmptyShortcut,
    CreateEmptyConditionalStyle: CreateEmptyConditionalStyle,
    CreateEmptyFormatColumn: CreateEmptyFormatColumn,
    CreateEmptyFreeTextColumn: CreateEmptyFreeTextColumn,
    CreateEmptyLayout: CreateEmptyLayout,
    CreateLayout: CreateLayout,
    CreateEmptyPivotDetails: CreateEmptyPivotDetails,
    CreateColumnFilter: CreateColumnFilter,
    CreateUserFilterFromColumnFilter: CreateUserFilterFromColumnFilter,
    CreateRange: CreateRange,
    CreateRangeEvaluation: CreateRangeEvaluation,
    CreateCellValidationRule: CreateCellValidationRule,
    CreateEmptyStyle: CreateEmptyStyle,
    CreateEmptyCellSummmary: CreateEmptyCellSummmary,
    CreateSystemReports: CreateSystemReports,
    CreateEmptyGlue42Schedule: CreateEmptyGlue42Schedule,
    CreateEmptyGlue42Report: CreateEmptyGlue42Report,
};
exports.default = exports.ObjectFactory;
