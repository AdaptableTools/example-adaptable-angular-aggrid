"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UIHelper_1 = require("../../UIHelper");
var ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
var AlertExpressionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertExpressionWizard, _super);
    function AlertExpressionWizard(props2) {
        var _this = _super.call(this, props2) || this;
        _this.props2 = props2;
        _this.Data = props2.Data;
        _this.state = UIHelper_1.UIHelper.getExpressionBuilderState(props2.Data.Expression);
        return _this;
    }
    AlertExpressionWizard.prototype.Next = function () {
        this.Data.Expression = this.state.Expression;
    };
    return AlertExpressionWizard;
}(ExpressionBuilderPage_1.ExpressionBuilderPage));
exports.AlertExpressionWizard = AlertExpressionWizard;
