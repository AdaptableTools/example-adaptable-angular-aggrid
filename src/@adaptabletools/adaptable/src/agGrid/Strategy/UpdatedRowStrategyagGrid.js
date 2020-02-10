"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UpdatedRowStrategy_1 = require("../../Strategy/UpdatedRowStrategy");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var StyleConstants = require("../../Utilities/Constants/StyleConstants");
var IDataService_1 = require("../../Utilities/Services/Interface/IDataService");
var UpdatedRowStrategyagGrid = /** @class */ (function (_super) {
    tslib_1.__extends(UpdatedRowStrategyagGrid, _super);
    function UpdatedRowStrategyagGrid(adaptable) {
        return _super.call(this, adaptable) || this;
    }
    UpdatedRowStrategyagGrid.prototype.initStyles = function () {
        var e_1, _a;
        var columns = this.adaptable.api.gridApi.getColumns();
        var theadaptable = this.adaptable;
        var updatedRowState = this.adaptable.api.updatedRowApi.getUpdatedRowState();
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(columns) && updatedRowState.EnableUpdatedRow) {
            try {
                for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var column = columns_1_1.value;
                    var cellClassRules = {};
                    cellClassRules[StyleConstants.UPDATED_ROW_UP_STYLE] = function (params) {
                        var nodePrimaryKeyValue = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
                        return theadaptable.api.internalApi.isRowInUpdatedRowInfo(nodePrimaryKeyValue, IDataService_1.ChangeDirection.Up);
                    };
                    cellClassRules[StyleConstants.UPDATED_ROW_DOWN_STYLE] = function (params) {
                        var nodePrimaryKeyValue = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
                        return theadaptable.api.internalApi.isRowInUpdatedRowInfo(nodePrimaryKeyValue, IDataService_1.ChangeDirection.Down);
                    };
                    cellClassRules[StyleConstants.UPDATED_ROW_NEUTRAL_STYLE] = function (params) {
                        var nodePrimaryKeyValue = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
                        return theadaptable.api.internalApi.isRowInUpdatedRowInfo(nodePrimaryKeyValue, IDataService_1.ChangeDirection.Neutral);
                    };
                    theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'UpdatedRow');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        // Redraw Adaptableto be on safe side (its rare use case)
        //  this.adaptable.redraw();
    };
    return UpdatedRowStrategyagGrid;
}(UpdatedRowStrategy_1.UpdatedRowStrategy));
exports.UpdatedRowStrategyagGrid = UpdatedRowStrategyagGrid;
