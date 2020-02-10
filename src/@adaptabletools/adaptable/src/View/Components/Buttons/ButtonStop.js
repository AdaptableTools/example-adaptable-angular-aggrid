"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonStop = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonStop, _super);
    function ButtonStop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonStop.prototype.render = function () {
        return React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Stop", iconSize: 20, icon: "stop", variant: "text" }, this.props));
    };
    return ButtonStop;
}(React.Component));
exports.ButtonStop = ButtonStop;
