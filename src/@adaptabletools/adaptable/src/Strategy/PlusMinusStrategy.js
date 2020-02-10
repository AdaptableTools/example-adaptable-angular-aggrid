"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var PlusMinusRedux = require("../Redux/ActionsReducers/PlusMinusRedux");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var Helper_1 = require("../Utilities/Helpers/Helper");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
var ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
var PlusMinusStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusStrategy, _super);
    function PlusMinusStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.PlusMinusStrategyId, adaptable) || this;
        _this.adaptable._on('KeyDown', function (keyDownEvent) {
            _this.handleKeyDown(keyDownEvent);
        });
        return _this;
    }
    PlusMinusStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.PlusMinusStrategyFriendlyName,
            ComponentName: ScreenPopups.PlusMinusPopup,
            Icon: StrategyConstants.PlusMinusGlyph,
        });
    };
    PlusMinusStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable)) {
            if (column && column.DataType == Enums_1.DataType.Number) {
                var popupParam = {
                    columnId: column.ColumnId,
                    action: 'New',
                    source: 'ColumnMenu',
                };
                return this.createColumnMenuItemShowPopup('Create Plus/Minus Rule', ScreenPopups.PlusMinusPopup, StrategyConstants.PlusMinusGlyph, popupParam);
            }
        }
    };
    PlusMinusStrategy.prototype.handleKeyDown = function (keyEvent) {
        //it's a speacial key so we handle the string representation of the key '
        var keyEventString = Helper_1.Helper.getStringRepresentionFromKey(keyEvent);
        if (keyEventString == '-' || keyEventString == '+') {
            var plusMinusRules = this.adaptable.api.plusMinusApi.getAllPlusMinus();
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(plusMinusRules)) {
                var side = 1;
                if (keyEventString == '-') {
                    side = -1;
                }
                var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
                var isPlusMinusApplicable = this.applyPlusMinus(plusMinusRules, selectedCellInfo.GridCells, side);
                if (isPlusMinusApplicable) {
                    keyEvent.preventDefault();
                }
            }
        }
    };
    PlusMinusStrategy.prototype.applyPlusMinus = function (plusMinusRules, cellsToUpdate, side) {
        var _this = this;
        var shouldApplyPlusMinus = false;
        var columns = this.adaptable.api.gridApi.getColumns();
        var successfulValues = [];
        var failedPreventEdits = [];
        var failedWarningEdits = [];
        var warningValues = [];
        cellsToUpdate.forEach(function (selectedCell) {
            var e_1, _a;
            var rulesForColumn = plusMinusRules.filter(function (pmr) { return pmr.ColumnId == selectedCell.columnId; });
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(rulesForColumn)) {
                var selectedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(selectedCell.columnId, columns);
                if (selectedColumn.DataType == Enums_1.DataType.Number && !selectedColumn.ReadOnly) {
                    //for aggrid as we are getting strings sometimes
                    if (typeof selectedCell.rawValue != 'number') {
                        selectedCell.rawValue = parseFloat(selectedCell.rawValue);
                    }
                    var newValue = void 0;
                    //we try to find a condition with an expression for that column that matches the record
                    var columnNudgesWithExpression = rulesForColumn.filter(function (x) { return !x.IsDefaultNudge; });
                    try {
                        for (var columnNudgesWithExpression_1 = tslib_1.__values(columnNudgesWithExpression), columnNudgesWithExpression_1_1 = columnNudgesWithExpression_1.next(); !columnNudgesWithExpression_1_1.done; columnNudgesWithExpression_1_1 = columnNudgesWithExpression_1.next()) {
                            var columnNudge = columnNudgesWithExpression_1_1.value;
                            if (ExpressionHelper_1.ExpressionHelper.checkForExpression(columnNudge.Expression, selectedCell.primaryKeyValue, columns, _this.adaptable)) {
                                newValue = {
                                    primaryKeyValue: selectedCell.primaryKeyValue,
                                    columnId: selectedCell.columnId,
                                    rawValue: selectedCell.rawValue + columnNudge.NudgeValue * side,
                                    displayValue: selectedCell.rawValue + columnNudge.NudgeValue * side,
                                };
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (columnNudgesWithExpression_1_1 && !columnNudgesWithExpression_1_1.done && (_a = columnNudgesWithExpression_1.return)) _a.call(columnNudgesWithExpression_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    //we havent found any Condition with an Expression so we look for a general one for the column
                    if (!newValue) {
                        var columnNudge = rulesForColumn.find(function (x) { return x.IsDefaultNudge; });
                        if (columnNudge) {
                            newValue = {
                                primaryKeyValue: selectedCell.primaryKeyValue,
                                columnId: selectedCell.columnId,
                                rawValue: selectedCell.rawValue + columnNudge.NudgeValue * side,
                                displayValue: selectedCell.rawValue + columnNudge.NudgeValue * side,
                            };
                        }
                        //we havent found a condition so we return false - this will allow a minus to be entered into the column
                        else {
                            return false;
                        }
                    }
                    if (newValue) {
                        shouldApplyPlusMinus = true;
                    }
                    //avoid the 0.0000000000x
                    newValue.rawValue = parseFloat(newValue.rawValue.toFixed(12));
                    var dataChangedEvent = {
                        OldValue: Number(selectedCell.rawValue),
                        NewValue: newValue.rawValue,
                        ColumnId: selectedCell.columnId,
                        PrimaryKeyValue: selectedCell.primaryKeyValue,
                    };
                    var validationRules = _this.adaptable.ValidationService.GetValidationRulesForDataChange(dataChangedEvent);
                    if (validationRules.length > 0) {
                        if (validationRules[0].ActionMode == 'Stop Edit') {
                            failedPreventEdits.push(validationRules[0]);
                        }
                        else {
                            failedWarningEdits.push(validationRules[0]);
                            warningValues.push(newValue);
                        }
                    }
                    else {
                        successfulValues.push(newValue);
                    }
                }
            }
        });
        // first inform if any failed with prevent
        this.ShowErrorPreventMessage(failedPreventEdits);
        if (failedWarningEdits.length > 0) {
            this.ShowWarningMessages(failedWarningEdits, warningValues, successfulValues);
        }
        else {
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(successfulValues)) {
                this.adaptable.api.internalApi.setGridCells(successfulValues, true, false);
            }
        }
        return shouldApplyPlusMinus;
    };
    PlusMinusStrategy.prototype.ShowErrorPreventMessage = function (failedRules) {
        var _this = this;
        if (failedRules.length > 0) {
            var failedMessages_1 = [];
            failedRules.forEach(function (fr) {
                var failedMessage = _this.adaptable.ValidationService.CreateCellValidationMessage(fr) + '\n';
                var existingMessage = failedMessages_1.find(function (f) { return f == failedMessage; });
                if (existingMessage == null) {
                    failedMessages_1.push(failedMessage);
                }
            });
            this.adaptable.api.alertApi.showAlertError('Nudge(s) failed rule', failedMessages_1.toString());
        }
    };
    PlusMinusStrategy.prototype.ShowWarningMessages = function (failedRules, warningValues, successfulValues) {
        var _this = this;
        if (failedRules.length > 0) {
            var allValues = warningValues.concat.apply(warningValues, tslib_1.__spread(successfulValues));
            var warningMessages_1 = [];
            failedRules.forEach(function (fr) {
                var warningMessage = _this.adaptable.ValidationService.CreateCellValidationMessage(fr) + '\n';
                var existingMessage = warningMessages_1.find(function (w) { return w == warningMessage; });
                if (existingMessage == null) {
                    warningMessages_1.push(warningMessage);
                }
            });
            var warningMessage = failedRules.length + ' Nudge(s) failed rule:\n' + warningMessages_1.toString();
            var confirmAction = PlusMinusRedux.PlusMinusApply(allValues);
            var cancelAction = PlusMinusRedux.PlusMinusApply(successfulValues);
            var confirmation = this.adaptable.ValidationService.createCellValidationUIConfirmation(confirmAction, cancelAction, warningMessage);
            this.adaptable.api.internalApi.showPopupConfirmation(confirmation);
        }
    };
    return PlusMinusStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.PlusMinusStrategy = PlusMinusStrategy;
