"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var ButtonSave_1 = require("../Components/Buttons/ButtonSave");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ButtonClear_1 = require("../Components/Buttons/ButtonClear");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
var rebass_1 = require("rebass");
var stopPropagation = function (e) {
    e.stopPropagation();
};
var ActiveFiltersPanel = /** @class */ (function (_super) {
    tslib_1.__extends(ActiveFiltersPanel, _super);
    function ActiveFiltersPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActiveFiltersPanel.prototype.render = function () {
        var _this = this;
        var colItems = [
            { Content: 'Column', Size: 4 },
            { Content: 'Filter', Size: 5 },
            { Content: '', Size: 3 },
        ];
        var rowElements = [];
        this.props.ColumnFilters.forEach(function (columnFilter, index) {
            rowElements.push(_this.createRow(colItems, columnFilter));
        });
        return (React.createElement("div", null,
            React.createElement(PanelWithRow_1.PanelWithRow, { colItems: colItems }),
            React.createElement("div", null, rowElements)));
    };
    ActiveFiltersPanel.prototype.createRow = function (colItems, columnFilter) {
        var _this = this;
        var rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(columnFilter.ColumnId, this.props.Columns);
        rowColItems[1].Content = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, false);
        rowColItems[2].Content = (React.createElement(rebass_1.Flex, { justifyContent: "center", margin: 0, padding: 0, onClick: stopPropagation },
            React.createElement(ButtonSave_1.ButtonSave, { onClick: function () { return _this.props.onSaveColumnFilterasUserFilter(columnFilter); }, tooltip: "Save as User Filter", disabled: columnFilter == null ||
                    ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilter.Filter.FilterExpressions), AccessLevel: this.props.AccessLevel }),
            ' ',
            React.createElement(ButtonClear_1.ButtonClear, { onClick: function () { return _this.props.onClear(columnFilter); }, tooltip: "Clear Column Filter", disabled: columnFilter == null, AccessLevel: this.props.AccessLevel })));
        var rowElement = React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: columnFilter.ColumnId, colItems: rowColItems });
        return rowElement;
    };
    return ActiveFiltersPanel;
}(React.Component));
exports.ActiveFiltersPanel = ActiveFiltersPanel;
