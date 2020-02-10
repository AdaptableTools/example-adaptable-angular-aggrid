"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonLogin = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonLogin, _super);
    function ButtonLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonLogin.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Login", iconSize: 20, icon: "login", variant: "text" }, this.props)));
    };
    return ButtonLogin;
}(React.Component));
exports.ButtonLogin = ButtonLogin;
