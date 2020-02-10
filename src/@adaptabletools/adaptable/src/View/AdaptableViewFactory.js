"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomSortPopup_1 = require("./CustomSort/CustomSortPopup");
var SmartEditPopup_1 = require("./SmartEdit/SmartEditPopup");
var ShortcutPopup_1 = require("./Shortcut/ShortcutPopup");
var PlusMinusPopup_1 = require("./PlusMinus/PlusMinusPopup");
var ColumnChooserPopup_1 = require("./ColumnChooser/ColumnChooserPopup");
var ColumnInfoPopup_1 = require("./ColumnInfo/ColumnInfoPopup");
var ExportPopup_1 = require("./Export/ExportPopup");
var FlashingCellsPopup_1 = require("./FlashingCells/FlashingCellsPopup");
var UpdatedRowPopup_1 = require("./UpdatedRow/UpdatedRowPopup");
var CalendarsPopup_1 = require("./Calendars/CalendarsPopup");
var ConditionalStylePopup_1 = require("./ConditionalStyle/ConditionalStylePopup");
var QuickSearchPopup_1 = require("./QuickSearch/QuickSearchPopup");
var QuickSearchToolbarControl_1 = require("./QuickSearch/QuickSearchToolbarControl");
var ColumnFilterToolbarControl_1 = require("./ColumnFilter/ColumnFilterToolbarControl");
var ThemeToolbarControl_1 = require("./Theme/ThemeToolbarControl");
var AdvancedSearchPopup_1 = require("./AdvancedSearch/AdvancedSearchPopup");
var AdvancedSearchToolbarControl_1 = require("./AdvancedSearch/AdvancedSearchToolbarControl");
var BulkUpdateToolbarControl_1 = require("./BulkUpdate/BulkUpdateToolbarControl");
var SmartEditToolbarControl_1 = require("./SmartEdit/SmartEditToolbarControl");
var IPushPullPopup_1 = require("./IPushPull/IPushPullPopup");
var UserFilterPopup_1 = require("./UserFilter/UserFilterPopup");
var FormatColumnPopup_1 = require("./FormatColumn/FormatColumnPopup");
var ThemePopup_1 = require("./Theme/ThemePopup");
var ToolPanelPopup_1 = require("./Components/ToolPanel/ToolPanelPopup");
var CellValidationPopup_1 = require("./CellValidation/CellValidationPopup");
var GradientColumnPopup_1 = require("./GradientColumn/GradientColumnPopup");
var LayoutPopup_1 = require("./Layout/LayoutPopup");
var ColumnCategoryPopup_1 = require("./ColumnCategory/ColumnCategoryPopup");
var LayoutToolbarControl_1 = require("./Layout/LayoutToolbarControl");
var ExportToolbarControl_1 = require("./Export/ExportToolbarControl");
var TeamSharingPopup_1 = require("./TeamSharing/TeamSharingPopup");
var Glue42LoginPopup_1 = require("./Glue42/Glue42LoginPopup");
var IPushPullLoginPopup_1 = require("./IPushPull/IPushPullLoginPopup");
var IPushPullAddPagePopup_1 = require("./IPushPull/IPushPullAddPagePopup");
var HomeToolbarControl_1 = require("./Home/HomeToolbarControl");
var DashboardPopup_1 = require("./Dashboard/DashboardPopup");
var StateManagementPopup_1 = require("./StateManagement/StateManagementPopup");
var ColumnFilterPopup_1 = require("./ColumnFilter/ColumnFilterPopup");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var CalculatedColumnPopup_1 = require("./CalculatedColumn/CalculatedColumnPopup");
var BulkUpdatePopup_1 = require("./BulkUpdate/BulkUpdatePopup");
var DataSourcePopup_1 = require("./DataSource/DataSourcePopup");
var DataSourceToolbarControl_1 = require("./DataSource/DataSourceToolbarControl");
var AlertPopup_1 = require("./Alert/AlertPopup");
var AlertToolbarControl_1 = require("./Alert/AlertToolbarControl");
var SystemStatusToolbarControl_1 = require("./SystemStatus/SystemStatusToolbarControl");
var CustomToolbarControl_1 = require("./Dashboard/CustomToolbarControl");
var FreeTextColumnPopup_1 = require("./FreeTextColumn/FreeTextColumnPopup");
var Glue42Popup_1 = require("./Glue42/Glue42Popup");
var PercentBarPopup_1 = require("./PercentBar/PercentBarPopup");
var CellSummaryPopup_1 = require("./CellSummary/CellSummaryPopup");
var CellSummaryToolbarControl_1 = require("./CellSummary/CellSummaryToolbarControl");
var ReminderPopup_1 = require("./Reminder/ReminderPopup");
var SchedulePopup_1 = require("./Schedule/SchedulePopup");
var SystemStatusPopup_1 = require("./SystemStatus/SystemStatusPopup");
var AdvancedSearchToolPanel_1 = require("./AdvancedSearch/AdvancedSearchToolPanel");
var QuickSearchToolPanel_1 = require("./QuickSearch/QuickSearchToolPanel");
var DashboardToolPanel_1 = require("./Dashboard/DashboardToolPanel");
var LayoutToolPanel_1 = require("./Layout/LayoutToolPanel");
var ThemeToolPanel_1 = require("./Theme/ThemeToolPanel");
var ExportToolPanel_1 = require("./Export/ExportToolPanel");
var SystemStatusToolPanel_1 = require("./SystemStatus/SystemStatusToolPanel");
var AlertToolPanel_1 = require("./Alert/AlertToolPanel");
var ColumnFilterToolPanel_1 = require("./ColumnFilter/ColumnFilterToolPanel");
var CellSummaryToolPanel_1 = require("./CellSummary/CellSummaryToolPanel");
var SmartEditToolPanel_1 = require("./SmartEdit/SmartEditToolPanel");
var BulkUpdateToolPanel_1 = require("./BulkUpdate/BulkUpdateToolPanel");
var IPushPullToolbarControl_1 = require("./IPushPull/IPushPullToolbarControl");
var Glue42ToolbarControl_1 = require("./Glue42/Glue42ToolbarControl");
exports.AdaptableViewFactory = {
    AdvancedSearchPopup: AdvancedSearchPopup_1.AdvancedSearchPopup,
    AlertPopup: AlertPopup_1.AlertPopup,
    BulkUpdatePopup: BulkUpdatePopup_1.BulkUpdatePopup,
    CalculatedColumnPopup: CalculatedColumnPopup_1.CalculatedColumnPopup,
    CalendarsPopup: CalendarsPopup_1.CalendarsPopup,
    CellValidationPopup: CellValidationPopup_1.CellValidationPopup,
    ColumnChooserPopup: ColumnChooserPopup_1.ColumnChooserPopup,
    ColumnFilterPopup: ColumnFilterPopup_1.ColumnFilterPopup,
    ColumnInfoPopup: ColumnInfoPopup_1.ColumnInfoPopup,
    ConditionalStylePopup: ConditionalStylePopup_1.ConditionalStylePopup,
    CustomSortPopup: CustomSortPopup_1.CustomSortPopup,
    DashboardPopup: DashboardPopup_1.DashboardPopup,
    StateManagementPopup: StateManagementPopup_1.StateManagementPopup,
    DataSourcePopup: DataSourcePopup_1.DataSourcePopup,
    ExportPopup: ExportPopup_1.ExportPopup,
    FlashingCellsPopup: FlashingCellsPopup_1.FlashingCellsPopup,
    UpdatedRowPopup: UpdatedRowPopup_1.UpdatedRowPopup,
    FormatColumnPopup: FormatColumnPopup_1.FormatColumnPopup,
    FreeTextColumnPopup: FreeTextColumnPopup_1.FreeTextColumnPopup,
    Glue42Popup: Glue42Popup_1.Glue42Popup,
    Glue42LoginPopup: Glue42LoginPopup_1.Glue42LoginPopup,
    IPushPullPopup: IPushPullPopup_1.IPushPullPopup,
    IPushPullLoginPopup: IPushPullLoginPopup_1.IPushPullLoginPopup,
    IPushPullAddPagePopup: IPushPullAddPagePopup_1.IPushPullAddPagePopup,
    LayoutPopup: LayoutPopup_1.LayoutPopup,
    ColumnCategoryPopup: ColumnCategoryPopup_1.ColumnCategoryPopup,
    PercentBarPopup: PercentBarPopup_1.PercentBarPopup,
    GradientColumnPopup: GradientColumnPopup_1.GradientColumnPopup,
    PlusMinusPopup: PlusMinusPopup_1.PlusMinusPopup,
    QuickSearchPopup: QuickSearchPopup_1.QuickSearchPopup,
    ReminderPopup: ReminderPopup_1.ReminderPopup,
    SchedulePopup: SchedulePopup_1.SchedulePopup,
    CellSummaryPopup: CellSummaryPopup_1.CellSummaryPopup,
    SmartEditPopup: SmartEditPopup_1.SmartEditPopup,
    ShortcutPopup: ShortcutPopup_1.ShortcutPopup,
    ThemePopup: ThemePopup_1.ThemePopup,
    TeamSharingPopup: TeamSharingPopup_1.TeamSharingPopup,
    ToolPanelPopup: ToolPanelPopup_1.ToolPanelPopup,
    SystemStatusPopup: SystemStatusPopup_1.SystemStatusPopup,
    UserFilterPopup: UserFilterPopup_1.UserFilterPopup,
};
// here we put the dashboard control for each strategy
exports.AdaptableDashboardFactory = new Map([
    [StrategyConstants.AdvancedSearchStrategyId, AdvancedSearchToolbarControl_1.AdvancedSearchToolbarControl],
    [StrategyConstants.AlertStrategyId, AlertToolbarControl_1.AlertToolbarControl],
    [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolbarControl_1.BulkUpdateToolbarControl],
    [StrategyConstants.CellSummaryStrategyId, CellSummaryToolbarControl_1.CellSummaryToolbarControl],
    [StrategyConstants.ColumnFilterStrategyId, ColumnFilterToolbarControl_1.ColumnFilterToolbarControl],
    [StrategyConstants.DataSourceStrategyId, DataSourceToolbarControl_1.DataSourceToolbarControl],
    [StrategyConstants.ExportStrategyId, ExportToolbarControl_1.ExportToolbarControl],
    [StrategyConstants.LayoutStrategyId, LayoutToolbarControl_1.LayoutToolbarControl],
    [StrategyConstants.QuickSearchStrategyId, QuickSearchToolbarControl_1.QuickSearchToolbarControl],
    [StrategyConstants.SmartEditStrategyId, SmartEditToolbarControl_1.SmartEditToolbarControl],
    [StrategyConstants.SystemStatusStrategyId, SystemStatusToolbarControl_1.SystemStatusToolbarControl],
    [StrategyConstants.ThemeStrategyId, ThemeToolbarControl_1.ThemeToolbarControl],
    [StrategyConstants.IPushPullStrategyId, IPushPullToolbarControl_1.IPushPullToolbarControl],
    [StrategyConstants.Glue42StrategyId, Glue42ToolbarControl_1.Glue42ToolbarControl],
    // this is special
    [StrategyConstants.DashboardStrategyId, CustomToolbarControl_1.CustomToolbarControl],
]);
exports.AdaptableToolPanelFactory = new Map([
    [StrategyConstants.AdvancedSearchStrategyId, AdvancedSearchToolPanel_1.AdvancedSearchToolPanel],
    [StrategyConstants.AlertStrategyId, AlertToolPanel_1.AlertToolPanel],
    [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolPanel_1.BulkUpdateToolPanel],
    [StrategyConstants.CellSummaryStrategyId, CellSummaryToolPanel_1.CellSummaryToolPanel],
    [StrategyConstants.ColumnFilterStrategyId, ColumnFilterToolPanel_1.ColumnFilterToolPanel],
    [StrategyConstants.DashboardStrategyId, DashboardToolPanel_1.DashboardToolPanel],
    [StrategyConstants.ExportStrategyId, ExportToolPanel_1.ExportToolPanel],
    [StrategyConstants.LayoutStrategyId, LayoutToolPanel_1.LayoutToolPanel],
    [StrategyConstants.QuickSearchStrategyId, QuickSearchToolPanel_1.QuickSearchToolPanel],
    [StrategyConstants.SmartEditStrategyId, SmartEditToolPanel_1.SmartEditToolPanel],
    [StrategyConstants.SystemStatusStrategyId, SystemStatusToolPanel_1.SystemStatusToolPanel],
    [StrategyConstants.ThemeStrategyId, ThemeToolPanel_1.ThemeToolPanel],
]);
exports.AdaptableDashboardPermanentToolbarFactory = new Map([[StrategyConstants.HomeStrategyId, HomeToolbarControl_1.HomeToolbarControl]]);
