"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var GridSortRow_1 = require("../GridSortRow");
var AdaptableObjectCollection_1 = require("../../Components/AdaptableObjectCollection");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var PanelWithButton_1 = require("../../Components/Panels/PanelWithButton");
var SimpleButton_1 = require("../../../components/SimpleButton");
var EmptyContent_1 = require("../../../components/EmptyContent");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var LayoutGridSortWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutGridSortWizard, _super);
    function LayoutGridSortWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnSorts: _this.props.Data.ColumnSorts,
        };
        return _this;
    }
    LayoutGridSortWizard.prototype.render = function () {
        var _this = this;
        var addButton = (React.createElement(SimpleButton_1.default, { icon: "plus", iconPosition: "start", variant: "raised", tone: "accent", onClick: function () { return _this.addSort(); } }, "Add Sort"));
        var colItems = [
            { Content: 'Column', Size: 4 },
            { Content: 'Sort Order', Size: 4 },
            { Content: '', Size: 4 },
        ];
        var gridSortRows = this.state.ColumnSorts.map(function (x, index) {
            return (React.createElement(GridSortRow_1.GridSortRow, { key: index, AdaptableObject: null, colItems: colItems, Columns: _this.props.SortableColumns, UserFilters: null, onEdit: null, onDeleteColumnSort: function () { return _this.onDeleteGridSort(index); }, onColumnSortColumnChanged: function (column) { return _this.onColumnSelectedChanged(index, column); }, onColumnSortOrderChanged: function (sortOrder) { return _this.onSortOrderChanged(index, sortOrder); }, onShare: null, TeamSharingActivated: false, onDeleteConfirm: null, ColumnSort: x, AccessLevel: Enums_1.AccessLevel.Full }));
        });
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: '', variant: "default", button: addButton, bodyProps: { padding: 0 } }, gridSortRows.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: gridSortRows, allowOverflow: true })) : (React.createElement(EmptyContent_1.default, null,
            React.createElement("p", null, "Click 'Add Sort' if you wish to add Column Sort Orders in this layout.")))));
    };
    LayoutGridSortWizard.prototype.addSort = function () {
        var _this = this;
        var sorts = [].concat(this.state.ColumnSorts, ObjectFactory_1.ObjectFactory.CreateEmptyColumnSort());
        this.setState({ ColumnSorts: sorts }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutGridSortWizard.prototype.onColumnSelectedChanged = function (index, column) {
        var _this = this;
        var sorts = [].concat(this.state.ColumnSorts);
        var sort = sorts[index];
        sort.Column = column ? column.ColumnId : '';
        this.setState({ ColumnSorts: sorts }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutGridSortWizard.prototype.onSortOrderChanged = function (index, sortOrder) {
        var _this = this;
        var sorts = [].concat(this.state.ColumnSorts);
        var sort = sorts[index];
        sort.SortOrder = sortOrder;
        this.setState({ ColumnSorts: sorts }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutGridSortWizard.prototype.onDeleteGridSort = function (index) {
        var _this = this;
        var sorts = [].concat(this.state.ColumnSorts);
        sorts.splice(index, 1);
        this.setState({ ColumnSorts: sorts }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutGridSortWizard.prototype.canNext = function () {
        var canNext = true;
        this.state.ColumnSorts.forEach(function (gs) {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(gs.Column)) {
                canNext = false;
            }
        });
        return canNext;
    };
    LayoutGridSortWizard.prototype.canBack = function () {
        return true;
    };
    LayoutGridSortWizard.prototype.Next = function () {
        this.props.Data.ColumnSorts = ArrayExtensions_1.default.IsNotEmpty(this.state.ColumnSorts)
            ? this.state.ColumnSorts
            : [];
    };
    LayoutGridSortWizard.prototype.Back = function () {
        // todo
    };
    LayoutGridSortWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutGridSortWizard.prototype.GetIndexStepDecrement = function () {
        return 1; // some way of knowing to go back 2 steps?
    };
    return LayoutGridSortWizard;
}(React.Component));
exports.LayoutGridSortWizard = LayoutGridSortWizard;
