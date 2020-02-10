"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonMinimise = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonMinimise, _super);
    function ButtonMinimise() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonMinimise.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ iconSize: 20, tooltip: "Minimise" }, this.props, { variant: "text", icon: "arrow-up" })));
    };
    return ButtonMinimise;
}(React.Component));
exports.ButtonMinimise = ButtonMinimise;
