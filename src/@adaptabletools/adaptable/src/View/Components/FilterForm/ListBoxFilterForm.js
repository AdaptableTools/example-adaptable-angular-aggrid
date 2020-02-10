"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var UIHelper_1 = require("../../UIHelper");
var ListGroupItem_1 = require("../../../components/List/ListGroupItem");
var ListGroup_1 = require("../../../components/List/ListGroup");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../../components/Dropdown");
var Input_1 = require("../../../components/Input");
var CheckBox_1 = require("../../../components/CheckBox");
var join_1 = require("../../../components/utils/join");
var AdaptableFormControlTextClear_1 = require("../Forms/AdaptableFormControlTextClear");
var ddStyle = {
    minWidth: 'auto',
    flex: 1,
};
var ListBoxFilterForm = /** @class */ (function (_super) {
    tslib_1.__extends(ListBoxFilterForm, _super);
    function ListBoxFilterForm(props) {
        var _this = _super.call(this, props) || this;
        _this.renderItemForVendorStyle = function (props) {
            return React.createElement(CheckBox_1.default, tslib_1.__assign({}, props, { variant: "agGrid", fontSize: "12px", marginTop: 1 }));
        };
        _this.onRangeTypeChangedOperand1 = function (rangeOperandType) {
            var editedRange = {
                Operand1Type: rangeOperandType,
                Operand2Type: _this.state.UiSelectedRange.Operand2Type,
                Operator: _this.state.UiSelectedRange.Operator,
                Operand1: '',
                Operand2: _this.state.UiSelectedRange.Operand2,
            };
            _this.setState({ UiSelectedRange: editedRange }, function () {
                return _this.raiseOnChangeCustomExpression();
            });
        };
        _this.onRangeTypeChangedOperand2 = function (rangeOperandType) {
            var editedRange = {
                Operand1Type: _this.state.UiSelectedRange.Operand1Type,
                Operand2Type: rangeOperandType,
                Operator: _this.state.UiSelectedRange.Operator,
                Operand1: _this.state.UiSelectedRange.Operand1,
                Operand2: '',
            };
            _this.setState({ UiSelectedRange: editedRange }, function () {
                return _this.raiseOnChangeCustomExpression();
            });
        };
        _this.onColumnOperand1SelectedChanged = function (columnId) {
            var editedRange = {
                Operand1Type: _this.state.UiSelectedRange.Operand1Type,
                Operand2Type: _this.state.UiSelectedRange.Operand2Type,
                Operator: _this.state.UiSelectedRange.Operator,
                Operand1: columnId,
                Operand2: _this.state.UiSelectedRange.Operand2,
            };
            _this.setState({ UiSelectedRange: editedRange }, function () {
                return _this.raiseOnChangeCustomExpression();
            });
        };
        _this.onColumnOperand2SelectedChanged = function (columnId) {
            var editedRange = {
                Operand1Type: _this.state.UiSelectedRange.Operand1Type,
                Operand2Type: _this.state.UiSelectedRange.Operand2Type,
                Operator: _this.state.UiSelectedRange.Operator,
                Operand1: _this.state.UiSelectedRange.Operand1,
                Operand2: columnId,
            };
            _this.setState({ UiSelectedRange: editedRange }, function () {
                return _this.raiseOnChangeCustomExpression();
            });
        };
        _this.state = {
            UiSelectedColumnValues: _this.props.UiSelectedColumnValues,
            UiSelectedUserFilters: _this.props.UiSelectedUserFilters,
            UiSelectedRange: _this.props.UiSelectedRange,
            FilterValue: '',
            DistinctCriteriaPairValue: _this.props.DistinctCriteriaPairValue,
        };
        return _this;
    }
    ListBoxFilterForm.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        this.setState({
            UiSelectedColumnValues: nextProps.UiSelectedColumnValues,
            UiSelectedUserFilters: nextProps.UiSelectedUserFilters,
            UiSelectedRange: nextProps.UiSelectedRange,
            FilterValue: this.state.FilterValue,
        });
    };
    ListBoxFilterForm.prototype.render = function () {
        var _this = this;
        var userFiltersItemsElements = this.props.UserFilters.map(function (x, y) {
            var isActive;
            isActive = _this.state.UiSelectedUserFilters.indexOf(x.RawValue) >= 0;
            var display = x.DisplayValue;
            var value = x.RawValue;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.state.FilterValue) &&
                display.toLocaleLowerCase().indexOf(_this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            if (_this.props.useVendorStyle) {
                return _this.renderItemForVendorStyle({
                    key: 'userFilter' + y,
                    children: display,
                    checked: isActive,
                    style: userFilterItemStyle,
                    onChange: function () { return _this.onClickItemUserFilter(x); },
                });
            }
            return (React.createElement(ListGroupItem_1.default, { key: 'userFilter' + y, style: userFilterItemStyle, noZebra: _this.props.useVendorStyle, onClick: function () { return _this.onClickItemUserFilter(x); }, active: isActive, value: value }, display));
        });
        var columnValuesItemsElements = this.props.ColumnValuePairs.map(function (x, y) {
            var isActive;
            var columnValue;
            if (_this.props.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.DisplayValue) {
                isActive = _this.state.UiSelectedColumnValues.indexOf(x.DisplayValue) >= 0;
                columnValue = x.DisplayValue;
            }
            else {
                isActive = _this.state.UiSelectedColumnValues.indexOf(x.RawValue) >= 0;
                columnValue = x.RawValue;
            }
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(columnValue)) {
                return null;
            }
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.state.FilterValue) &&
                columnValue.toLocaleLowerCase().indexOf(_this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            if (_this.props.useVendorStyle) {
                return _this.renderItemForVendorStyle({
                    key: 'columnValue' + y,
                    children: columnValue,
                    checked: isActive,
                    onChange: function () { return _this.onClickItemColumnValue(x); },
                });
            }
            return (React.createElement(ListGroupItem_1.default, { noZebra: _this.props.useVendorStyle, key: 'columnValue' + y, onClick: function () { return _this.onClickItemColumnValue(x); }, active: isActive, value: columnValue }, columnValue));
        });
        var textClear = (React.createElement(AdaptableFormControlTextClear_1.AdaptableFormControlTextClear, { autoFocus: true, type: "text", placeholder: "Search Filters", value: this.state.FilterValue, OnTextChange: function (x) { return _this.onUpdateFilterSearch(x); } }));
        var rangeOperandOptions = ['Value', 'Column'];
        var rangeMenuItemsOperand1 = rangeOperandOptions.map(function (rangeOperand) {
            return {
                value: rangeOperand,
                label: rangeOperand,
            };
        });
        var rangeMenuItemsOperand2 = rangeOperandOptions.map(function (rangeOperand, index) {
            return {
                value: rangeOperand,
                label: rangeOperand,
            };
        });
        var rangeForm = (React.createElement(rebass_1.Flex, { flexDirection: "column" },
            React.createElement(Dropdown_1.default, { placeholder: "Select an Operator", style: ddStyle, value: this.state.UiSelectedRange.Operator, onChange: function (x) { return _this.onLeafExpressionOperatorChange(x); }, options: this.props.Operators.map(function (operator) {
                    return {
                        label: ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, _this.props.DataType),
                        value: operator.toString(),
                    };
                }) }),
            this.state.UiSelectedRange.Operator != null &&
                this.state.UiSelectedRange.Operator != Enums_1.LeafExpressionOperator.None && (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "row", marginTop: 2 },
                React.createElement(Dropdown_1.default, { placeholder: "testing", showEmptyItem: false, showClearButton: false, style: ddStyle, value: this.state.UiSelectedRange.Operand1Type, onChange: this.onRangeTypeChangedOperand1, options: rangeMenuItemsOperand1, marginRight: 2 }),
                this.getOperand1FormControl())),
            this.state.UiSelectedRange.Operator == Enums_1.LeafExpressionOperator.Between && (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "row", marginTop: 2 },
                React.createElement(Dropdown_1.default, { style: ddStyle, placeholder: "Please select", showClearButton: false, onChange: this.onRangeTypeChangedOperand2, options: rangeMenuItemsOperand2, value: this.state.UiSelectedRange.Operand2Type, marginRight: 2 }),
                this.getOperand2FormControl())),
            React.createElement(rebass_1.Box, { my: 1 },
                React.createElement(rebass_1.Box, { style: { background: 'var(--ab-color-text-on-defaultbackground)', height: 1 } }))));
        return (React.createElement("div", { className: join_1.default("ab-ListBoxFilterForm", this.props.useVendorStyle ? "ab-ListBoxFilterForm--vendor-style" : null) },
            rangeForm,
            React.createElement(rebass_1.Box, { mx: this.props.useVendorStyle ? 0 : '2px', marginBottom: 2 }, textClear),
            React.createElement(ListGroup_1.default, null,
                userFiltersItemsElements,
                columnValuesItemsElements)));
    };
    // Methods for getting the range
    ListBoxFilterForm.prototype.onLeafExpressionOperatorChange = function (value) {
        var _this = this;
        if (value === null || value === Enums_1.LeafExpressionOperator.None) {
            this.props.onCustomRangeExpressionChange(null);
            return;
        }
        var editedRange = {
            Operand1Type: this.state.UiSelectedRange.Operand1Type,
            Operand2Type: this.state.UiSelectedRange.Operand2Type,
            Operator: value,
            Operand1: this.state.UiSelectedRange.Operand1,
            Operand2: this.state.UiSelectedRange.Operand2,
        };
        this.setState({ UiSelectedRange: editedRange }, function () {
            return _this.raiseOnChangeCustomExpression();
        });
    };
    ListBoxFilterForm.prototype.getOperand1FormControl = function () {
        var _this = this;
        if (this.state.UiSelectedRange.Operand1Type == 'Column') {
            var availableColumns = this.props.Columns.filter(function (c) {
                return c != _this.props.CurrentColumn && c.DataType == _this.props.CurrentColumn.DataType;
            }).map(function (column, index) {
                return {
                    value: column.ColumnId,
                    label: column.FriendlyName,
                };
            });
            return (React.createElement(Dropdown_1.default, { style: ddStyle, placeholder: "Select", disabled: availableColumns.length == 0, options: availableColumns, value: this.state.UiSelectedRange.Operand1, onChange: this.onColumnOperand1SelectedChanged }));
        }
        else {
            return (React.createElement(Input_1.default, { style: { flex: 1, width: '100%' }, value: String(this.state.UiSelectedRange.Operand1), type: UIHelper_1.UIHelper.getDescriptionForDataType(this.props.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(this.props.DataType), onChange: function (e) { return _this.onOperand1Edit(e); } }));
        }
    };
    ListBoxFilterForm.prototype.getOperand2FormControl = function () {
        var _this = this;
        if (this.state.UiSelectedRange.Operand2Type == 'Column') {
            var availableColumns = this.props.Columns.filter(function () { return _this.props.CurrentColumn; }).map(function (column, index) {
                return {
                    value: column.ColumnId,
                    label: column.FriendlyName,
                };
            });
            return (React.createElement(Dropdown_1.default, { placeholder: "Select a column", style: ddStyle, disabled: availableColumns.length == 0, options: availableColumns, value: this.state.UiSelectedRange.Operand2, onChange: this.onColumnOperand2SelectedChanged }));
        }
        else {
            return (React.createElement(Input_1.default, { style: { flex: 1, width: '100%' }, value: String(this.state.UiSelectedRange.Operand2), type: UIHelper_1.UIHelper.getDescriptionForDataType(this.props.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(this.props.DataType), onChange: function (e) { return _this.onOperand2Edit(e); } }));
        }
    };
    ListBoxFilterForm.prototype.onOperand1Edit = function (event) {
        var _this = this;
        var e = event.target;
        var newRange = {
            Operand1Type: this.state.UiSelectedRange.Operand1Type,
            Operand2Type: this.state.UiSelectedRange.Operand2Type,
            Operator: this.state.UiSelectedRange.Operator,
            Operand1: e.value,
            Operand2: this.state.UiSelectedRange.Operand2,
        };
        this.setState({ UiSelectedRange: newRange }, function () {
            return _this.raiseOnChangeCustomExpression();
        });
    };
    ListBoxFilterForm.prototype.onOperand2Edit = function (event) {
        var _this = this;
        var e = event.target;
        var newRange = {
            Operand1Type: this.state.UiSelectedRange.Operand1Type,
            Operand2Type: this.state.UiSelectedRange.Operand2Type,
            Operator: this.state.UiSelectedRange.Operator,
            Operand1: this.state.UiSelectedRange.Operand1,
            Operand2: e.value,
        };
        this.setState({ UiSelectedRange: newRange }, function () {
            return _this.raiseOnChangeCustomExpression();
        });
    };
    // Methods for getting column values or filters
    ListBoxFilterForm.prototype.onUpdateFilterSearch = function (filterSearch) {
        this.setState({ FilterValue: filterSearch });
    };
    ListBoxFilterForm.prototype.raiseOnChangeColumnValues = function () {
        this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
    };
    ListBoxFilterForm.prototype.raiseOnChangeUserFilter = function () {
        this.props.onUserFilterSelectedChange(this.state.UiSelectedUserFilters);
    };
    ListBoxFilterForm.prototype.raiseOnChangeCustomExpression = function () {
        var isValidRange = true;
        if (this.state.UiSelectedRange.Operator != Enums_1.LeafExpressionOperator.None) {
            if (this.state.UiSelectedRange.Operator != Enums_1.LeafExpressionOperator.Between) {
                isValidRange = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1);
            }
            else {
                isValidRange =
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1) &&
                        StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand2);
            }
        }
        if (isValidRange) {
            this.props.onCustomRangeExpressionChange(this.state.UiSelectedRange);
        }
    };
    ListBoxFilterForm.prototype.onClickItemColumnValue = function (item) {
        var _this = this;
        var index;
        index = this.state.UiSelectedColumnValues.indexOf(item.DisplayValue);
        if (index >= 0) {
            var newArray = tslib_1.__spread(this.state.UiSelectedColumnValues);
            newArray.splice(index, 1);
            this.setState({ UiSelectedColumnValues: newArray }, function () {
                return _this.raiseOnChangeColumnValues();
            });
        }
        else {
            var newArray = tslib_1.__spread(this.state.UiSelectedColumnValues);
            newArray.push(item.DisplayValue);
            this.setState({ UiSelectedColumnValues: newArray }, function () {
                return _this.raiseOnChangeColumnValues();
            });
        }
    };
    ListBoxFilterForm.prototype.onClickItemUserFilter = function (item) {
        var _this = this;
        var index = this.state.UiSelectedUserFilters.indexOf(item.RawValue);
        if (index >= 0) {
            var newArray = tslib_1.__spread(this.state.UiSelectedUserFilters);
            newArray.splice(index, 1);
            this.setState({ UiSelectedUserFilters: newArray }, function () {
                return _this.raiseOnChangeUserFilter();
            });
        }
        else {
            var newArray = tslib_1.__spread(this.state.UiSelectedUserFilters);
            newArray.push(item.RawValue);
            this.setState({ UiSelectedUserFilters: newArray }, function () {
                return _this.raiseOnChangeUserFilter();
            });
        }
    };
    return ListBoxFilterForm;
}(React.Component));
exports.ListBoxFilterForm = ListBoxFilterForm;
var userFilterItemStyle = {
    fontStyle: 'italic',
};
