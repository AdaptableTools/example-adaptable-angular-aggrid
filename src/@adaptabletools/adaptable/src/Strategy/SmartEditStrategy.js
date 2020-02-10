"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var PreviewHelper_1 = require("../Utilities/Helpers/PreviewHelper");
var SmartEditRedux_1 = require("../Redux/ActionsReducers/SmartEditRedux");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var ObjectFactory_1 = require("../Utilities/ObjectFactory");
var SmartEditStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(SmartEditStrategy, _super);
    function SmartEditStrategy(adaptable) {
        return _super.call(this, StrategyConstants.SmartEditStrategyId, adaptable) || this;
    }
    SmartEditStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.SmartEditStrategyFriendlyName,
            ComponentName: ScreenPopups.SmartEditPopup,
            Icon: StrategyConstants.SmartEditGlyph,
        });
    };
    SmartEditStrategy.prototype.addContextMenuItem = function (menuInfo) {
        // not sure if this is right but logic is that
        // if the context cell is one of a selection taht can have smart edit applied
        // then open the smart edit screen
        // perhaps this is faulty logic though?
        var menuItemShowPopup = undefined;
        if (menuInfo.Column &&
            menuInfo.Column.DataType == Enums_1.DataType.Number &&
            !menuInfo.Column.ReadOnly &&
            menuInfo.IsSelectedCell &&
            menuInfo.IsSingleSelectedColumn) {
            var popUpParams = {
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'Apply ' + StrategyConstants.SmartEditStrategyFriendlyName,
                ComponentName: ScreenPopups.SmartEditPopup,
                Icon: StrategyConstants.SmartEditGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    SmartEditStrategy.prototype.ApplySmartEdit = function (newValues) {
        if (this.adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
            // logging audit log function here as there is no obvious Action to listen to in the Store - not great but not end of the world...
            var functionAppliedDetails = {
                name: StrategyConstants.SmartEditStrategyId,
                action: SmartEditRedux_1.SMARTEDIT_APPLY,
                info: 'Smart Edit Applied',
                data: newValues,
            };
            this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
        }
        this.adaptable.api.internalApi.setGridCells(newValues, true, true);
    };
    SmartEditStrategy.prototype.CheckCorrectCellSelection = function () {
        var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
        if (this.adaptable.api.internalApi.isGridInPivotMode()) {
            return {
                Alert: {
                    Header: 'Smart Edit Error',
                    Msg: 'Cannot edit while Grid is in Pivot Mode.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        if (selectedCellInfo == null || ArrayExtensions_1.default.IsNullOrEmpty(selectedCellInfo.Columns)) {
            return {
                Alert: {
                    Header: 'Smart Edit Error',
                    Msg: 'No cells are selected.\nPlease select some cells.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        if (ArrayExtensions_1.default.NotCorrectLength(selectedCellInfo.Columns, 1)) {
            return {
                Alert: {
                    Header: 'Smart Edit Error',
                    Msg: 'Smart Edit only supports single column edit.\nPlease adjust cell selection.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        var column = selectedCellInfo.Columns[0];
        if (column) {
            if (column.DataType != Enums_1.DataType.Number) {
                return {
                    Alert: {
                        Header: 'Smart Edit Error',
                        Msg: 'Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection.',
                        AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                    },
                };
            }
            if (column.ReadOnly) {
                return {
                    Alert: {
                        Header: 'Smart Edit Error',
                        Msg: 'Smart Edit is not permitted on readonly columns.\nPlease adjust the cell selection.',
                        AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                    },
                };
            }
        }
        return { ActionReturn: true };
    };
    SmartEditStrategy.prototype.BuildPreviewValues = function (smartEditValue, smartEditOperation) {
        var _this = this;
        var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
        var previewResults = [];
        var columnId = '';
        if (!this.adaptable.api.internalApi.isGridInPivotMode()) {
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(selectedCellInfo.Columns)) {
                var column = selectedCellInfo.Columns[0];
                if (column) {
                    columnId = column.ColumnId;
                    selectedCellInfo.GridCells.forEach(function (selectedCell) {
                        var newValue;
                        switch (smartEditOperation) {
                            case Enums_1.MathOperation.Add:
                                newValue = Number(selectedCell.rawValue) + smartEditValue;
                                break;
                            case Enums_1.MathOperation.Subtract:
                                newValue = Number(selectedCell.rawValue) - smartEditValue;
                                break;
                            case Enums_1.MathOperation.Multiply:
                                newValue = Number(selectedCell.rawValue) * smartEditValue;
                                break;
                            case Enums_1.MathOperation.Divide:
                                newValue = Number(selectedCell.rawValue) / smartEditValue;
                                break;
                            case Enums_1.MathOperation.Replace:
                                newValue = smartEditValue;
                                break;
                        }
                        //avoid the 0.0000000000x
                        if (newValue) {
                            newValue = parseFloat(newValue.toFixed(12));
                        }
                        var dataChangedEvent = {
                            OldValue: Number(selectedCell.rawValue),
                            NewValue: newValue,
                            ColumnId: selectedCell.columnId,
                            PrimaryKeyValue: selectedCell.primaryKeyValue,
                        };
                        var validationRules = _this.adaptable.ValidationService.GetValidationRulesForDataChange(dataChangedEvent);
                        var previewResult = {
                            Id: selectedCell.primaryKeyValue,
                            InitialValue: Number(selectedCell.rawValue),
                            ComputedValue: newValue,
                            ValidationRules: validationRules,
                        };
                        previewResults.push(previewResult);
                    });
                }
            }
        }
        return {
            ColumnId: columnId,
            PreviewResults: previewResults,
            PreviewValidationSummary: PreviewHelper_1.PreviewHelper.GetPreviewValidationSummary(previewResults),
        };
    };
    return SmartEditStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.SmartEditStrategy = SmartEditStrategy;
