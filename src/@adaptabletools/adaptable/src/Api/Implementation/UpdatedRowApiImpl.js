"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var UpdatedRowRedux = require("../../Redux/ActionsReducers/UpdatedRowRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
/**
 * Provides full and comprehensive run-time access to the Updated Rows function (which colours rows as they change based on a scheme set by the user).
 *
 * Also provides access to the associated Updated Row state (from Predefined Config).
 */
var UpdatedRowApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(UpdatedRowApiImpl, _super);
    function UpdatedRowApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdatedRowApiImpl.prototype.getUpdatedRowState = function () {
        return this.getAdaptableState().UpdatedRow;
    };
    UpdatedRowApiImpl.prototype.updatedRowEnable = function () {
        this.dispatchAction(UpdatedRowRedux.UpdatedRowEnableDisable(true));
    };
    UpdatedRowApiImpl.prototype.updatedRowDisable = function () {
        this.dispatchAction(UpdatedRowRedux.UpdatedRowEnableDisable(false));
    };
    UpdatedRowApiImpl.prototype.jumpToRowEnable = function () {
        this.dispatchAction(UpdatedRowRedux.JumpToRowEnableDisable(true));
    };
    UpdatedRowApiImpl.prototype.jumpToRowDisable = function () {
        this.dispatchAction(UpdatedRowRedux.JumpToRowEnableDisable(false));
    };
    UpdatedRowApiImpl.prototype.setUpColor = function (upColor) {
        this.dispatchAction(UpdatedRowRedux.UpColorSet(upColor));
    };
    UpdatedRowApiImpl.prototype.setDownColor = function (downColor) {
        this.dispatchAction(UpdatedRowRedux.DownColorSet(downColor));
    };
    UpdatedRowApiImpl.prototype.setNeutralColor = function (neutralColor) {
        this.dispatchAction(UpdatedRowRedux.NeutralColorSet(neutralColor));
    };
    UpdatedRowApiImpl.prototype.addUpdatedRowInfo = function (updatedRowInfo) {
        var maxUpdatedRowsInStore = this.getUpdatedRowState().MaxUpdatedRowsInStore;
        // if we exceed the amount allowed then we need to delete oldest item first
        // we do it here (and not in Redux) so that the store can listen and refresh the row.
        if (maxUpdatedRowsInStore != Infinity) {
            var updatedRowInfos = this.getAdaptableState().System.UpdatedRowInfos;
            if (updatedRowInfos.length === maxUpdatedRowsInStore) {
                // need to delete the oldest one
                var oldestUpdatedRowInfo = updatedRowInfos[0];
                this.deleteUpdatedRowInfo(oldestUpdatedRowInfo);
            }
        }
        // now add
        this.dispatchAction(SystemRedux.SystemUpdatedRowAdd(updatedRowInfo));
    };
    UpdatedRowApiImpl.prototype.deleteUpdatedRowInfo = function (updatedRowInfo) {
        this.dispatchAction(SystemRedux.SystemUpdatedRowDelete(updatedRowInfo));
    };
    UpdatedRowApiImpl.prototype.deleteAllUpdatedRowInfo = function () {
        var updatedRowInfos = this.adaptable.api.internalApi.getUpdatedRowInfos();
        this.dispatchAction(SystemRedux.SystemUpdatedRowDeleteAll(updatedRowInfos));
    };
    return UpdatedRowApiImpl;
}(ApiBase_1.ApiBase));
exports.UpdatedRowApiImpl = UpdatedRowApiImpl;
