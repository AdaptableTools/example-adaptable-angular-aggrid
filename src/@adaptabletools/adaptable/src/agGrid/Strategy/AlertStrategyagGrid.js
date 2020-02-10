"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AlertStrategy_1 = require("../../Strategy/AlertStrategy");
var StyleConstants = require("../../Utilities/Constants/StyleConstants");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var AlertStrategyagGrid = /** @class */ (function (_super) {
    tslib_1.__extends(AlertStrategyagGrid, _super);
    function AlertStrategyagGrid(adaptable) {
        return _super.call(this, adaptable) || this;
    }
    AlertStrategyagGrid.prototype.initStyles = function () {
        var allColumns = this.adaptable.api.gridApi.getColumns();
        var theAdaptableInstance = this.adaptable;
        var alertDefsWithHighlightCells = this.adaptable.api.alertApi
            .getAlertDefinitions()
            .filter(function (a) { return a.AlertProperties.HighlightCell; });
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(alertDefsWithHighlightCells)) {
            allColumns.forEach(function (col) {
                var cellClassRules = {};
                var alertDefinitions = alertDefsWithHighlightCells.filter(function (x) { return x.ColumnId == col.ColumnId; });
                if (ArrayExtensions_1.default.IsNotNullOrEmpty(alertDefinitions)) {
                    alertDefinitions.forEach(function (alertDefinition) {
                        var styleName = StyleConstants.ALERT_STYLE + alertDefinition.MessageType.toLowerCase();
                        cellClassRules[styleName] = function (params) {
                            var currentAlerts = theAdaptableInstance.api.internalApi.getAdaptableAlerts();
                            if (ArrayExtensions_1.default.IsNotNullOrEmpty(currentAlerts)) {
                                var relevantAlerts = currentAlerts.filter(function (aa) {
                                    return aa.AlertDefinition.AlertProperties.HighlightCell &&
                                        aa.AlertDefinition.ColumnId == col.ColumnId &&
                                        aa.AlertDefinition.MessageType == alertDefinition.MessageType &&
                                        aa.DataChangedInfo &&
                                        aa.DataChangedInfo.PrimaryKeyValue ==
                                            theAdaptableInstance.getPrimaryKeyValueFromRowNode(params.node);
                                });
                                return relevantAlerts.length > 0;
                            }
                            return false;
                        };
                    });
                    theAdaptableInstance.setCellClassRules(cellClassRules, col.ColumnId, 'Alert');
                }
            });
        }
    };
    return AlertStrategyagGrid;
}(AlertStrategy_1.AlertStrategy));
exports.AlertStrategyagGrid = AlertStrategyagGrid;
