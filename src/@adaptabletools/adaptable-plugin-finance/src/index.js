"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@adaptabletools/adaptable/types");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var package_json_1 = require("../package.json");
var version_1 = require("@adaptabletools/adaptable/version");
if (package_json_1.version !== version_1.default) {
    console.warn("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!! \"@adaptabletools/adaptable-plugin-finance\" (v @" + package_json_1.version + ") and \"@adaptabletools/adaptable\" (v @" + version_1.default + ") have different versions - they should have the exact same version.\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
}
var sumNumberArray = function (numericValues) {
    if (numericValues.length) {
        var sum = numericValues.reduce(function (a, b) {
            return a + b;
        });
        return sum;
    }
    else {
        return 0;
    }
};
var calculateOnly = function (_a) {
    var allValues = _a.allValues, distinctCount = _a.distinctCount;
    return distinctCount == 1 ? allValues[0] : '';
};
var calculateVwap = function (_a) {
    var numericValues = _a.numericValues, numericColumns = _a.numericColumns;
    if (numericColumns.length == 2) {
        return '';
    }
    var firstColValues = [];
    var secondColComputedValues = [];
    for (var i = 0; i < numericValues.length; i++) {
        if (i % 2 === 0) {
            // index is odd
            firstColValues.push(numericValues[i]);
        }
        else {
            var newValue = numericValues[i] * numericValues[i - 1];
            secondColComputedValues.push(newValue);
        }
    }
    var firstColTotal = sumNumberArray(firstColValues);
    var secondColTotal = sumNumberArray(secondColComputedValues);
    var result = Helper_1.Helper.RoundNumberTo4dp(secondColTotal / firstColTotal);
    return result;
};
var defaultOptions = {};
var FinancePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(FinancePlugin, _super);
    function FinancePlugin(options) {
        var _this = _super.call(this, options) || this;
        _this.pluginId = 'finance';
        _this.options = tslib_1.__assign(tslib_1.__assign({}, defaultOptions), options);
        return _this;
    }
    FinancePlugin.prototype.afterInitStore = function (adaptable) {
        var pluginData = {
            OptionalSummaryOperations: [
                {
                    OperationName: 'VWAP',
                    OperationFunction: calculateVwap,
                },
                {
                    OperationName: 'Only',
                    OperationFunction: calculateOnly,
                },
            ],
        };
        adaptable.api.pluginsApi.registerPlugin(this.pluginId, pluginData);
        adaptable.api.cellSummaryApi.addCellSummaryOperationDefinitions(pluginData.OptionalSummaryOperations);
    };
    return FinancePlugin;
}(types_1.AdaptablePlugin));
exports.default = (function (options) { return new FinancePlugin(options); });
