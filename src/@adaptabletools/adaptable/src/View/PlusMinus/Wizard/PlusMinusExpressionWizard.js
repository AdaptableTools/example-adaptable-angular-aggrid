"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
var UIHelper_1 = require("../../UIHelper");
var PlusMinusExpressionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusExpressionWizard, _super);
    function PlusMinusExpressionWizard(props2) {
        var _this = _super.call(this, props2) || this;
        _this.props2 = props2;
        _this.Data = props2.Data;
        _this.state = UIHelper_1.UIHelper.getExpressionBuilderState(props2.Data.Expression);
        return _this;
    }
    PlusMinusExpressionWizard.prototype.Next = function () {
        this.Data.Expression = this.state.Expression;
    };
    PlusMinusExpressionWizard.prototype.Back = function () {
        //todo
    };
    return PlusMinusExpressionWizard;
}(ExpressionBuilderPage_1.ExpressionBuilderPage));
exports.PlusMinusExpressionWizard = PlusMinusExpressionWizard;
