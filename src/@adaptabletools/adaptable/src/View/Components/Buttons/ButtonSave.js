"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonSave = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonSave, _super);
    function ButtonSave() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonSave.prototype.render = function () {
        return React.createElement(SimpleButton_1.default, tslib_1.__assign({ iconSize: 20, icon: "save", tooltip: "Save", variant: "text" }, this.props));
    };
    return ButtonSave;
}(React.Component));
exports.ButtonSave = ButtonSave;
