"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
var UIHelper_1 = require("../../UIHelper");
var UserFilterExpressionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterExpressionWizard, _super);
    function UserFilterExpressionWizard(props2) {
        var _this = _super.call(this, props2) || this;
        _this.props2 = props2;
        _this.Data = props2.Data;
        _this.state = UIHelper_1.UIHelper.getExpressionBuilderStateWithColumn(props2.Data.Expression, props2.Data.ColumnId);
        return _this;
    }
    UserFilterExpressionWizard.prototype.Next = function () {
        this.Data.Expression = this.state.Expression;
    };
    return UserFilterExpressionWizard;
}(ExpressionBuilderPage_1.ExpressionBuilderPage));
exports.UserFilterExpressionWizard = UserFilterExpressionWizard;
