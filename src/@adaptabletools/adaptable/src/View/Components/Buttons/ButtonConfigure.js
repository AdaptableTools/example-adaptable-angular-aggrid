"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonConfigure = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonConfigure, _super);
    function ButtonConfigure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonConfigure.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Configure", iconSize: 18, icon: "build" }, this.props, { variant: "text" })));
    };
    return ButtonConfigure;
}(React.Component));
exports.ButtonConfigure = ButtonConfigure;
