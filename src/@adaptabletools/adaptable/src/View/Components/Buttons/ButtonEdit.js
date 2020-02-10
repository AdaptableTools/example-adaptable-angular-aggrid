"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonEdit = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonEdit, _super);
    function ButtonEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonEdit.prototype.render = function () {
        return React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Edit", variant: "text", icon: "edit", iconSize: 20 }, this.props));
    };
    return ButtonEdit;
}(React.Component));
exports.ButtonEdit = ButtonEdit;
