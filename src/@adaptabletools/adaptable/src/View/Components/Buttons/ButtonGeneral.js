"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonGeneral = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGeneral, _super);
    function ButtonGeneral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGeneral.prototype.render = function () {
        return React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "", variant: "text" }, this.props));
    };
    return ButtonGeneral;
}(React.Component));
exports.ButtonGeneral = ButtonGeneral;
