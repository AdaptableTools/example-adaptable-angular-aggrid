"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonSchedule = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonSchedule, _super);
    function ButtonSchedule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonSchedule.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Schedule", iconSize: 20, icon: "schedule", variant: "text" }, this.props)));
    };
    return ButtonSchedule;
}(React.Component));
exports.ButtonSchedule = ButtonSchedule;
