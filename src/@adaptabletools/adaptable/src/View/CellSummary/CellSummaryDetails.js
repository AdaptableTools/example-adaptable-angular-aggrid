"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EmptyContent_1 = require("../../components/EmptyContent");
var CellSummaryDetails = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryDetails, _super);
    function CellSummaryDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellSummaryDetails.prototype.render = function () {
        var _this = this;
        var colItems = [
            { Content: 'Operation', Size: 5 },
            { Content: 'Value', Size: 7 },
        ];
        var rowElements = [];
        if (this.props.CellSummary != null) {
            Object.keys(this.props.CellSummary).forEach(function (operationName) {
                rowElements.push(_this.createRow(colItems, operationName, _this.props.CellSummary[operationName]));
            });
        }
        return (React.createElement("div", null,
            React.createElement(PanelWithRow_1.PanelWithRow, { colItems: colItems }),
            this.props.CellSummary != null ? (React.createElement("div", null, rowElements)) : (React.createElement(EmptyContent_1.default, null,
                React.createElement("p", null, "No cells are selected - please select some cells.")))));
    };
    CellSummaryDetails.prototype.createRow = function (colItems, key, value) {
        var rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = key;
        rowColItems[1].Content = value;
        var rowElement = (React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { style: { minWidth: 185 }, key: key, colItems: rowColItems }));
        return rowElement;
    };
    return CellSummaryDetails;
}(React.Component));
exports.CellSummaryDetails = CellSummaryDetails;
