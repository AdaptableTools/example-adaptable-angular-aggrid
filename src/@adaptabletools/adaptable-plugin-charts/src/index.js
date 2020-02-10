"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@adaptabletools/adaptable/types");
var ChartStrategy_1 = require("./strategies/ChartStrategy");
var SparklineColumnStrategy_1 = require("./strategies/SparklineColumnStrategy");
var SparklineStrategy_1 = require("./strategies/SparklineStrategy");
var PieChartStrategy_1 = require("./strategies/PieChartStrategy");
var StrategyConstants_1 = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var AdaptableViewFactory_1 = require("@adaptabletools/adaptable/src/View/AdaptableViewFactory");
var ChartToolPanel_1 = require("./View/Chart/ChartToolPanel");
var ChartToolbarControl_1 = require("./View/Chart/ChartToolbarControl");
// import {
//   PieChartPopup,
//   ChartPopup,
//   ChartDisplayPopup,
//   SparklineColumnPopup,
//   ViewAsSparklinesPopup,
// } from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
var PieChartPopup_1 = require("./View/PieChart/PieChartPopup");
var ChartPopup_1 = require("./View/Chart/ChartPopup");
var ChartDisplayPopup_1 = require("./View/Chart/ChartDisplayPopup");
var SparklineColumnPopup_1 = require("./View/Sparkline/SparklineColumnPopup");
var ViewAsSparklinePopup_1 = require("./View/Sparkline/ViewAsSparklinePopup");
var SparklineColumnRenderer_1 = require("./View/Sparkline/SparklineColumnRenderer");
var package_json_1 = require("../package.json");
var version_1 = require("@adaptabletools/adaptable/version");
if (package_json_1.version !== version_1.default) {
    console.warn("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!! \"@adaptabletools/adaptable-plugin-charts\" (v @" + package_json_1.version + ") and \"@adaptabletools/adaptable\" (v @" + version_1.default + ") have different versions - they should have the exact same version.\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
}
var defaultOptions = {};
var ChartsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ChartsPlugin, _super);
    function ChartsPlugin(options) {
        var _this = _super.call(this, options) || this;
        _this.pluginId = 'charts';
        _this.options = tslib_1.__assign(tslib_1.__assign({}, defaultOptions), options);
        _this.registerValue('sparklineColumnRenderer', function (sparklineColumn) {
            return SparklineColumnRenderer_1.getSparklineRendererForColumn(sparklineColumn);
        });
        return _this;
    }
    ChartsPlugin.prototype.afterInitStrategies = function (adaptable, strategies) {
        strategies.set(StrategyConstants_1.ChartStrategyId, new ChartStrategy_1.ChartStrategy(adaptable));
        strategies.set(StrategyConstants_1.SparklineColumnStrategyId, new SparklineColumnStrategy_1.SparklineColumnStrategy(adaptable));
        strategies.set(StrategyConstants_1.SparklineStrategyId, new SparklineStrategy_1.SparklineStrategy(adaptable));
        strategies.set(StrategyConstants_1.PieChartStrategyId, new PieChartStrategy_1.PieChartStrategy(adaptable));
        AdaptableViewFactory_1.AdaptableViewFactory.PieChartPopup = PieChartPopup_1.PieChartPopup;
        AdaptableViewFactory_1.AdaptableViewFactory.ChartPopup = ChartPopup_1.ChartPopup;
        AdaptableViewFactory_1.AdaptableViewFactory.ChartDisplayPopup = ChartDisplayPopup_1.ChartDisplayPopup;
        AdaptableViewFactory_1.AdaptableViewFactory.SparklineColumnPopup = SparklineColumnPopup_1.SparklineColumnPopup;
        AdaptableViewFactory_1.AdaptableViewFactory.ViewAsSparklinesPopup = ViewAsSparklinePopup_1.ViewAsSparklinesPopup;
        AdaptableViewFactory_1.AdaptableDashboardFactory.set(StrategyConstants_1.ChartStrategyId, ChartToolbarControl_1.ChartToolbarControl);
        AdaptableViewFactory_1.AdaptableToolPanelFactory.set(StrategyConstants_1.ChartStrategyId, ChartToolPanel_1.ChartToolPanel);
    };
    ChartsPlugin.prototype.afterInitApi = function (adaptable) {
        // redraw any sparklines if that has been changed
        adaptable._on('ColumnResized', function (colId) {
            var isSparklineColumn = adaptable.api.sparklineColumnApi.isSparklineColumn(colId);
            if (isSparklineColumn) {
                // this is a bit brute force as its redrawing the whole grid but its quite a rare use case so probably ok
                adaptable.redraw();
            }
        });
    };
    ChartsPlugin.prototype.onAdaptableReady = function (adaptable) { };
    return ChartsPlugin;
}(types_1.AdaptablePlugin));
exports.default = (function (options) { return new ChartsPlugin(options); });
