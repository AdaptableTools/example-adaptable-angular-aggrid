"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ = require("lodash");
var AdaptableStrategyBase_1 = require("@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ScreenPopups = require("@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var ExpressionHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ChartStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ChartStrategy, _super);
    function ChartStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.ChartStrategyId, adaptable) || this;
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            setTimeout(function () {
                _this.handleDataSourceChanged(dataChangedInfo);
            }, 500);
        });
        _this.adaptable._on('SearchApplied', function () {
            _this.handleSearchChanged();
        });
        var refreshRate = _this.GetChartState().RefreshRate * 1000;
        _this.throttleSetChartData = _.throttle(_this.setChartData, refreshRate);
        return _this;
    }
    ChartStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ChartStrategyFriendlyName,
            ComponentName: ScreenPopups.ChartPopup,
            Icon: StrategyConstants.ChartGlyph,
        });
    };
    ChartStrategy.prototype.InitState = function () {
        var _this = this;
        var isChartRelatedStateChanged = false;
        var displayChartAtStartUp = false;
        if (this.ChartState != this.GetChartState()) {
            if (this.ChartState == null) {
                isChartRelatedStateChanged = true;
                // if user has set display at startup to be true and there is a current chart then show it
                if (this.adaptable.adaptableOptions.chartOptions.displayOnStartUp &&
                    StringExtensions_1.default.IsNotNullOrEmpty(this.GetChartState().CurrentChartName)) {
                    displayChartAtStartUp = true;
                }
            }
            else {
                var chartStateDefinition = this.GetCurrentChartDefinition();
                var storeStateDefinition = this.GetChartState().ChartDefinitions.find(function (c) { return c.Name == _this.GetChartState().CurrentChartName; });
                if (this.doChartDefinitionChangesRequireDataUpdate(chartStateDefinition, storeStateDefinition)) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.ChartState = this.GetChartState();
        }
        if (this.SystemState != this.GetSystemState()) {
            if (this.SystemState == null) {
                isChartRelatedStateChanged = true; // correct? seems not but not urgent to fix
            }
            else {
                if (this.SystemState.ChartVisibility != this.GetSystemState().ChartVisibility) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.SystemState = this.GetSystemState();
        }
        if (isChartRelatedStateChanged) {
            if (StringExtensions_1.default.IsNotNullOrEmpty(this.ChartState.CurrentChartName) &&
                this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                this.setChartData();
            }
            else {
                this.clearChartData();
            }
            if (this.ChartState.CurrentChartName == null &&
                this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                this.adaptable.api.internalApi.setChartVisibility(ChartEnums_1.ChartVisibility.Hidden);
            }
            if (displayChartAtStartUp) {
                this.adaptable.api.internalApi.setChartVisibility(ChartEnums_1.ChartVisibility.Maximised);
                this.setChartData();
            }
        }
    };
    ChartStrategy.prototype.doChartDefinitionChangesRequireDataUpdate = function (cd1, cd2) {
        if (cd1 == null && cd2 !== null) {
            return true;
        }
        if (cd2 == null && cd1 !== null) {
            return true;
        }
        if (cd1 == null && cd2 == null) {
            return false;
        }
        if (cd1.VisibleRowsOnly != cd2.VisibleRowsOnly) {
            return true;
        }
        if (cd1.ChartType == ChartEnums_1.ChartType.CategoryChart) {
            return this.doCategoryChartDefinitionChangesRequireDataUpdate(cd1, cd2);
        }
        if (cd1.ChartType == ChartEnums_1.ChartType.PieChart) {
            return this.doPieChartDefinitionChangesRequireDataUpdate(cd1, cd2);
        }
        if (cd1.ChartType == ChartEnums_1.ChartType.SparklinesChart) {
            return this.doSparklinesChartDefinitionChangesRequireDataUpdate(cd1, cd2);
        }
    };
    ChartStrategy.prototype.doCategoryChartDefinitionChangesRequireDataUpdate = function (cd1, cd2) {
        if (cd1.XAxisColumnId != cd2.XAxisColumnId) {
            return true;
        }
        if (ArrayExtensions_1.ArrayExtensions.areArraysNotEqual(cd1.YAxisColumnIds, cd2.YAxisColumnIds)) {
            return true;
        }
        if (cd1.YAxisTotal != cd2.YAxisTotal) {
            return true;
        }
        if (ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cd1.XAxisExpression, this.GetColumnState()) !=
            ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cd2.XAxisExpression, this.GetColumnState())) {
            return true;
        }
        return false;
    };
    ChartStrategy.prototype.doPieChartDefinitionChangesRequireDataUpdate = function (cd1, cd2) {
        if (cd1.PrimaryColumnId != cd2.PrimaryColumnId) {
            return true;
        }
        if (cd1.SecondaryColumnId != cd2.SecondaryColumnId) {
            return true;
        }
        if (cd1.SecondaryColumnOperation != cd2.SecondaryColumnOperation) {
            return true;
        }
        return false;
    };
    ChartStrategy.prototype.doSparklinesChartDefinitionChangesRequireDataUpdate = function (cd1, cd2) {
        if (cd1.ColumnId != cd2.ColumnId) {
            return true;
        }
        return false;
    };
    ChartStrategy.prototype.handleSearchChanged = function () {
        // weÎ always redraw a chart if its visible when a search has been applied as its relatively rare...
        // might need to rethink if that is too OTT
        if (this.isCurrentChartVisibiilityMaximised()) {
            var currentChartDefinition = this.GetCurrentChartDefinition();
            if (currentChartDefinition != null && currentChartDefinition.VisibleRowsOnly) {
                this.throttleSetChartData();
            }
        }
    };
    ChartStrategy.prototype.handleDataSourceChanged = function (dataChangedInfo) {
        if (this.isCurrentChartVisibiilityMaximised()) {
            var columnChangedId = dataChangedInfo.ColumnId;
            if (StringExtensions_1.default.IsNotNullOrEmpty(columnChangedId)) {
                var currentChartDefinition = this.GetCurrentChartDefinition();
                if (this.isChartDataChanged(currentChartDefinition, columnChangedId)) {
                    this.throttleSetChartData();
                }
            }
        }
    };
    ChartStrategy.prototype.isCurrentChartVisibiilityMaximised = function () {
        return (this.adaptable.isInitialised &&
            this.SystemState != null &&
            this.ChartState != null &&
            this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised &&
            StringExtensions_1.default.IsNotNullOrEmpty(this.ChartState.CurrentChartName));
    };
    ChartStrategy.prototype.isChartDataChanged = function (currentChartDefinition, columnChangedId) {
        if (currentChartDefinition == null) {
            return false;
        }
        switch (currentChartDefinition.ChartType) {
            case ChartEnums_1.ChartType.CategoryChart:
                var categoryChartDefinition = currentChartDefinition;
                return (ArrayExtensions_1.ArrayExtensions.ContainsItem(categoryChartDefinition.YAxisColumnIds, columnChangedId) ||
                    categoryChartDefinition.XAxisColumnId == columnChangedId);
            case ChartEnums_1.ChartType.PieChart:
                var pieChartDefinition = currentChartDefinition;
                return (pieChartDefinition.PrimaryColumnId == columnChangedId ||
                    pieChartDefinition.SecondaryColumnId == columnChangedId);
            case ChartEnums_1.ChartType.SparklinesChart:
                var sparklinesChartDefinition = currentChartDefinition;
                return sparklinesChartDefinition.ColumnId == columnChangedId;
        }
    };
    ChartStrategy.prototype.setChartData = function () {
        var chartDefinition = this.GetCurrentChartDefinition();
        if (chartDefinition) {
            var chartData = void 0;
            if (chartDefinition.ChartType == ChartEnums_1.ChartType.CategoryChart) {
                chartData = this.adaptable.ChartService.BuildCategoryChartData(chartDefinition, this.GetColumnState());
            }
            else if (chartDefinition.ChartType == ChartEnums_1.ChartType.PieChart) {
                chartData = this.adaptable.ChartService.BuildPieChartData(chartDefinition);
            }
            else if (chartDefinition.ChartType == ChartEnums_1.ChartType.SparklinesChart) {
                chartData = this.adaptable.ChartService.BuildSparklinesChartData(chartDefinition, this.GetColumnState());
            }
            this.adaptable.api.internalApi.setChartData(chartData);
        }
    };
    ChartStrategy.prototype.clearChartData = function () {
        if (this.GetSystemState().ChartData != null) {
            this.adaptable.api.internalApi.setChartData(null);
        }
    };
    ChartStrategy.prototype.GetSystemState = function () {
        return this.adaptable.api.internalApi.getSystemState();
    };
    ChartStrategy.prototype.GetChartState = function () {
        return this.adaptable.api.chartApi.getChartState();
    };
    ChartStrategy.prototype.GetColumnState = function () {
        return this.adaptable.api.gridApi.getColumns();
    };
    ChartStrategy.prototype.GetCurrentChartDefinition = function () {
        var _this = this;
        return this.ChartState.ChartDefinitions.find(function (c) { return c.Name == _this.ChartState.CurrentChartName; });
    };
    return ChartStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ChartStrategy = ChartStrategy;
