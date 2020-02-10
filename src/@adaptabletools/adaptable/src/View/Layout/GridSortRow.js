"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
var Dropdown_1 = require("../../components/Dropdown");
var GridSortRow = /** @class */ (function (_super) {
    tslib_1.__extends(GridSortRow, _super);
    function GridSortRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridSortRow.prototype.render = function () {
        var _this = this;
        var colItems = [].concat(this.props.colItems);
        var sortOrders = EnumExtensions_1.EnumExtensions.getNames(Enums_1.SortOrder).map(function (enumName) {
            return {
                value: enumName,
                label: enumName,
            };
        });
        colItems[0].Content = (React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.props.ColumnSort.Column], ColumnList: this.props.Columns.filter(function (c) { return c.Sortable; }), onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single }));
        colItems[1].Content = (React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.props.ColumnSort.SortOrder, onChange: function (x) { return _this.onSortOrderChanged(x); }, options: sortOrders }));
        var deleteButton = (React.createElement(ButtonDelete_1.ButtonDelete, { disabled: false, tooltip: 'Delete Sort', ConfirmAction: null, ConfirmationMsg: '', ConfirmationTitle: '', onClickAction: function () { return _this.props.onDeleteColumnSort(); }, AccessLevel: Enums_1.AccessLevel.Full }));
        colItems[2].Content = deleteButton;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    GridSortRow.prototype.onColumnSelectedChanged = function (columns) {
        var column = columns[0];
        this.props.onColumnSortColumnChanged(column);
    };
    GridSortRow.prototype.onSortOrderChanged = function (value) {
        this.props.onColumnSortOrderChanged(value);
    };
    return GridSortRow;
}(React.Component));
exports.GridSortRow = GridSortRow;
