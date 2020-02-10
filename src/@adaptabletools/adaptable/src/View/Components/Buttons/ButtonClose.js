"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonClose = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonClose, _super);
    function ButtonClose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonClose.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Close", iconSize: 20, icon: "clear" }, this.props, { variant: "text" })));
    };
    return ButtonClose;
}(React.Component));
exports.ButtonClose = ButtonClose;
