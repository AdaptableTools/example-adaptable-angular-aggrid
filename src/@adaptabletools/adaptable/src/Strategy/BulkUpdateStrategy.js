"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var PreviewHelper_1 = require("../Utilities/Helpers/PreviewHelper");
var BulkUpdateRedux_1 = require("../Redux/ActionsReducers/BulkUpdateRedux");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var ObjectFactory_1 = require("../Utilities/ObjectFactory");
var BulkUpdateStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(BulkUpdateStrategy, _super);
    function BulkUpdateStrategy(adaptable) {
        return _super.call(this, StrategyConstants.BulkUpdateStrategyId, adaptable) || this;
    }
    BulkUpdateStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.BulkUpdateStrategyFriendlyName,
            ComponentName: ScreenPopups.BulkUpdatePopup,
            Icon: StrategyConstants.BulkUpdateGlyph,
        });
    };
    BulkUpdateStrategy.prototype.addContextMenuItem = function (menuInfo) {
        // not sure if this is right but logic is that
        // if the context cell is one of a selection taht can have smart edit applied
        // then open the smart edit screen
        // perhaps this is faulty logic though?
        var menuItemShowPopup = undefined;
        if (menuInfo.Column &&
            !menuInfo.Column.ReadOnly &&
            menuInfo.IsSelectedCell &&
            menuInfo.IsSingleSelectedColumn) {
            var popUpParams = {
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'Apply ' + StrategyConstants.BulkUpdateStrategyFriendlyName,
                ComponentName: ScreenPopups.BulkUpdatePopup,
                Icon: StrategyConstants.BulkUpdateGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    BulkUpdateStrategy.prototype.applyBulkUpdate = function (newValues) {
        if (this.adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
            // logging audit log function here as there is no obvious Action to listen to in the Store - not great but not end of the world...
            var functionAppliedDetails = {
                name: StrategyConstants.BulkUpdateStrategyId,
                action: BulkUpdateRedux_1.BULK_UPDATE_APPLY,
                info: 'Bulk Update Applied',
                data: newValues,
            };
            this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
        }
        this.adaptable.api.internalApi.setGridCells(newValues, true, false);
    };
    BulkUpdateStrategy.prototype.checkCorrectCellSelection = function () {
        var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
        if (this.adaptable.api.internalApi.isGridInPivotMode()) {
            return {
                IsValid: false,
                Alert: {
                    Header: 'Bulk Update Error',
                    Msg: 'Cannot edit while Grid is in Pivot Mode.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        if (selectedCellInfo == null || ArrayExtensions_1.default.IsNullOrEmpty(selectedCellInfo.Columns)) {
            return {
                IsValid: false,
                Alert: {
                    Header: 'Bulk Update Error',
                    Msg: 'No cells are selected.\nPlease select some cells.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        if (ArrayExtensions_1.default.NotCorrectLength(selectedCellInfo.Columns, 1)) {
            return {
                IsValid: false,
                Alert: {
                    Header: 'Bulk Update Error',
                    Msg: 'Bulk Update only supports single column edit.\nPlease adjust cell selection.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        var selectedColumn = selectedCellInfo.Columns[0];
        if (selectedColumn && selectedColumn.ReadOnly) {
            return {
                IsValid: false,
                Alert: {
                    Header: 'Bulk Update Error',
                    Msg: 'Bulk Update is not permitted on readonly columns.\nPlease adjust the cell selection.',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        return { IsValid: true, Column: selectedColumn };
    };
    BulkUpdateStrategy.prototype.buildPreviewValues = function (bulkUpdateValue) {
        var _this = this;
        var previewResults = [];
        if (StringExtensions_1.default.IsNullOrEmpty(String(bulkUpdateValue))) {
            return null;
        }
        var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
        var columnId = '';
        if (!this.adaptable.api.internalApi.isGridInPivotMode()) {
            if (selectedCellInfo != null && selectedCellInfo.Columns.length > 0) {
                columnId = selectedCellInfo.Columns[0].ColumnId;
                var typedBulkUpdateValue_1;
                switch (selectedCellInfo.Columns[0].DataType) {
                    case Enums_1.DataType.Number:
                        typedBulkUpdateValue_1 = Number(bulkUpdateValue);
                        break;
                    case Enums_1.DataType.String:
                        typedBulkUpdateValue_1 = bulkUpdateValue;
                        break;
                    case Enums_1.DataType.Date:
                        typedBulkUpdateValue_1 = new Date(bulkUpdateValue);
                        break;
                }
                selectedCellInfo.GridCells.forEach(function (selectedCell) {
                    var dataChangedEvent = {
                        OldValue: selectedCell.rawValue,
                        NewValue: typedBulkUpdateValue_1,
                        ColumnId: selectedCell.columnId,
                        PrimaryKeyValue: selectedCell.primaryKeyValue,
                    };
                    var validationRules = _this.adaptable.ValidationService.GetValidationRulesForDataChange(dataChangedEvent);
                    var previewResult = {
                        Id: selectedCell.primaryKeyValue,
                        InitialValue: selectedCell.rawValue,
                        ComputedValue: typedBulkUpdateValue_1,
                        ValidationRules: validationRules,
                    };
                    previewResults.push(previewResult);
                });
            }
        }
        return {
            ColumnId: columnId,
            PreviewResults: previewResults,
            PreviewValidationSummary: PreviewHelper_1.PreviewHelper.GetPreviewValidationSummary(previewResults),
        };
    };
    return BulkUpdateStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.BulkUpdateStrategy = BulkUpdateStrategy;
