"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var rebass_1 = require("rebass");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var CustomSortSummary_1 = require("../CustomSort/CustomSortSummary");
var ConditionalStyleSummary_1 = require("../ConditionalStyle/ConditionalStyleSummary");
var CellValidationSummary_1 = require("../CellValidation/CellValidationSummary");
var UserFilterSummary_1 = require("../UserFilter/UserFilterSummary");
var ColumnFilterSummary_1 = require("../ColumnFilter/ColumnFilterSummary");
var PlusMinusSummary_1 = require("../PlusMinus/PlusMinusSummary");
var FormatColumnSummary_1 = require("../FormatColumn/FormatColumnSummary");
var FlashingCellSummary_1 = require("../FlashingCells/FlashingCellSummary");
var CalculatedColumnSummary_1 = require("../CalculatedColumn/CalculatedColumnSummary");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ColumnCategorySummary_1 = require("../ColumnCategory/ColumnCategorySummary");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var PercentBarSummary_1 = require("../PercentBar/PercentBarSummary");
var FreeTextColumnSummary_1 = require("../FreeTextColumn/FreeTextColumnSummary");
var AdaptableHelper_1 = require("../../Utilities/Helpers/AdaptableHelper");
var ColumnInfoPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnInfoPopupComponent, _super);
    function ColumnInfoPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { SelectedColumn: null, ShowSelector: true };
        return _this;
    }
    ColumnInfoPopupComponent.prototype.UNSAFE_componentWillMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.columnId) {
                var column = ColumnHelper_1.ColumnHelper.getColumnFromId(this.props.PopupParams.columnId, this.props.Columns);
                this.setState({ SelectedColumn: column, ShowSelector: false });
            }
        }
    };
    ColumnInfoPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Displays information about a column in the grid - which Adaptable Objects it has attached.',
        ];
        var colItems = [
            { Content: 'Function', Size: 3 },
            { Content: 'Summary', Size: 7 },
            { Content: '', Size: 2 },
        ];
        var selectedColumnId = this.state.SelectedColumn
            ? this.state.SelectedColumn.ColumnId
            : null;
        var headerText = StrategyConstants.ColumnInfoStrategyFriendlyName;
        var summaries = [];
        if (this.state.SelectedColumn) {
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategory)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.ColumnCategoryStrategyId, className: this.isStrategyReadOnly(StrategyConstants.ColumnCategoryStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(ColumnCategorySummary_1.ColumnCategorySummary, { key: StrategyConstants.ColumnChooserStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, Adaptable: this.props.Adaptable, AccessLevel: this.getAccessLevel(StrategyConstants.ColumnChooserStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.CustomSortStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.CustomSortStrategyId, className: this.isStrategyReadOnly(StrategyConstants.CustomSortStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(CustomSortSummary_1.CustomSortSummary, { key: StrategyConstants.CustomSortStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, Adaptable: this.props.Adaptable, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.CustomSortStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.ConditionalStyleStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.ConditionalStyleStrategyId, className: this.isStrategyReadOnly(StrategyConstants.ConditionalStyleStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(ConditionalStyleSummary_1.ConditionalStyleSummary, { key: StrategyConstants.ConditionalStyleStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, Adaptable: this.props.Adaptable, AccessLevel: this.getAccessLevel(StrategyConstants.ConditionalStyleStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.CellValidationStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.CellValidationStrategyId, className: this.isStrategyReadOnly(StrategyConstants.CellValidationStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(CellValidationSummary_1.CellValidationSummary, { key: StrategyConstants.CellValidationStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.CellValidationStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.UserFilterStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.UserFilterStrategyId, className: this.isStrategyReadOnly(StrategyConstants.UserFilterStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(UserFilterSummary_1.UserFilterSummary, { key: StrategyConstants.UserFilterStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.UserFilterStrategyId), Adaptable: this.props.Adaptable })));
            }
            if (this.isStrategyVisible(StrategyConstants.ColumnFilterStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.ColumnFilterStrategyId, className: this.isStrategyReadOnly(StrategyConstants.ColumnFilterStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(ColumnFilterSummary_1.ColumnFilterSummary, { key: StrategyConstants.ColumnFilterStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.ColumnFilterStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.FormatColumnStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.FormatColumnStrategyId, className: this.isStrategyReadOnly(StrategyConstants.FormatColumnStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(FormatColumnSummary_1.FormatColumnSummary, { key: StrategyConstants.FormatColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.FormatColumnStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.FreeTextColumnStrategyId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.FreeTextColumnStrategyId, className: this.isStrategyReadOnly(StrategyConstants.FreeTextColumnStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(FreeTextColumnSummary_1.FreeTextColumnSummary, { key: StrategyConstants.FormatColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.FormatColumnStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.PercentBarStrategyId) &&
                this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyConstants.PercentBarStrategyId, className: this.isStrategyReadOnly(StrategyConstants.PercentBarStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(PercentBarSummary_1.PercentBarSummary, { key: StrategyConstants.FormatColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.FormatColumnStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.PlusMinusStrategyId) &&
                this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyConstants.PlusMinusStrategyId, className: this.isStrategyReadOnly(StrategyConstants.PlusMinusStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(PlusMinusSummary_1.PlusMinusSummary, { key: StrategyConstants.PlusMinusStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.PlusMinusStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.FlashingCellsStrategyId) &&
                this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyConstants.FlashingCellsStrategyId, className: this.isStrategyReadOnly(StrategyConstants.FlashingCellsStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(FlashingCellSummary_1.FlashingCellSummary, { key: StrategyConstants.FlashingCellsStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, AccessLevel: this.getAccessLevel(StrategyConstants.FlashingCellsStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.CalculatedColumnStrategyId) &&
                ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.CalculatedColumns.map(function (cc) { return cc.ColumnId; }), this.state.SelectedColumn.ColumnId)) {
                summaries.push(React.createElement("div", { key: StrategyConstants.CalculatedColumnStrategyId, className: this.isStrategyReadOnly(StrategyConstants.CalculatedColumnStrategyId)
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '' },
                    React.createElement(CalculatedColumnSummary_1.CalculatedColumnSummary, { key: StrategyConstants.CalculatedColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, Adaptable: this.props.Adaptable, AccessLevel: this.getAccessLevel(StrategyConstants.CalculatedColumnStrategyId) })));
            }
            headerText = headerText + ': ' + this.state.SelectedColumn.FriendlyName;
        }
        return (React.createElement(PanelWithImage_1.PanelWithImage, { header: headerText, variant: "primary", glyphicon: StrategyConstants.ColumnInfoGlyph, infoBody: infoBody, bodyProps: { padding: 2 } },
            this.state.ShowSelector && (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginBottom: 2 },
                React.createElement(rebass_1.Box, null, "Column: "),
                React.createElement(rebass_1.Box, { flex: 1, marginLeft: 2 },
                    React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [selectedColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })))),
            React.createElement(rebass_1.Flex, { flex: 1, style: { overflow: 'auto', width: '100%' } }, this.state.SelectedColumn && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { style: { width: '100%' }, colItems: colItems, items: summaries, reducedPanel: this.state.ShowSelector })))));
    };
    ColumnInfoPopupComponent.prototype.onColumnSelectedChanged = function (columns) {
        this.setState({ SelectedColumn: columns.length > 0 ? columns[0] : null });
    };
    ColumnInfoPopupComponent.prototype.isStrategyVisible = function (functionName) {
        return this.getAccessLevel(functionName) == Enums_1.AccessLevel.Full;
    };
    ColumnInfoPopupComponent.prototype.isStrategyReadOnly = function (functionName) {
        return this.getAccessLevel(functionName) == Enums_1.AccessLevel.ReadOnly;
    };
    ColumnInfoPopupComponent.prototype.getAccessLevel = function (functionName) {
        return AdaptableHelper_1.default.getEntitlementAccessLevelForStrategy(this.props.FunctionEntitlements, functionName);
    };
    return ColumnInfoPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        ColumnCategory: state.ColumnCategory.ColumnCategories,
        FunctionEntitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ColumnInfoPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnInfoPopupComponent);
