"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonExport = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonExport, _super);
    function ButtonExport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonExport.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Export", iconSize: 20, icon: "export", variant: "text" }, this.props)));
    };
    return ButtonExport;
}(React.Component));
exports.ButtonExport = ButtonExport;
