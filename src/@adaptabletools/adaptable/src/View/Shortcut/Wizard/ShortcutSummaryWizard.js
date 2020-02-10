"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ShortcutSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutSummaryWizard, _super);
    function ShortcutSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    ShortcutSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Key', Value: this.props.Data.ShortcutKey },
            { Key: 'Result', Value: this.props.Data.ShortcutResult },
            { Key: 'Operation', Value: this.props.Data.ShortcutOperation },
            { Key: 'Columns', Value: this.props.Data.ColumnType },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ShortcutStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    ShortcutSummaryWizard.prototype.canNext = function () {
        return true;
    };
    ShortcutSummaryWizard.prototype.canBack = function () {
        return true;
    };
    ShortcutSummaryWizard.prototype.Next = function () {
        //
    };
    ShortcutSummaryWizard.prototype.Back = function () {
        /* no implementation required   */
    };
    ShortcutSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ShortcutSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ShortcutSummaryWizard;
}(React.Component));
exports.ShortcutSummaryWizard = ShortcutSummaryWizard;
