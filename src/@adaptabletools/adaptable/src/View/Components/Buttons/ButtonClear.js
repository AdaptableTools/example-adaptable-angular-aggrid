"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonClear = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonClear, _super);
    function ButtonClear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonClear.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Clear", iconSize: 20, icon: "clear" }, this.props, { variant: "text" })));
    };
    return ButtonClear;
}(React.Component));
exports.ButtonClear = ButtonClear;
