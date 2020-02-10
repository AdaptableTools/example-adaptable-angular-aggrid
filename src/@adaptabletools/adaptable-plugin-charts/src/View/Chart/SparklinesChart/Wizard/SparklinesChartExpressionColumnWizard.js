"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ExpressionBuilderPage_1 = require("@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage");
var UIHelper_1 = require("@adaptabletools/adaptable/src/View/UIHelper");
var SparklinesChartExpressionColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinesChartExpressionColumnWizard, _super);
    function SparklinesChartExpressionColumnWizard(props2) {
        var _this = _super.call(this, props2) || this;
        _this.props2 = props2;
        _this.Data = props2.Data;
        _this.state = UIHelper_1.UIHelper.getExpressionBuilderState(props2.Data.Expression);
        return _this;
    }
    SparklinesChartExpressionColumnWizard.prototype.Next = function () {
        this.Data.Expression = this.state.Expression;
    };
    SparklinesChartExpressionColumnWizard.prototype.canBack = function () {
        return true;
    };
    return SparklinesChartExpressionColumnWizard;
}(ExpressionBuilderPage_1.ExpressionBuilderPage));
exports.SparklinesChartExpressionColumnWizard = SparklinesChartExpressionColumnWizard;
