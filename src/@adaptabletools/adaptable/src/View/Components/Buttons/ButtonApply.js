"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonApply = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonApply, _super);
    function ButtonApply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonApply.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Apply", iconSize: 20, icon: "check", variant: "text" }, this.props)));
    };
    return ButtonApply;
}(React.Component));
exports.ButtonApply = ButtonApply;
