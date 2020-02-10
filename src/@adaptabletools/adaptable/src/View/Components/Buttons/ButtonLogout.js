"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonLogout = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonLogout, _super);
    function ButtonLogout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonLogout.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Logout", iconSize: 20, icon: "logout", variant: "text" }, this.props)));
    };
    return ButtonLogout;
}(React.Component));
exports.ButtonLogout = ButtonLogout;
