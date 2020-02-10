"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var ActionColumnApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ActionColumnApiImpl, _super);
    function ActionColumnApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionColumnApiImpl.prototype.getActionColumnState = function () {
        return this.getAdaptableState().ActionColumn;
    };
    ActionColumnApiImpl.prototype.getAllActionColumn = function () {
        var actionColumns = this.getAdaptableState().ActionColumn
            .ActionColumns;
        if (actionColumns == undefined) {
            actionColumns = [];
        }
        return actionColumns;
    };
    return ActionColumnApiImpl;
}(ApiBase_1.ApiBase));
exports.ActionColumnApiImpl = ActionColumnApiImpl;
