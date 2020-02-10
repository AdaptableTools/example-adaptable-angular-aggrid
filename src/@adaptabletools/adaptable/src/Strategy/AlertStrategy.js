"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
var SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
var AlertStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(AlertStrategy, _super);
    function AlertStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.AlertStrategyId, adaptable) || this;
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            _this.handleDataSourceChanged(dataChangedInfo);
        });
        return _this;
    }
    AlertStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.AlertStrategyFriendlyName,
            ComponentName: ScreenPopups.AlertPopup,
            Icon: StrategyConstants.AlertGlyph,
        });
    };
    AlertStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        if (menuInfo.Column && menuInfo.RowNode) {
            var currentAlerts = this.adaptable.api.internalApi
                .getAdaptableAlerts()
                .filter(function (a) { return a.DataChangedInfo && a.AlertDefinition.AlertProperties.HighlightCell; });
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(currentAlerts)) {
                var relevantAlert = currentAlerts.find(function (a) {
                    return a.AlertDefinition.ColumnId == menuInfo.Column.ColumnId &&
                        a.DataChangedInfo.RowNode == menuInfo.RowNode;
                });
                if (relevantAlert) {
                    menuItemShowPopup = this.createColumnMenuItemReduxAction('Clear Alert', StrategyConstants.AlertGlyph, SystemRedux.SystemAlertDelete(relevantAlert));
                }
            }
        }
        return menuItemShowPopup;
    };
    AlertStrategy.prototype.handleDataSourceChanged = function (dataChangedInfo) {
        var _this = this;
        var alertDefinitions = this.getAlertDefinitionsForDataChange(dataChangedInfo);
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
            var columns_1 = this.adaptable.api.gridApi.getColumns();
            alertDefinitions.forEach(function (alertDefintion) {
                // might be better to do a single alert with all the messages?
                _this.adaptable.api.alertApi.showAlert(ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(alertDefintion.ColumnId, columns_1), _this.adaptable.StrategyService.createAlertDescription(alertDefintion, columns_1), alertDefintion, dataChangedInfo);
            });
        }
    };
    AlertStrategy.prototype.getAlertDefinitionsForDataChange = function (dataChangedEvent) {
        var e_1, _a, e_2, _b;
        var relatedAlertDefinitions = this.adaptable.api.alertApi
            .getAlertDefinitions()
            .filter(function (v) { return v.ColumnId == dataChangedEvent.ColumnId; });
        var triggeredAlerts = [];
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(relatedAlertDefinitions)) {
            var columns = this.adaptable.api.gridApi.getColumns();
            // first check the rules which have expressions
            var expressionAlertDefinitions = relatedAlertDefinitions.filter(function (r) {
                return ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(r.Expression);
            });
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(expressionAlertDefinitions)) {
                try {
                    for (var expressionAlertDefinitions_1 = tslib_1.__values(expressionAlertDefinitions), expressionAlertDefinitions_1_1 = expressionAlertDefinitions_1.next(); !expressionAlertDefinitions_1_1.done; expressionAlertDefinitions_1_1 = expressionAlertDefinitions_1.next()) {
                        var expressionAlertDefinition = expressionAlertDefinitions_1_1.value;
                        var isSatisfiedExpression = ExpressionHelper_1.ExpressionHelper.checkForExpression(expressionAlertDefinition.Expression, dataChangedEvent.PrimaryKeyValue, columns, this.adaptable);
                        if (isSatisfiedExpression &&
                            this.isAlertTriggered(expressionAlertDefinition, dataChangedEvent, columns)) {
                            triggeredAlerts.push(expressionAlertDefinition);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (expressionAlertDefinitions_1_1 && !expressionAlertDefinitions_1_1.done && (_a = expressionAlertDefinitions_1.return)) _a.call(expressionAlertDefinitions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            // now check the rules without expressions//
            var noExpressionRules = relatedAlertDefinitions.filter(function (r) {
                return ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(r.Expression);
            });
            try {
                for (var noExpressionRules_1 = tslib_1.__values(noExpressionRules), noExpressionRules_1_1 = noExpressionRules_1.next(); !noExpressionRules_1_1.done; noExpressionRules_1_1 = noExpressionRules_1.next()) {
                    var noExpressionRule = noExpressionRules_1_1.value;
                    if (this.isAlertTriggered(noExpressionRule, dataChangedEvent, columns)) {
                        triggeredAlerts.push(noExpressionRule);
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
        return triggeredAlerts;
    };
    AlertStrategy.prototype.isAlertTriggered = function (alert, dataChangedEvent, columns) {
        // if its any change then alert triggers immediately
        if (alert.Range.Operator == Enums_1.LeafExpressionOperator.AnyChange) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        var column = ColumnHelper_1.ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns);
        var rangeEvaluation = ExpressionHelper_1.ExpressionHelper.GetRangeEvaluation(alert.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, column, this.adaptable, null);
        return ExpressionHelper_1.ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.adaptable);
    };
    return AlertStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.AlertStrategy = AlertStrategy;
