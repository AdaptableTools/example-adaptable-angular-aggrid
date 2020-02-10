"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonShowChart = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonShowChart, _super);
    function ButtonShowChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonShowChart.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Show Chart", iconSize: 20, icon: "chart", variant: "text" }, this.props)));
    };
    return ButtonShowChart;
}(React.Component));
exports.ButtonShowChart = ButtonShowChart;
