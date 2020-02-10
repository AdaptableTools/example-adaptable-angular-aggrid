"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonUndo = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonUndo, _super);
    function ButtonUndo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonUndo.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ iconSize: 20, tooltip: "Undo", icon: 'undo', variant: "text" }, this.props)));
    };
    return ButtonUndo;
}(React.Component));
exports.ButtonUndo = ButtonUndo;
