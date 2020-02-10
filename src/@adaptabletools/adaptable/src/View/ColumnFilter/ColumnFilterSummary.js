"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
var SummaryRowItem_1 = require("../Components/StrategySummary/SummaryRowItem");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var ButtonClear_1 = require("../Components/Buttons/ButtonClear");
var UIHelper_1 = require("../UIHelper");
var ColumnFilterSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterSummaryComponent, _super);
    function ColumnFilterSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ColumnFilterSummaryComponent.prototype.render = function () {
        var _this = this;
        var columnFilter = this.props.ColumnFilters.find(function (c) { return c.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var description = this.getDescription(columnFilter);
        var summaryItems = [];
        summaryItems.push(React.createElement("b", null, React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.ColumnFilterStrategyId })));
        summaryItems.push(description);
        summaryItems.push(React.createElement(ButtonClear_1.ButtonClear, { marginLeft: 1, onClick: function () { return _this.props.onClearFilter(columnFilter); }, tooltip: "Clear Column Filter", disabled: columnFilter == null, AccessLevel: this.props.AccessLevel }));
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { SummaryItems: summaryItems });
    };
    ColumnFilterSummaryComponent.prototype.getDescription = function (columnFilter) {
        if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
            return 'Column is not filterable';
        }
        if (columnFilter == null) {
            return 'No Column Filter Active';
        }
        return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns);
    };
    return ColumnFilterSummaryComponent;
}(React.Component));
exports.ColumnFilterSummaryComponent = ColumnFilterSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter));
        },
        onClearPopupParams: function () { return dispatch(PopupRedux.PopupClearParam()); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnFilterStrategyId));
        },
    };
}
exports.ColumnFilterSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterSummaryComponent);
