"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonMaximise = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonMaximise, _super);
    function ButtonMaximise() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonMaximise.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ iconSize: 20, tooltip: "Maximize", icon: this.props.useHoirzontalChevron ? 'arrow-right' : 'arrow-down', variant: "text" }, this.props)));
    };
    return ButtonMaximise;
}(React.Component));
exports.ButtonMaximise = ButtonMaximise;
