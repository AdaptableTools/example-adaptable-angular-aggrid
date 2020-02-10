"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonInfo = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonInfo, _super);
    function ButtonInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonInfo.prototype.render = function () {
        return React.createElement(SimpleButton_1.default, tslib_1.__assign({ iconSize: 20, icon: "info", variant: "text" }, this.props));
    };
    return ButtonInfo;
}(React.Component));
exports.ButtonInfo = ButtonInfo;
