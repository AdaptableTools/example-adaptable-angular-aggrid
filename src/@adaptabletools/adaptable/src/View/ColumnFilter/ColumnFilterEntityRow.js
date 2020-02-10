"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ButtonClear_1 = require("../Components/Buttons/ButtonClear");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var ButtonSave_1 = require("../Components/Buttons/ButtonSave");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var ColumnFilterEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterEntityRow, _super);
    function ColumnFilterEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnFilterEntityRow.prototype.render = function () {
        var _this = this;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.ColumnFilter.ColumnId, this.props.Columns) }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns) }));
        colItems[2].Content = (React.createElement(React.Fragment, null,
            React.createElement(ButtonSave_1.ButtonSave, { onClick: function () { return _this.props.onSaveColumnFilterasUserFilter(_this.props.ColumnFilter); }, tooltip: "Save as User Filter", disabled: this.props.ColumnFilter == null ||
                    ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilter.Filter.FilterExpressions), AccessLevel: this.props.AccessLevel }),
            React.createElement(ButtonClear_1.ButtonClear, { onClick: function () { return _this.props.onClear(_this.props.ColumnFilter); }, tooltip: "Clear Column Filter", disabled: this.props.ColumnFilter == null, AccessLevel: this.props.AccessLevel })));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems, key: this.props.ColumnFilter.Uuid });
    };
    return ColumnFilterEntityRow;
}(React.Component));
exports.ColumnFilterEntityRow = ColumnFilterEntityRow;
