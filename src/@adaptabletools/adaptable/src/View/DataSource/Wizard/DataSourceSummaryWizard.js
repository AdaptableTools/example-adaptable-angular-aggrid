"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var DataSourceSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceSummaryWizard, _super);
    function DataSourceSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    DataSourceSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            { Key: 'Description', Value: this.props.Data.Description },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.DataSourceStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    DataSourceSummaryWizard.prototype.canNext = function () {
        return true;
    };
    DataSourceSummaryWizard.prototype.canBack = function () {
        return true;
    };
    DataSourceSummaryWizard.prototype.Next = function () {
        //
    };
    DataSourceSummaryWizard.prototype.Back = function () {
        /* no implementation required   */
    };
    DataSourceSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    DataSourceSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return DataSourceSummaryWizard;
}(React.Component));
exports.DataSourceSummaryWizard = DataSourceSummaryWizard;
