"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var Dropdown_1 = require("../../../components/Dropdown");
var FieldWrap_1 = require("../../../components/FieldWrap");
var DropdownButton_1 = require("../../../components/DropdownButton");
var Input_1 = require("../../../components/Input");
var NEW_OR_EXISTING;
(function (NEW_OR_EXISTING) {
    NEW_OR_EXISTING["existing"] = "Existing value";
    NEW_OR_EXISTING["new"] = "New value";
})(NEW_OR_EXISTING || (NEW_OR_EXISTING = {}));
var ColumnValueSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnValueSelector, _super);
    function ColumnValueSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            newOrExisting: NEW_OR_EXISTING.existing,
        };
        return _this;
    }
    ColumnValueSelector.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnValue)) {
            var typeahed = this.refs.typeahead;
            if (typeahed) {
                typeahed.getInstance().clear();
            }
        }
    };
    ColumnValueSelector.prototype.render = function () {
        var _this = this;
        var sortedColumnValues = [];
        var placeholderText = 'Select value';
        var allowNew = this.props.AllowNew != null ? this.props.AllowNew : true;
        if (allowNew) {
            // placeholderText += ' or enter free text';
        }
        var fieldWidth = 150;
        var dd = (React.createElement(Dropdown_1.default, { disabled: this.props.disabled, style: { maxWidth: 'inherit', width: fieldWidth, border: 'none' }, placeholder: placeholderText, showClearButton: false, value: this.props.SelectedColumnValue, onChange: function (selected) {
                _this.onSelectedValueChange([{ RawValue: selected }]);
            }, options: function () {
                if (_this.props.SelectedColumn != null &&
                    _this.props.Adaptable != null &&
                    _this.props.Adaptable.getColumnValueDisplayValuePairDistinctList != null) {
                    var columnDisplayValuePairs = _this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(_this.props.SelectedColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
                    sortedColumnValues = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnDisplayValuePairs, 'RawValue');
                    return sortedColumnValues.map(function (v) { return ({
                        label: v.DisplayValue,
                        value: v.RawValue,
                    }); });
                }
                return [];
            } }));
        var input = (React.createElement(Input_1.default, { type: "text", autoFocus: true, disabled: this.props.disabled, style: { width: fieldWidth }, value: this.props.SelectedColumnValue, onChange: function (e) {
                _this.onSelectedValueChange([
                    { customOption: true, DisplayValue: e.target.value },
                ]);
            } }));
        return (React.createElement(FieldWrap_1.default, { style: tslib_1.__assign(tslib_1.__assign({}, this.props.style), { overflow: 'visible' }) },
            this.state.newOrExisting === NEW_OR_EXISTING.existing ? dd : input,
            React.createElement(DropdownButton_1.default, tslib_1.__assign({ variant: "raised", tone: "neutral", columns: ['label'], style: {
                    color: 'var(--ab-cmp-dashboardpanel__fill)',
                    background: 'var(--ab-color-defaultbackground)',
                }, disabled: this.props.disabled, marginRight: 1, items: [
                    {
                        label: NEW_OR_EXISTING.existing,
                        onClick: function () {
                            _this.setState({
                                newOrExisting: NEW_OR_EXISTING.existing,
                            });
                            _this.onSelectedValueChange([]);
                        },
                    },
                    {
                        label: NEW_OR_EXISTING.new,
                        onClick: function () {
                            _this.setState({
                                newOrExisting: NEW_OR_EXISTING.new,
                            });
                            _this.onSelectedValueChange([]);
                        },
                    },
                ] }, this.props.dropdownButtonProps), this.state.newOrExisting === NEW_OR_EXISTING.existing
                ? this.props.existingLabel
                : this.props.newLabel)));
    };
    ColumnValueSelector.prototype.onSelectedValueChange = function (selected) {
        if (ArrayExtensions_1.ArrayExtensions.IsEmpty(selected) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue)) {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        if (ArrayExtensions_1.ArrayExtensions.IsEmpty(selected)) {
            this.props.onColumnValueChange('');
        }
        else {
            if (selected[0].customOption) {
                this.props.onColumnValueChange(selected[0].DisplayValue);
            }
            else {
                var pair = selected[0];
                this.props.onColumnValueChange(pair.RawValue);
            }
        }
    };
    ColumnValueSelector.defaultProps = {
        newLabel: 'New value',
        existingLabel: 'Existing value',
    };
    return ColumnValueSelector;
}(React.Component));
exports.ColumnValueSelector = ColumnValueSelector;
