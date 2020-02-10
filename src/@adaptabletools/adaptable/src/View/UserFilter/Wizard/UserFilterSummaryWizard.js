"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var UserFilterSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterSummaryWizard, _super);
    function UserFilterSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    UserFilterSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            {
                Key: 'Query',
                Value: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns),
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.UserFilterStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    UserFilterSummaryWizard.prototype.canNext = function () {
        return true;
    };
    UserFilterSummaryWizard.prototype.canBack = function () {
        return true;
    };
    UserFilterSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    UserFilterSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    UserFilterSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    UserFilterSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return UserFilterSummaryWizard;
}(React.Component));
exports.UserFilterSummaryWizard = UserFilterSummaryWizard;
