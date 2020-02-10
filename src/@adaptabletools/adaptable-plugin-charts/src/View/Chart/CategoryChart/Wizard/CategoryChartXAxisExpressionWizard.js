"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ExpressionBuilderPage_1 = require("@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage");
var UIHelper_1 = require("@adaptabletools/adaptable/src/View/UIHelper");
var CategoryChartXAxisExpressionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryChartXAxisExpressionWizard, _super);
    function CategoryChartXAxisExpressionWizard(props2) {
        var _this = _super.call(this, props2) || this;
        _this.props2 = props2;
        _this.Data = props2.Data;
        _this.state = UIHelper_1.UIHelper.getExpressionBuilderStateWithColumn(props2.Data.XAxisExpression, props2.Data.XAxisColumnId);
        return _this;
    }
    CategoryChartXAxisExpressionWizard.prototype.Next = function () {
        this.Data.XAxisExpression = this.state.Expression;
    };
    CategoryChartXAxisExpressionWizard.prototype.canBack = function () {
        return true;
    };
    return CategoryChartXAxisExpressionWizard;
}(ExpressionBuilderPage_1.ExpressionBuilderPage));
exports.CategoryChartXAxisExpressionWizard = CategoryChartXAxisExpressionWizard;
