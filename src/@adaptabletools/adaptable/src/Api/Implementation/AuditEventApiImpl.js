"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var Emitter_1 = require("../../Utilities/Emitter");
var AuditEventApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(AuditEventApiImpl, _super);
    function AuditEventApiImpl(adaptable) {
        var _this = _super.call(this, adaptable) || this;
        _this.on = function (eventName, callback) {
            return _this.emitter.on(eventName, callback);
        };
        _this.emit = function (eventName, data) { return _this.emitter.emit(eventName, data); };
        _this.emitter = new Emitter_1.default();
        return _this;
    }
    return AuditEventApiImpl;
}(ApiBase_1.ApiBase));
exports.AuditEventApiImpl = AuditEventApiImpl;
