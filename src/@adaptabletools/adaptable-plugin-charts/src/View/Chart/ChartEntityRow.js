"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var EntityListActionButtons_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("@adaptabletools/adaptable/src/View/Components/AdaptableObjectRow");
var ButtonShowChart_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonShowChart");
var EntityRowItem_1 = require("@adaptabletools/adaptable/src/View/Components/EntityRowItem");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var ChartEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ChartEntityRow, _super);
    function ChartEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartEntityRow.prototype.render = function () {
        var _this = this;
        // assuming only category charts for now - silly assumption to make in due course...
        var Chart = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: Chart.Name });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: Chart.Description });
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.getChartType(Chart.ChartType) });
        colItems[3].Content = (React.createElement(ButtonShowChart_1.ButtonShowChart, { onClick: function () { return _this.props.onShowChart(Chart.Name); }, tooltip: "Show Chart", variant: "raised", AccessLevel: this.props.AccessLevel }));
        colItems[4].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: function () { return _this.props.onEdit(Chart); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, overrideDisableEdit: undefined, EntityType: StrategyConstants.ChartStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    ChartEntityRow.prototype.getChartType = function (chartType) {
        switch (chartType) {
            case ChartEnums_1.ChartType.CategoryChart:
                return 'Category Chart';
            case ChartEnums_1.ChartType.PieChart:
                return 'Pie Chart';
            case ChartEnums_1.ChartType.SparklinesChart:
                return 'Sparkline';
        }
    };
    return ChartEntityRow;
}(React.Component));
exports.ChartEntityRow = ChartEntityRow;
