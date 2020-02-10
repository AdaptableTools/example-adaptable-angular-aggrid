/**
 * Adaptable Toolbar collection
 *
 * When setting the `AvailableToolbars` or `VisibleToolbars` properties in Dashboard state, only the Toolbars listed here can be included.
 */
export declare type AdaptableDashboardToolbars = AdaptableDashboardToolbar[];
/**
 * List of all the Toolbars that Adaptable provides
 */
export declare type AdaptableDashboardToolbar = 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CellSummary' | 'Chart' | 'ColumnFilter' | 'Dashboard' | 'DataSource' | 'Export' | 'Glue42' | 'IPushPull' | 'Layout' | 'QuickSearch' | 'SmartEdit' | 'SystemStatus' | 'Theme';
export declare type AdaptableToolPanels = AdaptableToolPanel[];
export declare type AdaptableToolPanel = 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CellSummary' | 'Chart' | 'ColumnFilter' | 'Dashboard' | 'Export' | 'Layout' | 'QuickSearch' | 'SmartEdit' | 'SystemStatus' | 'Theme';
/**
 * Adaptable Function Button collection
 *
 * When setting the VisibleButtons` properties in Dashboard state, only the Function Buttons listed here can be included.
 */
export declare type AdaptableFunctionButtons = AdaptableFunctionButton[];
/**
 * List of all the Function button that Adaptable provides.
 *
 * Essentially it is a list of all the Functions in Adaptable as each Function has a popup for which this is a shortcut button.
 */
export declare type AdaptableFunctionButton = 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' | 'CellSummary' | 'CellValidation' | 'Chart' | 'ColumnCategory' | 'ColumnChooser' | 'ColumnFilter' | 'ColumnInfo' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' | 'Export' | 'FlashingCells' | 'FormatColumn' | 'FreeTextColumn' | 'Glue42' | 'GradientColumn' | 'Home' | 'Layout' | 'PercentBar' | 'PieChart' | 'PlusMinus' | 'QuickSearch' | 'Reminder' | 'Shortcut' | 'SmartEdit' | 'SparklineColumn' | 'Sparkline' | 'StateManagement' | 'SystemStatus' | 'TeamSharing' | 'Theme' | 'UpdatedRow' | 'UserFilter';
export declare type AdaptableStateKeys = AdaptableStateKey[];
export declare type AdaptableStateKey = 'ActionColumn' | 'AdvancedSearch' | 'Alert' | 'Application' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' | 'CellSummary' | 'CellValidation' | 'Chart' | 'ColumnCategory' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' | 'Entitlement' | 'Export' | 'FlashingCell' | 'FormatColumn' | 'FreeTextColumn' | 'Glue42' | 'GradientColumn' | 'IPushPull' | 'Layout' | 'NamedFilter' | 'PercentBar' | 'PlusMinus' | 'QuickSearch' | 'Reminder' | 'Shortcut' | 'SmartEdit' | 'SparklineColumn' | 'SystemFilter' | 'SystemStatus' | 'Theme' | 'ToolPanel' | 'UpdatedRow' | 'UserFilter' | 'UserInterface';
export declare type AdaptableFunctionName = 'ActionColumn' | 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' | 'CellSummary' | 'CellValidation' | 'Chart' | 'ColumnCategory' | 'ColumnChooser' | 'ColumnFilter' | 'ColumnInfo' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' | 'Export' | 'FlashingCells' | 'FormatColumn' | 'FreeTextColumn' | 'Glue42' | 'GradientColumn' | 'Home' | 'IPushPull' | 'Layout' | 'PercentBar' | 'PieChart' | 'PlusMinus' | 'QuickSearch' | 'Reminder' | 'Schedule' | 'Shortcut' | 'SmartEdit' | 'SparklineColumn' | 'Sparkline' | 'StateManagement' | 'SystemStatus' | 'TeamSharing' | 'Theme' | 'ToolPanel' | 'UpdatedRow' | 'UserFilter';
