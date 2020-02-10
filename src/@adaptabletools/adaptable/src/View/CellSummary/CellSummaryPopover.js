"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var CellSummaryDetails_1 = require("./CellSummaryDetails");
var CellSummaryPopover = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryPopover, _super);
    function CellSummaryPopover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellSummaryPopover.prototype.render = function () {
        return React.createElement(CellSummaryDetails_1.CellSummaryDetails, { CellSummary: this.props.CellSummary });
    };
    return CellSummaryPopover;
}(React.Component));
exports.CellSummaryPopover = CellSummaryPopover;
