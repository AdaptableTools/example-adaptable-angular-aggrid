"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var NamedFilterApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(NamedFilterApiImpl, _super);
    function NamedFilterApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NamedFilterApiImpl.prototype.getNamedFilterState = function () {
        return this.getAdaptableState().NamedFilter;
    };
    NamedFilterApiImpl.prototype.getAllNamedFilter = function () {
        return this.getNamedFilterState().NamedFilters;
    };
    NamedFilterApiImpl.prototype.getNamedFilterByName = function (name) {
        return this.getAllNamedFilter().find(function (nf) { return nf.Name == name; });
    };
    return NamedFilterApiImpl;
}(ApiBase_1.ApiBase));
exports.NamedFilterApiImpl = NamedFilterApiImpl;
