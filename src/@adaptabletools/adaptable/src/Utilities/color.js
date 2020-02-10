"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*.\d*))?\)/;
var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        if (typeof r === 'string') {
            r = r.trim();
            if (r.indexOf('#') === 0) {
                r = r.substr(r.indexOf('#') + 1);
                this.r = parseInt(r.substr(0, 2), 16);
                this.g = parseInt(r.substr(2, 2), 16);
                this.b = parseInt(r.substr(4, 2), 16);
                this.a = 1;
            }
            else if (r.indexOf('rgb') === 0) {
                var res = exports.RGB_COLOR_REGEX.exec(r);
                this.r = parseInt(res[1], 10);
                this.g = parseInt(res[2], 10);
                this.b = parseInt(res[3], 10);
                this.a = res[5] ? parseFloat(res[5]) : 1;
            }
        }
        else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a || 1;
        }
    }
    Color.prototype.toHex = function () {
        if (this.a === 0) {
            return '#fff';
        }
        return '#' + this.convertRadix(this.r) + this.convertRadix(this.g) + this.convertRadix(this.b);
    };
    Color.prototype.convertRadix = function (input) {
        var converted = input.toString(16);
        if (converted.length == 1) {
            converted = '0' + converted;
        }
        return converted;
    };
    Color.prototype.toRgb = function () {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    };
    Color.prototype.toRgba = function (a) {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + (a == null ? this.a : a) + ")";
    };
    return Color;
}());
exports.Color = Color;
