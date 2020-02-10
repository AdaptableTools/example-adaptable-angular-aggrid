"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PercentBarTooltip = /** @class */ (function () {
    function PercentBarTooltip() {
    }
    // gets called once before the renderer is used
    PercentBarTooltip.prototype.init = function (params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = params.value;
    };
    // gets called once when grid ready to insert the element
    PercentBarTooltip.prototype.getGui = function () {
        return this.eGui;
    };
    return PercentBarTooltip;
}());
exports.PercentBarTooltip = PercentBarTooltip;
