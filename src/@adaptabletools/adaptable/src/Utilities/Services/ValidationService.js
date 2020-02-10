"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var GeneralConstants_1 = require("../Constants/GeneralConstants");
var ValidationService = /** @class */ (function () {
    function ValidationService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
    ValidationService.prototype.GetValidationRulesForDataChange = function (dataChangedInfo) {
        var e_1, _a, e_2, _b;
        var failedWarningRules = [];
        // if the new value is the same as the old value then we can get out as we dont see it as an edit?
        if (dataChangedInfo.OldValue == dataChangedInfo.NewValue) {
            return failedWarningRules;
        }
        // first check that if primary key change, the new value is unique
        if (dataChangedInfo.ColumnId == this.adaptable.adaptableOptions.primaryKey) {
            if (this.adaptable.adaptableOptions.generalOptions.preventDuplicatePrimaryKeyValues) {
                if (dataChangedInfo.OldValue != dataChangedInfo.NewValue) {
                    var displayValuePair = this.adaptable.getColumnValueDisplayValuePairDistinctList(dataChangedInfo.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
                    var existingItem = displayValuePair.find(function (dv) { return dv.DisplayValue == dataChangedInfo.NewValue; });
                    if (existingItem) {
                        var range = ObjectFactory_1.ObjectFactory.CreateRange(Enums_1.LeafExpressionOperator.PrimaryKeyDuplicate, dataChangedInfo.ColumnId, null, Enums_1.RangeOperandType.Column, null);
                        var cellValidationRule = ObjectFactory_1.ObjectFactory.CreateCellValidationRule(dataChangedInfo.ColumnId, range, Enums_1.ActionMode.StopEdit, ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression());
                        failedWarningRules.push(cellValidationRule);
                    }
                }
            }
        }
        var editingRules = this.GetCellValidationState().CellValidations.filter(function (v) { return v.ColumnId == dataChangedInfo.ColumnId; });
        if (ArrayExtensions_1.ArrayExtensions.IsEmpty(failedWarningRules) && ArrayExtensions_1.ArrayExtensions.IsNotEmpty(editingRules)) {
            var columns = this.adaptable.api.gridApi.getColumns();
            // first check the rules which have expressions
            var expressionRules = editingRules.filter(function (r) {
                return ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(r.Expression);
            });
            if (expressionRules.length > 0) {
                try {
                    // loop through all rules with an expression (checking the prevent rules first)
                    // if the expression is satisfied check if validation rule passes; if it fails then return immediately (if its prevent) or put the rule in return array (if its warning).
                    // if expression isnt satisfied then we can ignore the rule but it means that we need subsequently to check all the rules with no expressions
                    for (var expressionRules_1 = tslib_1.__values(expressionRules), expressionRules_1_1 = expressionRules_1.next(); !expressionRules_1_1.done; expressionRules_1_1 = expressionRules_1.next()) {
                        var expressionRule = expressionRules_1_1.value;
                        var isSatisfiedExpression = ExpressionHelper_1.ExpressionHelper.checkForExpression(expressionRule.Expression, dataChangedInfo.PrimaryKeyValue, columns, this.adaptable);
                        if (isSatisfiedExpression &&
                            this.IsCellValidationRuleBroken(expressionRule, dataChangedInfo, columns)) {
                            // if we fail then get out if its prevent and keep the rule and stop looping if its warning...
                            if (expressionRule.ActionMode == 'Stop Edit') {
                                this.logAuditValidationEvent(StrategyConstants.CellValidationStrategyFriendlyName, 'Validating Cell Edit', 'Failed', {
                                    Errors: [expressionRule],
                                    DataChangingEvent: dataChangedInfo,
                                });
                                return [expressionRule];
                            }
                            else {
                                failedWarningRules.push(expressionRule);
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (expressionRules_1_1 && !expressionRules_1_1.done && (_a = expressionRules_1.return)) _a.call(expressionRules_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            // now check the rules without expressions
            var noExpressionRules = editingRules.filter(function (r) {
                return ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(r.Expression);
            });
            try {
                for (var noExpressionRules_1 = tslib_1.__values(noExpressionRules), noExpressionRules_1_1 = noExpressionRules_1.next(); !noExpressionRules_1_1.done; noExpressionRules_1_1 = noExpressionRules_1.next()) {
                    var noExpressionRule = noExpressionRules_1_1.value;
                    if (this.IsCellValidationRuleBroken(noExpressionRule, dataChangedInfo, columns)) {
                        if (noExpressionRule.ActionMode == 'Stop Edit') {
                            this.logAuditValidationEvent(StrategyConstants.CellValidationStrategyFriendlyName, 'Validating Cell Edit', 'Failed', {
                                Errors: [noExpressionRule],
                                DataChangingEvent: dataChangedInfo,
                            });
                            return [noExpressionRule];
                        }
                        else {
                            failedWarningRules.push(noExpressionRule);
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (noExpressionRules_1_1 && !noExpressionRules_1_1.done && (_b = noExpressionRules_1.return)) _b.call(noExpressionRules_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (failedWarningRules.length > 0) {
            this.logAuditValidationEvent(StrategyConstants.CellValidationStrategyFriendlyName, 'Validating Cell Edit', 'Warning Shown', {
                Warnings: failedWarningRules,
                DataChangingEvent: dataChangedInfo,
            });
        }
        else {
            this.logAuditValidationEvent(StrategyConstants.CellValidationStrategyFriendlyName, 'Validating Cell Edit', 'Success', {
                DataChangingEvent: dataChangedInfo,
            });
        }
        return failedWarningRules;
    };
    ValidationService.prototype.PerformCellValidation = function (dataChangedInfo) {
        var _this = this;
        var failedRules = this.adaptable.ValidationService.GetValidationRulesForDataChange(dataChangedInfo);
        if (failedRules.length > 0) {
            // first see if its an error = should only be one item in array if so
            if (failedRules[0].ActionMode == 'Stop Edit') {
                var errorMessage = this.CreateCellValidationMessage(failedRules[0]);
                this.adaptable.api.alertApi.showAlertError('Validation Error', errorMessage);
                return false;
            }
            var warningMessage_1 = '';
            failedRules.forEach(function (f) {
                warningMessage_1 = warningMessage_1 + _this.CreateCellValidationMessage(f) + "\n";
            });
            var confirmAction = GridRedux.GridSetValueLikeEdit(dataChangedInfo);
            var cancelAction = null;
            var confirmation = this.createCellValidationUIConfirmation(confirmAction, cancelAction, warningMessage_1);
            this.adaptable.api.internalApi.showPopupConfirmation(confirmation);
            // we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
            return false;
        }
        return true;
    };
    ValidationService.prototype.IsCellValidationRuleBroken = function (cellValidationRule, dataChangedEvent, columns) {
        // if its any change then validation fails immediately
        if (cellValidationRule.Range.Operator == Enums_1.LeafExpressionOperator.AnyChange) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        var column = ColumnHelper_1.ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns);
        var rangeEvaluation = ExpressionHelper_1.ExpressionHelper.GetRangeEvaluation(cellValidationRule.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, column, this.adaptable, null);
        return ExpressionHelper_1.ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.adaptable);
    };
    ValidationService.prototype.GetCellValidationState = function () {
        return this.adaptable.api.cellValidationApi.getCellValidationState();
    };
    ValidationService.prototype.logAuditValidationEvent = function (name, action, info, data) {
        if (this.adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
            var functionAppliedDetails = {
                name: name,
                action: action,
                info: info,
                data: data,
            };
            this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
        }
    };
    ValidationService.prototype.PerformServerValidation = function (dataChangedInfo, config) {
        var _this = this;
        return function () {
            _this.adaptable.adaptableOptions.editOptions
                .validateOnServer(dataChangedInfo)
                .then(function (validationResult) {
                if (validationResult.NewValue === undefined) {
                    validationResult.NewValue = dataChangedInfo.NewValue;
                }
                // If they have changed the return value then we should update the grid, log the function change
                // otherwise the value will persist
                if (validationResult.NewValue !== dataChangedInfo.NewValue) {
                    dataChangedInfo.NewValue = validationResult.NewValue;
                    _this.adaptable.setValue(dataChangedInfo, false);
                    _this.logAuditValidationEvent('Server Validation', 'Validating Cell Edit on Server', validationResult.ValidationMessage, {
                        DataChangingEvent: dataChangedInfo,
                    });
                    if (StringExtensions_1.default.IsNotNullOrEmpty(validationResult.ValidationMessage) &&
                        _this.adaptable.adaptableOptions.editOptions.displayServerValidationMessages) {
                        _this.adaptable.api.alertApi.showAlertInfo('Server Validation Message', validationResult.ValidationMessage);
                    }
                }
                config.onServerValidationCompleted();
            });
            return false;
        };
    };
    ValidationService.prototype.createCellValidationDescription = function (cellValidationRule, columns) {
        if (cellValidationRule.Range.Operator == Enums_1.LeafExpressionOperator.PrimaryKeyDuplicate) {
            return 'Primary Key column cannot contain duplicate values';
        }
        var operator = cellValidationRule.Range
            .Operator;
        var valueDescription = ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns));
        if (!ExpressionHelper_1.ExpressionHelper.OperatorRequiresValue(operator)) {
            return valueDescription;
        }
        var dataType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns);
        var operand1Text = dataType == Enums_1.DataType.Boolean || dataType == Enums_1.DataType.Number
            ? cellValidationRule.Range.Operand1
            : "'" + cellValidationRule.Range.Operand1 + "'";
        valueDescription = valueDescription + operand1Text;
        if (cellValidationRule.Range.Operator == Enums_1.LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }
        if (StringExtensions_1.default.IsNotNullOrEmpty(cellValidationRule.Range.Operand2)) {
            var operand2Text = dataType == Enums_1.DataType.Number
                ? ' and ' + cellValidationRule.Range.Operand2
                : " and '" + cellValidationRule.Range.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    };
    ValidationService.prototype.createCellValidationUIConfirmation = function (confirmAction, cancelAction, warningMessage) {
        if (warningMessage === void 0) { warningMessage = 'Do you want to continue?'; }
        return {
            CancelButtonText: 'Cancel Edit',
            Header: 'Cell Validation Failed',
            Msg: warningMessage,
            ConfirmButtonText: 'Bypass Rule',
            CancelAction: cancelAction,
            ConfirmAction: confirmAction,
            ShowInputBox: true,
            MessageType: Enums_1.MessageType.Warning,
        };
    };
    ValidationService.prototype.CreateCellValidationMessage = function (CellValidation) {
        var columns = this.adaptable.api.gridApi.getColumns();
        var columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(CellValidation.ColumnId, columns);
        var expressionDescription = ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(CellValidation.Expression)
            ? ' when ' + ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, columns)
            : GeneralConstants_1.EMPTY_STRING;
        return (columnFriendlyName +
            ': ' +
            this.createCellValidationDescription(CellValidation, columns) +
            expressionDescription);
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
