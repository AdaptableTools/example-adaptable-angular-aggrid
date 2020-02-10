"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SingleListBox_1 = require("../Components/ListBox/SingleListBox");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ExpressionBuilderColumnValues = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionBuilderColumnValues, _super);
    function ExpressionBuilderColumnValues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionBuilderColumnValues.prototype.render = function () {
        var _this = this;
        return (React.createElement(SingleListBox_1.SingleListBox, { Values: this.props.ColumnValues, UiSelectedValues: this.props.SelectedValues, DisplayMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], ValueMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], SortMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue], onSelectedChange: function (list) { return _this.props.onColumnValuesChange(list); }, SelectionMode: Enums_1.SelectionMode.Multi, listStyle: {
                maxHeight: '50vh',
            } }));
    };
    return ExpressionBuilderColumnValues;
}(React.Component));
exports.ExpressionBuilderColumnValues = ExpressionBuilderColumnValues;
