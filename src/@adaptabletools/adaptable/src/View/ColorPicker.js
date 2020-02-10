"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Input_1 = require("../components/Input");
var ColorPicker = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPicker, _super);
    function ColorPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorPicker.prototype.render = function () {
        var _a = this.props, ColorPalette = _a.ColorPalette, restProps = tslib_1.__rest(_a, ["ColorPalette"]);
        var ABcolorChoicesOptions = ColorPalette.map(function (x) { return React.createElement("option", { key: x }, x); });
        var ABcolorChoices = React.createElement("datalist", { id: 'ABcolorChoices' }, ABcolorChoicesOptions);
        var Inpt = Input_1.default;
        return (React.createElement("div", { className: 'ColorPicker' },
            React.createElement(Inpt, tslib_1.__assign({}, restProps, { type: "color", style: {
                    width: 70,
                    padding: 0 /* we need this to be 0, since otherwise on Windows browsers, the chosen color cannot be seen */,
                }, list: "ABcolorChoices" })),
            ABcolorChoices));
    };
    return ColorPicker;
}(React.Component));
exports.ColorPicker = ColorPicker;
