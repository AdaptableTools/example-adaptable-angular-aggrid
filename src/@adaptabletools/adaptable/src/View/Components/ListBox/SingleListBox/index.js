"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var Enums_1 = require("../../../../PredefinedConfig/Common/Enums");
var ListBoxFilterSortComponent_1 = require("../ListBoxFilterSortComponent");
var StringExtensions_1 = require("../../../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../../../Utilities/Extensions/ArrayExtensions");
var ListGroupItem_1 = require("../../../../components/List/ListGroupItem");
var ListGroup_1 = require("../../../../components/List/ListGroup");
var SelectableList_1 = require("../../../../components/SelectableList");
var Helper_1 = require("../../../../Utilities/Helpers/Helper");
var SingleListBox = /** @class */ (function (_super) {
    tslib_1.__extends(SingleListBox, _super);
    function SingleListBox(props) {
        var _this = _super.call(this, props) || this;
        _this.getItemId = function (index) {
            var item = _this.state.Values[index];
            if (!item) {
                return -1;
            }
            var value = _this.props.ValueMember ? item[_this.props.ValueMember] : item;
            return value;
        };
        _this.onSelectionChange = function (selection) {
            var UiSelectedValues = Object.keys(selection);
            _this.setState({ UiSelectedValues: UiSelectedValues }, function () { return _this.raiseOnChange(); });
        };
        _this.state = {
            Values: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, _this.props.Values, _this.props.SortMember),
            UiSelectedValues: _this.props.UiSelectedValues,
            FilterValue: '',
            SortOrder: Enums_1.SortOrder.Ascending,
        };
        return _this;
    }
    SingleListBox.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        this.setState({
            Values: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(this.state.SortOrder, nextProps.Values, this.props.SortMember),
            UiSelectedValues: nextProps.UiSelectedValues,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder,
        });
    };
    SingleListBox.prototype.render = function () {
        var _this = this;
        var itemsElements = this.state.Values.map(function (x, index) {
            var isActive;
            if (_this.props.ValueMember) {
                isActive = _this.state.UiSelectedValues.indexOf(x[_this.props.ValueMember]) >= 0;
            }
            else {
                isActive = _this.state.UiSelectedValues.indexOf(x) >= 0;
            }
            var display = _this.props.DisplayMember ? x[_this.props.DisplayMember] : x;
            // possible that a column will cellrendeer has no display value; in that scenario lets return null
            if (Helper_1.default.objectNotExists(display)) {
                return null;
            }
            var value = _this.props.ValueMember ? x[_this.props.ValueMember] : x;
            if (StringExtensions_1.StringExtensions.IsNotEmpty(_this.state.FilterValue) &&
                display.toLocaleLowerCase().indexOf(_this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return (React.createElement(ListGroupItem_1.default, { key: value + index, index: index, active: isActive, value: value }, display));
            }
        });
        var header = (React.createElement(ListBoxFilterSortComponent_1.ListBoxFilterSortComponent, { FilterValue: this.state.FilterValue, sortColumnValues: function () { return _this.sortColumnValues(); }, SortOrder: this.state.SortOrder, handleChangeFilterValue: function (e) { return _this.handleChangeFilterValue(e); }, DisableSort: false }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column", style: { width: '100%' } },
            header,
            React.createElement(SelectableList_1.default, { onSelectedChange: this.onSelectionChange, getItemId: this.getItemId },
                React.createElement(ListGroup_1.default, { marginTop: 2, style: tslib_1.__assign({ overflow: 'auto', flex: 1 }, this.props.listStyle) }, itemsElements))));
    };
    SingleListBox.prototype.handleChangeFilterValue = function (x) {
        this.setState({
            FilterValue: x,
        });
    };
    SingleListBox.prototype.sortColumnValues = function () {
        if (this.state.SortOrder == Enums_1.SortOrder.Ascending) {
            this.setState({
                Values: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Descending, this.state.Values, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Descending,
            });
        }
        else {
            this.setState({
                Values: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.state.Values, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Ascending,
            });
        }
    };
    SingleListBox.prototype.raiseOnChange = function () {
        this.props.onSelectedChange(this.state.UiSelectedValues);
    };
    return SingleListBox;
}(React.Component));
exports.SingleListBox = SingleListBox;
