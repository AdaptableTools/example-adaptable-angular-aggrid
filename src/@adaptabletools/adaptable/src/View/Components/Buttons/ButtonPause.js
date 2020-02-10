"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonPause = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonPause, _super);
    function ButtonPause() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonPause.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Pause", iconSize: 20, icon: "pause", variant: "text" }, this.props)));
    };
    return ButtonPause;
}(React.Component));
exports.ButtonPause = ButtonPause;
