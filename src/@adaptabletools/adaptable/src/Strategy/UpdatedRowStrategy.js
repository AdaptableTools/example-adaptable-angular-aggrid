"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var IDataService_1 = require("../Utilities/Services/Interface/IDataService");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var UpdatedRowStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(UpdatedRowStrategy, _super);
    function UpdatedRowStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.UpdatedRowStrategyId, adaptable) || this;
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            _this.handleDataSourceChanged(dataChangedInfo);
        });
        return _this;
    }
    UpdatedRowStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.UpdatedRowStrategyFriendlyName,
            ComponentName: ScreenPopups.UpdatedRowPopup,
            Icon: StrategyConstants.UpdatedRowGlyph,
        });
    };
    UpdatedRowStrategy.prototype.addColumnMenuItem = function () {
        var currentRowInfos = this.adaptable.api.internalApi.getUpdatedRowInfos();
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(currentRowInfos)) {
            return this.createColumnMenuItemReduxAction('Clear Updated Rows', StrategyConstants.UpdatedRowGlyph, SystemRedux.SystemUpdatedRowDeleteAll(currentRowInfos));
        }
    };
    UpdatedRowStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        if (menuInfo.Column && menuInfo.RowNode) {
            var updatedRowInfos = this.adaptable.api.internalApi.getUpdatedRowInfos();
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(updatedRowInfos)) {
                var updatedRowInfo = updatedRowInfos.find(function (a) { return a.primaryKeyValue == menuInfo.PrimaryKeyValue; });
                if (updatedRowInfo) {
                    menuItemShowPopup = this.createColumnMenuItemReduxAction('Clear Updated Row', StrategyConstants.UpdatedRowGlyph, SystemRedux.SystemUpdatedRowDelete(updatedRowInfo));
                }
            }
        }
        return menuItemShowPopup;
    };
    UpdatedRowStrategy.prototype.handleDataSourceChanged = function (dataChangedInfo) {
        var updatedRowState = this.adaptable.api.updatedRowApi.getUpdatedRowState();
        if (updatedRowState.EnableUpdatedRow) {
            var colsToRefresh = this.adaptable.api.gridApi
                .getColumns()
                .map(function (c) { return c.ColumnId; });
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(colsToRefresh)) {
                var updatedRowInfo = {
                    primaryKeyValue: dataChangedInfo.PrimaryKeyValue,
                    changeDirection: this.getChangeDirection(dataChangedInfo),
                };
                this.adaptable.api.updatedRowApi.addUpdatedRowInfo(updatedRowInfo);
                if (updatedRowState.JumpToRow) {
                    this.adaptable.jumpToRow(dataChangedInfo.RowNode);
                }
                this.adaptable.refreshCells([dataChangedInfo.RowNode], colsToRefresh);
            }
        }
    };
    UpdatedRowStrategy.prototype.getChangeDirection = function (dataChangedInfo) {
        if (dataChangedInfo.OldValue == null ||
            dataChangedInfo.NewValue == null ||
            dataChangedInfo.OldValue == dataChangedInfo.NewValue) {
            return IDataService_1.ChangeDirection.Neutral;
        }
        var columnDataType = ColumnHelper_1.default.getColumnDataTypeFromColumnId(dataChangedInfo.ColumnId, this.adaptable.api.gridApi.getColumns());
        if (columnDataType != Enums_1.DataType.Number && columnDataType != Enums_1.DataType.Date) {
            return IDataService_1.ChangeDirection.Neutral;
        }
        return dataChangedInfo.NewValue > dataChangedInfo.OldValue
            ? IDataService_1.ChangeDirection.Up
            : IDataService_1.ChangeDirection.Down;
    };
    return UpdatedRowStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.UpdatedRowStrategy = UpdatedRowStrategy;
