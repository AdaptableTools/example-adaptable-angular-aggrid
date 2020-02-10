"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var rebass_1 = require("rebass");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ButtonPreviewDelete_1 = require("../Components/Buttons/ButtonPreviewDelete");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var ListGroupItem_1 = require("../../components/List/ListGroupItem");
var ListGroup_1 = require("../../components/List/ListGroup");
var SimpleButton_1 = require("../../components/SimpleButton");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ExpressionBuilderPreview = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionBuilderPreview, _super);
    function ExpressionBuilderPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionBuilderPreview.prototype.render = function () {
        var _this = this;
        var columnList = ExpressionHelper_1.default.GetColumnListFromExpression(this.props.Expression);
        var previewLists = columnList.map(function (columnId) {
            // First lets do the column values
            var columnValues = null;
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(_this.props.Expression.ColumnValueExpressions)) {
                columnValues = _this.props.Expression.ColumnValueExpressions.find(function (colValues) { return colValues.ColumnId == columnId; });
            }
            var columnValuesListgroupItems;
            if (columnValues) {
                columnValuesListgroupItems = columnValues.ColumnDisplayValues.map(function (y) {
                    return (React.createElement(ListGroupItem_1.default, { key: y, style: previewListBoxItemStyle, onClick: function () { return _this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.ColumnValue); } },
                        React.createElement("div", { style: { flex: 1 } }, y),
                        React.createElement(ButtonPreviewDelete_1.default, { as: "div", onClick: function (e) {
                                e.stopPropagation();
                                _this.props.DeleteColumnValue(columnId, y);
                            } })));
                });
            }
            // Next do the user filter expressions
            var columnUserFilterExpression = null;
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(_this.props.Expression.FilterExpressions)) {
                columnUserFilterExpression = _this.props.Expression.FilterExpressions.find(function (ne) { return ne.ColumnId == columnId; });
            }
            var columnUserFilterExpressionsListgroupItems;
            if (columnUserFilterExpression) {
                columnUserFilterExpressionsListgroupItems = columnUserFilterExpression.Filters.map(function (filter, index) {
                    return (React.createElement(ListGroupItem_1.default, { key: filter, style: previewListBoxItemStyle, onClick: function () { return _this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Filter); } },
                        React.createElement("div", { style: { flex: 1 } }, filter),
                        React.createElement(ButtonPreviewDelete_1.default, { as: "div", onClick: function (e) {
                                _this.props.DeleteUserFilterExpression(columnId, index);
                                e.stopPropagation();
                            }, disabled: false })));
                });
            }
            // Finally do the column ranges
            var columnRange = null;
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(_this.props.Expression.RangeExpressions)) {
                columnRange = _this.props.Expression.RangeExpressions.find(function (colValues) { return colValues.ColumnId == columnId; });
            }
            var columnRangesListgroupItems;
            /* Note: these used to say:  this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation();  - do we need that? */
            if (columnRange) {
                columnRangesListgroupItems = columnRange.Ranges.map(function (y, index) {
                    var operator = y.Operator;
                    if (operator == Enums_1.LeafExpressionOperator.Between) {
                        if (StringExtensions_1.StringExtensions.IsEmpty(y.Operand1) || StringExtensions_1.StringExtensions.IsEmpty(y.Operand2)) {
                            return (React.createElement(ListGroupItem_1.default, { key: columnId + index, style: tslib_1.__assign(tslib_1.__assign({}, previewListBoxItemStyle), dangerStyle), onClick: function () { return _this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.QueryRange); } },
                                React.createElement("div", { style: { flex: 1 } },
                                    ExpressionHelper_1.default.OperatorToShortFriendlyString(operator),
                                    ' ',
                                    _this.getOperand1Value(y),
                                    " And ",
                                    _this.getOperand2Value(y)),
                                React.createElement(ButtonPreviewDelete_1.default, { as: "div", onClick: function (e) {
                                        _this.props.DeleteRange(columnId, index);
                                        e.stopPropagation();
                                    } })));
                        }
                        else {
                            return (React.createElement(ListGroupItem_1.default, { key: columnId + index, style: previewListBoxItemStyle, onClick: function () { return _this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.QueryRange); } },
                                React.createElement("div", { style: { flex: 1 } },
                                    ExpressionHelper_1.default.OperatorToShortFriendlyString(operator),
                                    ' ',
                                    _this.getOperand1Value(y),
                                    " And ",
                                    _this.getOperand2Value(y)),
                                React.createElement(ButtonPreviewDelete_1.default, { as: "div", onClick: function (e) {
                                        _this.props.DeleteRange(columnId, index);
                                        e.stopPropagation();
                                    } })));
                        }
                    }
                    else {
                        if (StringExtensions_1.StringExtensions.IsEmpty(y.Operand1) || y.Operator == Enums_1.LeafExpressionOperator.None) {
                            return (React.createElement(ListGroupItem_1.default, { key: columnId + index, style: tslib_1.__assign(tslib_1.__assign({}, previewListBoxItemStyle), dangerStyle), onClick: function () { return _this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.QueryRange); } },
                                React.createElement("div", { style: { flex: 1 } },
                                    ExpressionHelper_1.default.OperatorToShortFriendlyString(operator),
                                    ' ',
                                    _this.getOperand1Value(y)),
                                React.createElement(ButtonPreviewDelete_1.default, { as: "div", onClick: function (e) {
                                        _this.props.DeleteRange(columnId, index);
                                        e.stopPropagation();
                                    } })));
                        }
                        else {
                            return (React.createElement(ListGroupItem_1.default, { key: columnId + index, style: previewListBoxItemStyle, onClick: function () { return _this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.QueryRange); } },
                                React.createElement("div", { style: { flex: 1 } },
                                    ExpressionHelper_1.default.OperatorToShortFriendlyString(operator),
                                    ' ',
                                    _this.getOperand1Value(y)),
                                React.createElement(ButtonPreviewDelete_1.default, { as: "div", onClick: function (e) {
                                        _this.props.DeleteRange(columnId, index);
                                        e.stopPropagation();
                                    } })));
                        }
                    }
                });
            }
            var columnFriendlyName = ColumnHelper_1.default.getFriendlyNameFromColumnId(columnId, _this.props.ColumnsList);
            return (React.createElement("div", { key: columnId + '--div', className: _this.props.ReadOnlyMode ? GeneralConstants.READ_ONLY_STYLE : '', style: { marginBottom: 'var(--ab-space-2)' } },
                React.createElement(rebass_1.Flex, { flexDirection: "row" },
                    React.createElement(SimpleButton_1.default, { style: { flex: 1 }, tone: "accent", variant: "raised", key: columnId + 'header', onClick: function () { return _this.onColumnHeaderSelected(columnId); } },
                        React.createElement("u", null, columnFriendlyName)),
                    React.createElement(SimpleButton_1.default, { style: { marginLeft: 'var(--ab-space-2)' }, key: columnId + 'headerx', onClick: function () { return _this.props.DeleteAllColumnExpression(columnId); }, icon: "trash", variant: "text" })),
                React.createElement(ListGroup_1.default, { style: { marginTop: ' var(--ab-space-2)' } },
                    columnValuesListgroupItems,
                    columnUserFilterExpressionsListgroupItems,
                    columnRangesListgroupItems)));
        });
        return (React.createElement(rebass_1.Flex, { style: { flex: '1 0 0%' }, flexDirection: "column" },
            this.props.ShowPanel && (React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", style: { flex: 1 }, bodyProps: {
                    padding: 0,
                    paddingTop: 2,
                }, button: React.createElement(SimpleButton_1.default, { style: { visibility: 'hidden' }, variant: "text" }, '\u00a0'), headerText: "Preview Results" },
                React.createElement("div", { style: { overflowY: 'auto', overflowX: 'hidden' } }, previewLists))),
            !this.props.ShowPanel && React.createElement("div", null, previewLists)));
    };
    ExpressionBuilderPreview.prototype.onColumnHeaderSelected = function (columnId) {
        var columnValues = this.props.Expression.ColumnValueExpressions.find(function (colValues) { return colValues.ColumnId == columnId; });
        if (columnValues) {
            this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.ColumnValue);
            return;
        }
        var columnUserFilterExpressions = this.props.Expression.FilterExpressions.find(function (ne) { return ne.ColumnId == columnId; });
        if (columnUserFilterExpressions) {
            this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Filter);
            return;
        }
        this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.QueryRange);
    };
    ExpressionBuilderPreview.prototype.ensureSelectedColumnVisible = function (columnId) {
        var itemComponent = this.refs[columnId];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent);
            domNode.scrollIntoView(true);
        }
    };
    ExpressionBuilderPreview.prototype.getOperand1Value = function (range) {
        if (range.Operand1Type == Enums_1.RangeOperandType.Column) {
            var col = this.props.ColumnsList.find(function (c) { return c.ColumnId == range.Operand1; });
            return col ? '[' + col.FriendlyName + ']' : '';
        }
        else {
            return range.Operand1;
        }
    };
    ExpressionBuilderPreview.prototype.getOperand2Value = function (range) {
        if (range.Operand2Type == Enums_1.RangeOperandType.Column) {
            var col = this.props.ColumnsList.find(function (c) { return c.ColumnId == range.Operand2; });
            return col ? '[' + col.FriendlyName + ']' : '';
        }
        else {
            return range.Operand2;
        }
    };
    return ExpressionBuilderPreview;
}(React.Component));
exports.ExpressionBuilderPreview = ExpressionBuilderPreview;
var previewListBoxItemStyle = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
};
var dangerStyle = {
    background: 'var(--ab-color-errorlight)',
    color: 'var(--ab-color-error)',
};
