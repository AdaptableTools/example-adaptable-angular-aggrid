"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
var UIHelper_1 = require("../../UIHelper");
var ConditionalStyleExpressionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleExpressionWizard, _super);
    function ConditionalStyleExpressionWizard(props2) {
        var _this = _super.call(this, props2) || this;
        _this.props2 = props2;
        _this.Data = props2.Data;
        _this.state = UIHelper_1.UIHelper.getExpressionBuilderState(props2.Data.Expression);
        return _this;
    }
    ConditionalStyleExpressionWizard.prototype.Next = function () {
        this.Data.Expression = this.state.Expression;
    };
    ConditionalStyleExpressionWizard.prototype.Back = function () {
        //todo
    };
    return ConditionalStyleExpressionWizard;
}(ExpressionBuilderPage_1.ExpressionBuilderPage));
exports.ConditionalStyleExpressionWizard = ConditionalStyleExpressionWizard;
