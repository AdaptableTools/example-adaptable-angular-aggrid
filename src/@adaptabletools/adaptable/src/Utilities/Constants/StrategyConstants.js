"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Strategy Ids used in Config so have made it a type of AdaptableFunctionName
exports.AdvancedSearchStrategyId = 'AdvancedSearch';
exports.AlertStrategyId = 'Alert';
exports.BulkUpdateStrategyId = 'BulkUpdate';
exports.CalculatedColumnStrategyId = 'CalculatedColumn';
exports.CalendarStrategyId = 'Calendar';
exports.CellSummaryStrategyId = 'CellSummary';
exports.CellValidationStrategyId = 'CellValidation';
exports.ChartStrategyId = 'Chart';
exports.ColumnCategoryStrategyId = 'ColumnCategory';
exports.ColumnChooserStrategyId = 'ColumnChooser';
exports.ColumnFilterStrategyId = 'ColumnFilter';
exports.ColumnInfoStrategyId = 'ColumnInfo';
exports.ConditionalStyleStrategyId = 'ConditionalStyle';
exports.CustomSortStrategyId = 'CustomSort';
exports.DashboardStrategyId = 'Dashboard';
exports.DataSourceStrategyId = 'DataSource';
exports.ExportStrategyId = 'Export';
exports.FlashingCellsStrategyId = 'FlashingCells';
exports.FormatColumnStrategyId = 'FormatColumn';
exports.FreeTextColumnStrategyId = 'FreeTextColumn';
exports.Glue42StrategyId = 'Glue42';
exports.HomeStrategyId = 'Home';
exports.IPushPullStrategyId = 'IPushPull';
exports.LayoutStrategyId = 'Layout';
exports.PercentBarStrategyId = 'PercentBar';
exports.GradientColumnStrategyId = 'GradientColumn';
exports.SparklineColumnStrategyId = 'SparklineColumn';
exports.SparklineStrategyId = 'Sparkline';
exports.PieChartStrategyId = 'PieChart';
exports.PlusMinusStrategyId = 'PlusMinus';
exports.QuickSearchStrategyId = 'QuickSearch';
exports.ReminderStrategyId = 'Reminder';
exports.ScheduleStrategyId = 'Schedule';
exports.ShortcutStrategyId = 'Shortcut';
exports.SmartEditStrategyId = 'SmartEdit';
exports.StateManagementStrategyId = 'StateManagement';
exports.SystemStatusStrategyId = 'SystemStatus';
exports.TeamSharingStrategyId = 'TeamSharing';
exports.ThemeStrategyId = 'Theme';
exports.ToolPanelStrategyId = 'ToolPanel';
exports.UpdatedRowStrategyId = 'UpdatedRow';
exports.UserFilterStrategyId = 'UserFilter';
// Strategy Names - only used internally
exports.AdvancedSearchStrategyFriendlyName = 'Advanced Search';
exports.AlertStrategyFriendlyName = 'Alert';
exports.BulkUpdateStrategyFriendlyName = 'Bulk Update';
exports.CalculatedColumnStrategyFriendlyName = 'Calculated Column';
exports.CalendarStrategyFriendlyName = 'Calendar';
exports.CellSummaryStrategyFriendlyName = 'Cell Summary';
exports.CellValidationStrategyFriendlyName = 'Cell Validation';
exports.ChartStrategyFriendlyName = 'Chart';
exports.ColumnCategoryStrategyFriendlyName = 'Column Category';
exports.ColumnChooserStrategyFriendlyName = 'Column Chooser';
exports.ColumnFilterStrategyFriendlyName = 'Column Filter';
exports.ColumnInfoStrategyFriendlyName = 'Column Information';
exports.ConditionalStyleStrategyFriendlyName = 'Conditional Style';
exports.CustomSortStrategyFriendlyName = 'Custom Sort';
exports.DashboardStrategyFriendlyName = 'Dashboard';
exports.DataSourceStrategyFriendlyName = 'Data Source';
exports.ExportStrategyFriendlyName = 'Export';
exports.FlashingCellsStrategyFriendlyName = 'Flashing Cells';
exports.UpdatedRowStrategyFriendlyName = 'Updated Row';
exports.FormatColumnStrategyFriendlyName = 'Format Column';
exports.FreeTextColumnStrategyFriendlyName = 'Free Text Column';
exports.Glue42StrategyFriendlyName = 'Glue42';
exports.IPushPullStrategyFriendlyName = 'ipushpull';
exports.LayoutStrategyFriendlyName = 'Layout';
exports.PercentBarStrategyFriendlyName = 'Percent Bar';
exports.GradientColumnStrategyFriendlyName = 'Gradient Column';
exports.SparklineColumnStrategyFriendlyName = 'Sparkline Column';
exports.SparklineStrategyFriendlyName = 'Sparkline';
exports.PieChartStrategyFriendlyName = 'Pie Chart';
exports.PlusMinusStrategyFriendlyName = 'Plus Minus';
exports.QuickSearchStrategyFriendlyName = 'Quick Search';
exports.ReminderStrategyFriendlyName = 'Reminder';
exports.ScheduleStrategyFriendlyName = 'Schedule';
exports.ShortcutStrategyFriendlyName = 'Shortcut';
exports.SmartEditStrategyFriendlyName = 'Smart Edit';
exports.StateManagementStrategyFriendlyName = 'Manage State';
exports.SystemStatusStrategyFriendlyName = 'System Status';
exports.TeamSharingStrategyFriendlyName = 'Team Sharing';
exports.ThemeStrategyFriendlyName = 'Theme';
exports.ToolPanelStrategyFriendlyName = 'Tool Panel';
exports.UserFilterStrategyFriendlyName = 'User Filter';
// Strategy Glyphs
exports.AdvancedSearchGlyph = 'advanced-search';
exports.AlertGlyph = 'alert';
exports.BulkUpdateGlyph = 'bulk-update';
exports.CalculatedColumnGlyph = 'calculated-column';
exports.CalendarGlyph = 'calendar';
exports.CellSummaryGlyph = 'cell-summary';
exports.CellValidationGlyph = 'cell-validation';
exports.ChartGlyph = 'chart';
exports.ColumnCategoryGlyph = 'column-category';
exports.ColumnChooserGlyph = 'column-chooser';
exports.ColumnFilterGlyph = 'column-filter';
exports.ColumnInfoGlyph = 'column-info';
exports.ConditionalStyleGlyph = 'conditional-style';
exports.CustomSortGlyph = 'custom-sort';
exports.DashboardGlyph = 'dashboard';
exports.DataSourceGlyph = 'data-source';
exports.ExportGlyph = 'export';
exports.FlashingCellGlyph = 'flashing-cell';
exports.FormatColumnGlyph = 'format-column';
exports.FreeTextColumnGlyph = 'freetext-column';
exports.Glue42Glyph = 'ipushpull';
exports.IPushPullGlyph = 'ipushpull';
exports.FunctionsGlyph = 'home';
exports.LayoutGlyph = 'layout';
exports.PercentBarGlyph = 'percent-bar';
exports.GradientColumnGlyph = 'gradient-column';
exports.SparklineColumnGlyph = 'spark-line';
exports.SparklinesGlyph = 'spark-line';
exports.PieChartGlyph = 'pie-chart';
exports.PlusMinusGlyph = 'plus-minus';
exports.QuickSearchGlyph = 'quick-search';
exports.ReminderGlyph = 'reminder';
exports.ScheduleGlyph = 'schedule';
exports.ShortcutGlyph = 'shortcut';
exports.SmartEditGlyph = 'smart-edit';
exports.StateManagementGlyph = 'state-management';
exports.SystemStatusGlyph = 'system-status';
exports.TeamSharingGlyph = 'team-share';
exports.ThemeGlyph = 'theme';
exports.ToolPanelGlyph = 'theme';
exports.UpdatedRowGlyph = 'updated-row';
exports.UserFilterGlyph = 'user-filter';
function getIdForStrategyFriendlyName(functionName) {
    switch (functionName) {
        case exports.AdvancedSearchStrategyFriendlyName:
            return exports.AdvancedSearchStrategyId;
        case exports.AlertStrategyFriendlyName:
            return exports.AlertStrategyId;
        case exports.BulkUpdateStrategyFriendlyName:
            return exports.BulkUpdateStrategyId;
        case exports.CalculatedColumnStrategyFriendlyName:
            return exports.CalculatedColumnStrategyId;
        case exports.CalendarStrategyFriendlyName:
            return exports.CalendarStrategyId;
        case exports.CellValidationStrategyFriendlyName:
            return exports.CellValidationStrategyId;
        case exports.ChartStrategyFriendlyName:
            return exports.ChartStrategyId;
        case exports.ColumnCategoryStrategyFriendlyName:
            return exports.ColumnCategoryStrategyId;
        case exports.ColumnChooserStrategyFriendlyName:
            return exports.ColumnChooserStrategyId;
        case exports.ColumnFilterStrategyFriendlyName:
            return exports.ColumnFilterStrategyId;
        case exports.ColumnInfoStrategyFriendlyName:
            return exports.ColumnInfoStrategyId;
        case exports.ConditionalStyleStrategyFriendlyName:
            return exports.ConditionalStyleStrategyId;
        case exports.CustomSortStrategyFriendlyName:
            return exports.CustomSortStrategyId;
        case exports.DashboardStrategyFriendlyName:
            return exports.DashboardStrategyId;
        case exports.DataSourceStrategyFriendlyName:
            return exports.DataSourceStrategyId;
        case exports.ExportStrategyFriendlyName:
            return exports.ExportStrategyId;
        case exports.FlashingCellsStrategyFriendlyName:
            return exports.FlashingCellsStrategyId;
        case exports.FormatColumnStrategyFriendlyName:
            return exports.FormatColumnStrategyId;
        case exports.FreeTextColumnStrategyFriendlyName:
            return exports.FreeTextColumnStrategyId;
        case exports.Glue42StrategyFriendlyName:
            return exports.Glue42StrategyId;
        case exports.IPushPullStrategyFriendlyName:
            return exports.IPushPullStrategyId;
        case exports.LayoutStrategyFriendlyName:
            return exports.LayoutStrategyId;
        case exports.PercentBarStrategyFriendlyName:
            return exports.PercentBarStrategyId;
        case exports.GradientColumnStrategyFriendlyName:
            return exports.GradientColumnStrategyId;
        case exports.SparklineColumnStrategyFriendlyName:
            return exports.SparklineColumnStrategyId;
        case exports.SparklineStrategyFriendlyName:
            return exports.SparklineStrategyId;
        case exports.PieChartStrategyFriendlyName:
            return exports.PieChartStrategyId;
        case exports.PlusMinusStrategyFriendlyName:
            return exports.PlusMinusStrategyId;
        case exports.QuickSearchStrategyFriendlyName:
            return exports.QuickSearchStrategyId;
        case exports.ReminderStrategyFriendlyName:
            return exports.ReminderStrategyId;
        case exports.ScheduleStrategyFriendlyName:
            return exports.ScheduleStrategyId;
        case exports.CellSummaryStrategyFriendlyName:
            return exports.CellSummaryStrategyId;
        case exports.ShortcutStrategyFriendlyName:
            return exports.ShortcutStrategyId;
        case exports.SmartEditStrategyFriendlyName:
            return exports.SmartEditStrategyId;
        case exports.StateManagementStrategyFriendlyName:
            return exports.StateManagementStrategyId;
        case exports.SystemStatusStrategyFriendlyName:
            return exports.SystemStatusStrategyId;
        case exports.TeamSharingStrategyFriendlyName:
            return exports.TeamSharingStrategyId;
        case exports.ThemeStrategyFriendlyName:
            return exports.ThemeStrategyId;
        case exports.ToolPanelStrategyFriendlyName:
            return exports.ToolPanelStrategyId;
        case exports.UserFilterStrategyFriendlyName:
            return exports.UserFilterStrategyId;
    }
}
exports.getIdForStrategyFriendlyName = getIdForStrategyFriendlyName;
function getFriendlyNameForStrategyId(functionName) {
    switch (functionName) {
        case exports.AdvancedSearchStrategyId:
            return exports.AdvancedSearchStrategyFriendlyName;
        case exports.AlertStrategyId:
            return exports.AlertStrategyFriendlyName;
        case exports.BulkUpdateStrategyId:
            return exports.BulkUpdateStrategyFriendlyName;
        case exports.CalculatedColumnStrategyId:
            return exports.CalculatedColumnStrategyFriendlyName;
        case exports.CalendarStrategyId:
            return exports.CalendarStrategyFriendlyName;
        case exports.CellValidationStrategyId:
            return exports.CellValidationStrategyFriendlyName;
        case exports.ChartStrategyId:
            return exports.ChartStrategyFriendlyName;
        case exports.ColumnCategoryStrategyId:
            return exports.ColumnCategoryStrategyFriendlyName;
        case exports.ColumnChooserStrategyId:
            return exports.ColumnChooserStrategyFriendlyName;
        case exports.ColumnFilterStrategyId:
            return exports.ColumnFilterStrategyFriendlyName;
        case exports.ColumnInfoStrategyId:
            return exports.ColumnInfoStrategyFriendlyName;
        case exports.ConditionalStyleStrategyId:
            return exports.ConditionalStyleStrategyFriendlyName;
        case exports.CustomSortStrategyId:
            return exports.CustomSortStrategyFriendlyName;
        case exports.DashboardStrategyId:
            return exports.DashboardStrategyFriendlyName;
        case exports.DataSourceStrategyId:
            return exports.DataSourceStrategyFriendlyName;
        case exports.ExportStrategyId:
            return exports.ExportStrategyFriendlyName;
        case exports.FlashingCellsStrategyId:
            return exports.FlashingCellsStrategyFriendlyName;
        case exports.FormatColumnStrategyId:
            return exports.FormatColumnStrategyFriendlyName;
        case exports.FreeTextColumnStrategyId:
            return exports.FreeTextColumnStrategyFriendlyName;
        case exports.Glue42StrategyId:
            return exports.Glue42StrategyFriendlyName;
        case exports.IPushPullStrategyId:
            return exports.IPushPullStrategyFriendlyName;
        case exports.LayoutStrategyId:
            return exports.LayoutStrategyFriendlyName;
        case exports.PercentBarStrategyId:
            return exports.PercentBarStrategyFriendlyName;
        case exports.GradientColumnStrategyId:
            return exports.GradientColumnStrategyFriendlyName;
        case exports.SparklineStrategyId:
            return exports.SparklineStrategyFriendlyName;
        case exports.SparklineColumnStrategyId:
            return exports.SparklineColumnStrategyFriendlyName;
        case exports.PieChartStrategyId:
            return exports.PieChartStrategyFriendlyName;
        case exports.PlusMinusStrategyId:
            return exports.PlusMinusStrategyFriendlyName;
        case exports.QuickSearchStrategyId:
            return exports.QuickSearchStrategyFriendlyName;
        case exports.QuickSearchStrategyId:
            return exports.ReminderStrategyFriendlyName;
        case exports.ReminderStrategyId:
            return exports.ReminderStrategyFriendlyName;
        case exports.ScheduleStrategyId:
            return exports.ScheduleStrategyFriendlyName;
        case exports.CellSummaryStrategyId:
            return exports.CellSummaryStrategyFriendlyName;
        case exports.ShortcutStrategyId:
            return exports.ShortcutStrategyFriendlyName;
        case exports.SmartEditStrategyId:
            return exports.SmartEditStrategyFriendlyName;
        case exports.StateManagementStrategyId:
            return exports.StateManagementStrategyFriendlyName;
        case exports.SystemStatusStrategyId:
            return exports.SystemStatusStrategyFriendlyName;
        case exports.TeamSharingStrategyId:
            return exports.TeamSharingStrategyFriendlyName;
        case exports.ThemeStrategyId:
            return exports.ThemeStrategyFriendlyName;
        case exports.ToolPanelStrategyId:
            return exports.ToolPanelStrategyFriendlyName;
        case exports.UserFilterStrategyId:
            return exports.UserFilterStrategyFriendlyName;
    }
}
exports.getFriendlyNameForStrategyId = getFriendlyNameForStrategyId;
function getGhyphiconForStrategyId(functionName) {
    switch (functionName) {
        case exports.AdvancedSearchStrategyId:
            return exports.AdvancedSearchGlyph;
        case exports.AlertStrategyId:
            return exports.AlertGlyph;
        case exports.BulkUpdateStrategyId:
            return exports.BulkUpdateGlyph;
        case exports.CalculatedColumnStrategyId:
            return exports.CalculatedColumnGlyph;
        case exports.CalendarStrategyId:
            return exports.CalendarGlyph;
        case exports.CellValidationStrategyId:
            return exports.CellValidationGlyph;
        case exports.ChartStrategyId:
            return exports.ChartGlyph;
        case exports.ColumnCategoryStrategyId:
            return exports.ColumnCategoryGlyph;
        case exports.ColumnChooserStrategyId:
            return exports.ColumnChooserGlyph;
        case exports.ColumnFilterStrategyId:
            return exports.ColumnFilterGlyph;
        case exports.ColumnInfoStrategyId:
            return exports.ColumnInfoGlyph;
        case exports.ConditionalStyleStrategyId:
            return exports.ConditionalStyleGlyph;
        case exports.CustomSortStrategyId:
            return exports.CustomSortGlyph;
        case exports.ExportStrategyId:
            return exports.ExportGlyph;
        case exports.FlashingCellsStrategyId:
            return exports.FlashingCellGlyph;
        case exports.FormatColumnStrategyId:
            return exports.FormatColumnGlyph;
        case exports.FreeTextColumnStrategyId:
            return exports.FreeTextColumnGlyph;
        case exports.Glue42StrategyId:
            return exports.Glue42Glyph;
        case exports.IPushPullStrategyId:
            return exports.IPushPullGlyph;
        case exports.LayoutStrategyId:
            return exports.LayoutGlyph;
        case exports.PercentBarStrategyId:
            return exports.PercentBarGlyph;
        case exports.GradientColumnStrategyId:
            return exports.GradientColumnGlyph;
        case exports.SparklineStrategyId:
            return exports.SparklinesGlyph;
        case exports.SparklineColumnStrategyId:
            return exports.SparklineColumnGlyph;
        case exports.PieChartStrategyId:
            return exports.PieChartGlyph;
        case exports.PlusMinusStrategyId:
            return exports.PlusMinusGlyph;
        case exports.QuickSearchStrategyId:
            return exports.QuickSearchGlyph;
        case exports.ReminderStrategyId:
            return exports.ReminderGlyph;
        case exports.ScheduleStrategyId:
            return exports.ScheduleGlyph;
        case exports.ShortcutStrategyId:
            return exports.ShortcutGlyph;
        case exports.CellSummaryStrategyId:
            return exports.CellSummaryGlyph;
        case exports.SmartEditStrategyId:
            return exports.SmartEditGlyph;
        case exports.StateManagementStrategyFriendlyName:
            return exports.StateManagementGlyph;
        case exports.SystemStatusStrategyFriendlyName:
            return exports.SystemStatusGlyph;
        case exports.TeamSharingStrategyId:
            return exports.TeamSharingGlyph;
        case exports.ThemeStrategyId:
            return exports.ThemeGlyph;
        case exports.ToolPanelStrategyId:
            return exports.ToolPanelGlyph;
        case exports.UserFilterStrategyId:
            return exports.UserFilterGlyph;
    }
}
exports.getGhyphiconForStrategyId = getGhyphiconForStrategyId;
