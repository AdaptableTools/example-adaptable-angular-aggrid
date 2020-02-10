"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
var UIHelper_1 = require("../UIHelper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var SimpleButton_1 = require("../../components/SimpleButton");
var DropdownButton_1 = require("../../components/DropdownButton");
var Dropdown_1 = require("../../components/Dropdown");
var rebass_1 = require("rebass");
var FieldWrap_1 = require("../../components/FieldWrap");
var Input_1 = require("../../components/Input");
var Panel_1 = require("../../components/Panel");
var ExpressionBuilderRanges = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionBuilderRanges, _super);
    function ExpressionBuilderRanges() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionBuilderRanges.prototype.render = function () {
        var _this = this;
        var selectedColumnDataType = this.props.SelectedColumn.DataType;
        var addButton = (React.createElement(SimpleButton_1.default, { margin: 2, icon: "plus", variant: "text", onClick: function () { return _this.addRange(); } }, "Add Range"));
        var rangesElement = this.props.Ranges.map(function (range, index) {
            var optionLeafOperators = ExpressionHelper_1.default.GetOperatorsForDataType(selectedColumnDataType).map(function (operator) {
                return {
                    label: ExpressionHelper_1.default.OperatorToLongFriendlyString(operator, selectedColumnDataType),
                    value: operator,
                };
            });
            var rangeMenuItemsOperand1 = EnumExtensions_1.default.getNames(Enums_1.RangeOperandType).map(function (rangeOperand) {
                return {
                    label: rangeOperand,
                    onClick: function () { return _this.onRangeTypeChangedOperand1(index, rangeOperand); },
                };
            });
            var rangeMenuItemsOperand2 = EnumExtensions_1.default.getNames(Enums_1.RangeOperandType).map(function (rangeOperand) {
                return {
                    label: rangeOperand,
                    onClick: function () { return _this.onRangeTypeChangedOperand2(index, rangeOperand); },
                };
            });
            return (React.createElement(rebass_1.Box, { padding: 2, style: betweenDivStyle, key: index },
                React.createElement(FieldWrap_1.default, { marginBottom: 1 },
                    React.createElement(Dropdown_1.default, { placeholder: "Select Operator", style: { maxWidth: 'none' }, value: range.Operator, showClearButton: false, onChange: function (x) { return _this.onLeafExpressionOperatorChanged(index, x); }, options: optionLeafOperators }),
                    React.createElement(SimpleButton_1.default, { tooltip: "Delete", icon: "trash", variant: "text", onClick: function () { return _this.onRangeDelete(index); } })),
                React.createElement(rebass_1.Flex, { flexDirection: "row" },
                    React.createElement(DropdownButton_1.default, { marginRight: 1, variant: "raised", columns: ['label'], items: rangeMenuItemsOperand1 }, range.Operand1Type),
                    range.Operand1Type == Enums_1.RangeOperandType.Column ? (React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [range.Operand1], ColumnList: _this.props.Columns.filter(function (c) {
                            return c.DataType == selectedColumnDataType &&
                                c.ColumnId != _this.props.SelectedColumn.ColumnId;
                        }), onColumnChange: function (columns) { return _this.onColumnOperand1SelectedChanged(index, columns); }, SelectionMode: Enums_1.SelectionMode.Single })) : (_this.getOperand1FormControl(index, range))),
                range.Operator == Enums_1.LeafExpressionOperator.Between && (React.createElement(rebass_1.Flex, { flexDirection: "row", marginTop: 1 },
                    React.createElement(DropdownButton_1.default, { columns: ['label'], marginRight: 1, style: rangeOperatorStyle, variant: "raised", items: rangeMenuItemsOperand2 }, range.Operand2Type),
                    range.Operand2Type == Enums_1.RangeOperandType.Column ? (React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [range.Operand2], ColumnList: _this.props.Columns.filter(function (c) {
                            return c.DataType == selectedColumnDataType &&
                                c.ColumnId != _this.props.SelectedColumn.ColumnId;
                        }), onColumnChange: function (columns) { return _this.onColumnOperand2SelectedChanged(index, columns); }, SelectionMode: Enums_1.SelectionMode.Single })) : (_this.getOperand2FormControl(index, range))))));
        });
        return (React.createElement(Panel_1.default, { style: { flex: 1 }, bodyScroll: true },
            addButton,
            rangesElement));
    };
    ExpressionBuilderRanges.prototype.getOperand1FormControl = function (index, range) {
        var _this = this;
        return (React.createElement(Input_1.default, { style: operandStyle, value: String(range.Operand1), type: UIHelper_1.default.getDescriptionForDataType(this.props.SelectedColumn.DataType), placeholder: UIHelper_1.default.getPlaceHolderforDataType(this.props.SelectedColumn.DataType), onChange: function (e) { return _this.onOperand1Edit(index, e); } }));
    };
    ExpressionBuilderRanges.prototype.getOperand2FormControl = function (index, range) {
        var _this = this;
        return (React.createElement(Input_1.default, { style: operandStyle, value: String(range.Operand2), type: UIHelper_1.default.getDescriptionForDataType(this.props.SelectedColumn.DataType), placeholder: UIHelper_1.default.getPlaceHolderforDataType(this.props.SelectedColumn.DataType), onChange: function (e) { return _this.onOperand2Edit(index, e); } }));
    };
    ExpressionBuilderRanges.prototype.onRangeDelete = function (index) {
        var newCol = [].concat(this.props.Ranges);
        newCol.splice(index, 1);
        this.props.onRangesChange(newCol);
    };
    ExpressionBuilderRanges.prototype.addRange = function () {
        this.props.onRangesChange([].concat(this.props.Ranges, ObjectFactory_1.default.CreateEmptyRange()));
    };
    ExpressionBuilderRanges.prototype.onLeafExpressionOperatorChanged = function (index, Operator) {
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operator: Operator });
        this.props.onRangesChange(rangeCol);
    };
    ExpressionBuilderRanges.prototype.onRangeTypeChangedOperand1 = function (index, rangeOperandType) {
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand1Type: rangeOperandType });
        this.props.onRangesChange(rangeCol);
    };
    ExpressionBuilderRanges.prototype.onRangeTypeChangedOperand2 = function (index, rangeOperandType) {
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand2Type: rangeOperandType });
        this.props.onRangesChange(rangeCol);
    };
    ExpressionBuilderRanges.prototype.onOperand1Edit = function (index, x) {
        var e = x.target;
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand1: e.value });
        this.props.onRangesChange(rangeCol);
    };
    ExpressionBuilderRanges.prototype.onOperand2Edit = function (index, x) {
        var e = x.target;
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand2: e.value });
        this.props.onRangesChange(rangeCol);
    };
    ExpressionBuilderRanges.prototype.onColumnOperand1SelectedChanged = function (index, columns) {
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        var selectedColumn = columns.length > 0 ? columns[0].ColumnId : '';
        rangeCol[index] = Object.assign({}, range, { Operand1: selectedColumn });
        this.props.onRangesChange(rangeCol);
    };
    ExpressionBuilderRanges.prototype.onColumnOperand2SelectedChanged = function (index, columns) {
        var rangeCol = [].concat(this.props.Ranges);
        var range = this.props.Ranges[index];
        var selectedColumn = columns.length > 0 ? columns[0].ColumnId : '';
        rangeCol[index] = Object.assign({}, range, { Operand2: selectedColumn });
        this.props.onRangesChange(rangeCol);
    };
    return ExpressionBuilderRanges;
}(React.Component));
exports.ExpressionBuilderRanges = ExpressionBuilderRanges;
var divStyle = {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '350px',
};
var betweenDivStyle = {
    marginBottom: 'var(--ab-space-2)',
};
var operandStyle = {
    flex: 1,
};
var rangeOperatorStyle = {};
