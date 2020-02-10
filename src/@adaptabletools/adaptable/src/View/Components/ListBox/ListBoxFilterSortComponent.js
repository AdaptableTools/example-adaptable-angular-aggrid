"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var SimpleButton_1 = require("../../../components/SimpleButton");
var Input_1 = require("../../../components/Input");
var FieldWrap_1 = require("../../../components/FieldWrap");
var ListBoxFilterSortComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ListBoxFilterSortComponent, _super);
    function ListBoxFilterSortComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListBoxFilterSortComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement(FieldWrap_1.default, { style: {
                borderTop: 0,
                borderRight: 0,
                borderLeft: 0,
                borderRadius: 0,
                padding: 2 /* here just for the focus box-shadow to be visible*/,
            } },
            React.createElement(Input_1.default, { value: this.props.FilterValue, placeholder: "Search", onChange: function (e) { return _this.handleChangeFilterValue(e); }, style: { width: 0 } }),
            React.createElement(SimpleButton_1.default, { disabled: !this.props.FilterValue, onClick: function () { return _this.clearFilter(); }, icon: "clear", variant: "text" }),
            this.props.SortOrder == Enums_1.SortOrder.Ascending ? (React.createElement(SimpleButton_1.default, { disabled: this.props.DisableSort, onClick: function () { return _this.props.sortColumnValues(); }, icon: "sort-asc", variant: "text" })) : (React.createElement(SimpleButton_1.default, { disabled: this.props.DisableSort, onClick: function () { return _this.props.sortColumnValues(); }, icon: "sort-desc", variant: "text" }))));
    };
    ListBoxFilterSortComponent.prototype.handleChangeFilterValue = function (x) {
        var e = x.target;
        this.props.handleChangeFilterValue(e.value);
    };
    ListBoxFilterSortComponent.prototype.clearFilter = function () {
        this.props.handleChangeFilterValue('');
    };
    return ListBoxFilterSortComponent;
}(React.Component));
exports.ListBoxFilterSortComponent = ListBoxFilterSortComponent;
