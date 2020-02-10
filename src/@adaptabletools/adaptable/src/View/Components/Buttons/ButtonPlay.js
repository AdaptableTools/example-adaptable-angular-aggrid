"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonPlay = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonPlay, _super);
    function ButtonPlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonPlay.prototype.render = function () {
        return React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Play", iconSize: 20, icon: "play", variant: "text" }, this.props));
    };
    return ButtonPlay;
}(React.Component));
exports.ButtonPlay = ButtonPlay;
