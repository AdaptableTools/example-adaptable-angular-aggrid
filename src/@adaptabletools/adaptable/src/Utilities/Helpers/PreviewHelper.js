"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../Extensions/StringExtensions");
function GetPreviewValidationSummary(previewResults) {
    var globalHasValidationPrevent = false;
    var globalHasValidationWarning = false;
    var globalHasOnlyValidationPrevent = true;
    previewResults.forEach(function (previewResult) {
        var hasValidationErrors = previewResult.ValidationRules.length > 0;
        var localHasValidationPrevent = previewResult.ValidationRules.filter(function (x) { return x.ActionMode == Enums_1.ActionMode.StopEdit; }).length > 0;
        var localHasValidationWarning = previewResult.ValidationRules.filter(function (x) { return x.ActionMode == Enums_1.ActionMode.WarnUser; }).length > 0;
        globalHasValidationPrevent = globalHasValidationPrevent || localHasValidationPrevent;
        globalHasValidationWarning = globalHasValidationWarning || localHasValidationWarning;
        if (!hasValidationErrors || localHasValidationWarning) {
            globalHasOnlyValidationPrevent = false;
        }
    });
    return {
        HasValidationPrevent: globalHasValidationPrevent,
        HasValidationWarning: globalHasValidationWarning,
        HasOnlyValidationPrevent: globalHasOnlyValidationPrevent,
    };
}
exports.GetPreviewValidationSummary = GetPreviewValidationSummary;
function GetValidationMessage(previewInfo, newValue) {
    if (previewInfo && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(newValue)) {
        var previewValidationSummary = previewInfo.PreviewValidationSummary;
        if (previewValidationSummary.HasOnlyValidationPrevent) {
            return 'All Cell Validations have failed (see Preview for details).';
        }
        else if (previewValidationSummary.HasValidationPrevent &&
            previewValidationSummary.HasValidationWarning) {
            return "Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm the updates which are set to 'warning' before they will be applied; those which are set to 'prevent' will be ignored.";
        }
        else if (previewValidationSummary.HasValidationWarning) {
            return 'Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm these updates before they will be applied.';
        }
        else if (previewValidationSummary.HasValidationPrevent) {
            return 'Some Cell Validations have failed (see Preview for details).\nThese updates will be ignored.';
        }
    }
    return '';
}
exports.GetValidationMessage = GetValidationMessage;
function GetCellInfosFromPreview(previewInfo, bypassCellValidationWarnings) {
    var e_1, _a;
    var newValues = [];
    if (bypassCellValidationWarnings) {
        try {
            for (var _b = tslib_1.__values(previewInfo.PreviewResults), _c = _b.next(); !_c.done; _c = _b.next()) {
                var previewResult = _c.value;
                if (previewResult.ValidationRules.filter(function (p) { return p.ActionMode == 'Stop Edit'; }).length == 0) {
                    newValues.push({
                        primaryKeyValue: previewResult.Id,
                        columnId: previewInfo.ColumnId,
                        rawValue: previewResult.ComputedValue,
                        displayValue: previewResult.ComputedValue,
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        previewInfo.PreviewResults.filter(function (p) { return p.ValidationRules.length == 0; }).forEach(function (pr) {
            newValues.push({
                primaryKeyValue: pr.Id,
                columnId: previewInfo.ColumnId,
                rawValue: pr.ComputedValue,
                displayValue: pr.ComputedValue,
            });
        });
    }
    return newValues;
}
exports.GetCellInfosFromPreview = GetCellInfosFromPreview;
exports.PreviewHelper = {
    GetPreviewValidationSummary: GetPreviewValidationSummary,
    GetValidationMessage: GetValidationMessage,
    GetCellInfosFromPreview: GetCellInfosFromPreview,
};
exports.default = exports.PreviewHelper;
