"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ShortcutRedux = require("../Redux/ActionsReducers/ShortcutRedux");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
var Helper_1 = require("../Utilities/Helpers/Helper");
var ShortcutStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutStrategy, _super);
    function ShortcutStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.ShortcutStrategyId, adaptable) || this;
        _this.adaptable._on('KeyDown', function (keyDownEvent) {
            _this.handleKeyDown(keyDownEvent);
        });
        return _this;
    }
    ShortcutStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ShortcutStrategyFriendlyName,
            ComponentName: ScreenPopups.ShortcutPopup,
            Icon: StrategyConstants.ShortcutGlyph,
        });
    };
    ShortcutStrategy.prototype.handleKeyDown = function (keyEvent) {
        var shortcuts = this.adaptable.api.shortcutApi.getAllShortcut();
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(shortcuts)) {
            return;
        }
        var activeCell = this.adaptable.getActiveCell();
        if (!activeCell) {
            return;
        }
        var selectedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(activeCell.columnId, this.adaptable.api.gridApi.getColumns());
        if (activeCell && !selectedColumn.ReadOnly) {
            var columnDataType = selectedColumn.DataType;
            var keyEventString_1 = Helper_1.Helper.getStringRepresentionFromKey(keyEvent);
            var activeShortcut = void 0;
            var valueToReplace = void 0;
            switch (columnDataType) {
                case Enums_1.DataType.Number: {
                    activeShortcut = shortcuts
                        .filter(function (s) { return s.ColumnType == Enums_1.DataType.Number; })
                        .find(function (x) { return keyEventString_1 == x.ShortcutKey.toLowerCase(); });
                    if (activeShortcut) {
                        var currentCellValue = void 0;
                        // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
                        if (this.adaptable.gridHasCurrentEditValue()) {
                            currentCellValue = this.adaptable.getCurrentCellEditValue();
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutOperation);
                        }
                        else {
                            currentCellValue = activeCell.rawValue;
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutOperation);
                        }
                    }
                    break;
                }
                case Enums_1.DataType.Date: {
                    activeShortcut = shortcuts
                        .filter(function (s) { return s.ColumnType == Enums_1.DataType.Date; })
                        .find(function (x) { return keyEventString_1 == x.ShortcutKey.toLowerCase(); });
                    if (activeShortcut) {
                        // Date we ONLY replace so dont need to worry about replacing values
                        if (activeShortcut.IsDynamic) {
                            valueToReplace = this.adaptable.CalendarService.GetDynamicDate(activeShortcut.ShortcutResult);
                        }
                        else {
                            valueToReplace = new Date(activeShortcut.ShortcutResult);
                        }
                    }
                    break;
                }
            }
            if (activeShortcut) {
                //We cancel the edit before doing anything so there is no issue when showing a popup or performing the shortcut
                this.adaptable.cancelEdit();
                this.applyShortcut(activeShortcut, activeCell, valueToReplace, keyEventString_1);
                keyEvent.preventDefault();
            }
        }
    };
    ShortcutStrategy.prototype.CalculateShortcut = function (first, second, shortcutOperation) {
        var firstNumber = Number(first);
        var secondNumber = Number(second);
        switch (shortcutOperation) {
            case Enums_1.MathOperation.Add:
                return firstNumber + secondNumber;
            case Enums_1.MathOperation.Subtract:
                return firstNumber - secondNumber;
            case Enums_1.MathOperation.Multiply:
                return firstNumber * secondNumber;
            case Enums_1.MathOperation.Divide:
                return firstNumber / secondNumber;
            case Enums_1.MathOperation.Replace:
                return secondNumber;
        }
    };
    ShortcutStrategy.prototype.applyShortcut = function (activeShortcut, activeCell, newValue, keyEventString) {
        var newGridCell = {
            columnId: activeCell.columnId,
            rawValue: newValue,
            displayValue: newValue,
            primaryKeyValue: activeCell.primaryKeyValue,
        };
        this.adaptable.api.internalApi.setGridCell(newGridCell, true, true);
        var functionAppliedDetails = {
            name: StrategyConstants.ShortcutStrategyId,
            action: ShortcutRedux.SHORTCUT_APPLY,
            info: 'KeyPressed:' + keyEventString,
            data: {
                Shortcut: activeShortcut,
                PrimaryKey: activeCell.primaryKeyValue,
                ColumnId: activeCell.columnId,
                NewValue: newValue,
            },
        };
        this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    };
    return ShortcutStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ShortcutStrategy = ShortcutStrategy;
