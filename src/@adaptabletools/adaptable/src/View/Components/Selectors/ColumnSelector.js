"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var Dropdown_1 = require("../../../components/Dropdown");
var ColumnSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnSelector, _super);
    function ColumnSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnSelector.prototype.render = function () {
        var _this = this;
        var sortedColumns = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.ColumnList, 'FriendlyName');
        var selectedColumnIds = this.props.SelectedColumnIds.filter(function (x) {
            return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(x);
        });
        var placeHolder = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.placeHolder)
            ? this.props.placeHolder.toString()
            : this.props.SelectionMode == Enums_1.SelectionMode.Single
                ? 'Select a column'
                : 'Select columns';
        var isEmptySelectedColumnIds = this.props.SelectedColumnIds.filter(function (x) { return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(x); }).length == 0;
        return (React.createElement("div", { style: tslib_1.__assign({ flex: 1 }, this.props.style) },
            React.createElement(Dropdown_1.default, { style: { maxWidth: 'none' }, showClearButton: this.props.showClearButton, placeholder: placeHolder, multiple: this.props.SelectionMode == Enums_1.SelectionMode.Multi, options: sortedColumns.map(function (c) { return ({
                    value: c.ColumnId,
                    label: c.FriendlyName,
                }); }), disabled: this.props.disabled, value: selectedColumnIds[0] || null, onChange: function (value) {
                    var selected = sortedColumns.filter(function (c) { return c.ColumnId === value; });
                    if (!selected.length) {
                        _this.onClearButton();
                    }
                    else {
                        _this.onColumnChange(selected, isEmptySelectedColumnIds);
                    }
                } })));
    };
    ColumnSelector.prototype.onClearButton = function () {
        this.props.onColumnChange([]);
    };
    ColumnSelector.prototype.onColumnChange = function (selected, isEmptySelection) {
        if (selected.length == 0 && isEmptySelection) {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        this.props.onColumnChange(selected);
    };
    return ColumnSelector;
}(React.Component));
exports.ColumnSelector = ColumnSelector;
