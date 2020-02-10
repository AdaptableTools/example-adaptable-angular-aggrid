export declare enum DataType {
    String = "String",
    Number = "Number",
    NumberArray = "NumberArray",
    Boolean = "Boolean",
    Date = "Date",
    Object = "Object",
    All = "All",
    Unknown = "Unknown"
}
export declare enum ExpressionMode {
    SingleColumn = "SingleColumn",
    MultiColumn = "MultiColumn"
}
export declare enum AccessLevel {
    ReadOnly = "ReadOnly",
    Hidden = "Hidden",
    Full = "Full"
}
export declare enum LeafExpressionOperator {
    None = "None",
    GreaterThan = "GreaterThan",
    LessThan = "LessThan",
    Equals = "Equals",
    NotEquals = "NotEquals",
    GreaterThanOrEqual = "GreaterThanOrEqual",
    LessThanOrEqual = "LessThanOrEqual",
    Between = "Between",
    Contains = "Contains",
    NotContains = "NotContains",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    Regex = "Regex",
    AnyChange = "AnyChange",
    ValueChange = "ValueChange",
    PercentChange = "PercentChange",
    NotBetween = "NotBetween",
    IsPositive = "IsPositive",
    IsNegative = "IsNegative",
    IsNotNumber = "IsNotNumber",
    IsTrue = "IsTrue",
    IsFalse = "IsFalse",
    NoDuplicateValues = "NoDuplicateValues",
    ExistingValuesOnly = "ExistingValuesOnly",
    PrimaryKeyDuplicate = "PrimaryKeyDuplicate"
}
export declare enum MathOperation {
    Add = "Add",
    Subtract = "Subtract",
    Multiply = "Multiply",
    Divide = "Divide",
    Replace = "Replace"
}
export declare enum ActionMode {
    WarnUser = "Warn User",
    StopEdit = "Stop Edit"
}
export declare enum LayoutSource {
    Existing = "Existing",
    New = "New"
}
export declare enum ReportColumnScope {
    AllColumns = "AllColumns",
    VisibleColumns = "VisibleColumns",
    SelectedCellColumns = "SelectedCellColumns",
    BespokeColumns = "BespokeColumns"
}
export declare enum ReportRowScope {
    AllRows = "AllRows",
    VisibleRows = "VisibleRows",
    SelectedCellRows = "SelectedCellRows",
    SelectedRows = "SelectedRows",
    ExpressionRows = "ExpressionRows"
}
export declare enum ExportDestination {
    CSV = "CSV",
    Clipboard = "Clipboard",
    JSON = "JSON",
    OpenfinExcel = "OpenfinExcel",
    Glue42 = "Glue42"
}
export declare enum ScheduleType {
    Report = "Report",
    iPushPull = "iPushPull",
    Glue42 = "Glue42",
    Reminder = "Reminder"
}
export declare enum SortOrder {
    Ascending = "Ascending",
    Descending = "Descending"
}
export declare enum DisplayAction {
    HighlightCell = "HighlightCell",
    ShowRow = "ShowRow",
    ShowRowAndHighlightCell = "ShowRowAndHighlightCell"
}
export declare enum RangeOperandType {
    Column = "Column",
    Value = "Value"
}
export declare enum SelectionMode {
    Multi = "Multi",
    Single = "Single"
}
export declare enum DistinctCriteriaPairValue {
    RawValue = "RawValue",
    DisplayValue = "DisplayValue"
}
export declare enum FontWeight {
    Normal = "Normal",
    Bold = "Bold"
}
export declare enum FontStyle {
    Normal = "Normal",
    Italic = "Italic"
}
export declare enum FontSize {
    XSmall = "XSmall",
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    XLarge = "XLarge"
}
export declare enum PanelWidth {
    Wide = "800px",
    Medium = "600px",
    Narrow = "400px"
}
export declare enum QueryBuildStatus {
    SelectFirstColumn = 0,
    SelectFurtherColumn = 1,
    ColumnSelected = 2,
    SingleConditionsAdded = 3,
    MultipleConditionsAdded = 4
}
export declare enum SearchChangedTrigger {
    DataSource = "DataSource",
    AdvancedSearch = "AdvancedSearch",
    QuickSearch = "QuickSearch",
    ColumnFilter = "ColumnFilter",
    UserFilter = "UserFilter",
    DataChange = "DataChange",
    Sort = "Sort"
}
export declare enum Visibility {
    Minimised = "Minimised",
    Visible = "Visible",
    Hidden = "Hidden"
}
export declare enum QueryTab {
    ColumnValue = "ColumnValue",
    Filter = "Filter",
    QueryRange = "QueryRange"
}
export declare enum ColumnMenuTab {
    Menu = "Menu",
    Filter = "Filter"
}
export declare enum StatusColour {
    Red = "var(--ab-color-error)",
    Amber = "var(--ab-color-warn)",
    Green = "var(--ab-color-success)",
    Blue = "var(--ab-color-info)"
}
export declare enum MessageType {
    Info = "Info",
    Success = "Success",
    Warning = "Warning",
    Error = "Error"
}
export declare enum CellSummaryOperation {
    Sum = "Sum",
    Average = "Average",
    Median = "Median",
    Mode = "Mode",
    Distinct = "Distinct",
    Max = "Max",
    Min = "Min",
    Count = "Count"
}
export declare enum PinnedColumnDirection {
    Left = "Leftt",
    Right = "Right"
}
export declare enum FilterOnDataChangeOptions {
    Always = "Always",
    Never = "Never",
    Throttle = "Throttle"
}
export declare enum DashboardSize {
    Small = "small",
    XSmall = "xsmall"
}
export declare enum ButtonVariant {
    Text = "text",
    Outlined = "outlined",
    Raised = "raised",
    Unelevated = "unelevated"
}
export declare enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
