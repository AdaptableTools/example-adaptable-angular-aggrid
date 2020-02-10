"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.BULK_UPDATE_APPLY = 'BULK_UPDATE_APPLY';
exports.BULK_UPDATE_CHANGE_VALUE = 'BULK_UPDATE_CHANGE_VALUE';
exports.BulkUpdateApply = function (bypassCellValidationWarnings) { return ({
    type: exports.BULK_UPDATE_APPLY,
    bypassCellValidationWarnings: bypassCellValidationWarnings,
}); };
exports.BulkUpdateChangeValue = function (bulkUpdateValue) { return ({
    type: exports.BULK_UPDATE_CHANGE_VALUE,
    bulkUpdateValue: bulkUpdateValue,
}); };
var initialBulkUpdateState = {
    BulkUpdateValue: GeneralConstants_1.EMPTY_STRING,
};
exports.BulkUpdateReducer = function (state, action) {
    if (state === void 0) { state = initialBulkUpdateState; }
    switch (action.type) {
        case exports.BULK_UPDATE_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null });
        case exports.BULK_UPDATE_CHANGE_VALUE:
            return Object.assign({}, state, {
                BulkUpdateValue: action.bulkUpdateValue,
            });
        default:
            return state;
    }
};
