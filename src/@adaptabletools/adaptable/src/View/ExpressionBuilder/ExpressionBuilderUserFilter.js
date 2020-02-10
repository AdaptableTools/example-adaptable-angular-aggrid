"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Panel_1 = require("../../components/Panel");
var ListGroupItem_1 = require("../../components/List/ListGroupItem");
var ListGroup_1 = require("../../components/List/ListGroup");
var ExpressionBuilderUserFilter = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionBuilderUserFilter, _super);
    function ExpressionBuilderUserFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionBuilderUserFilter.prototype.render = function () {
        var _this = this;
        var filters = tslib_1.__spread(this.props.AvailableSystemFilterNames, this.props.AvailableUserFilterNames, this.props.AvailableNamedFilterNames);
        var filterItems = filters.map(function (sf, index) {
            return (React.createElement(ListGroupItem_1.default, { key: index, onClick: function () { return _this.onClickColum(sf); }, active: _this.props.SelectedFilterNames.some(function (f) { return f == sf; }) }, sf));
        });
        return (React.createElement(Panel_1.default, { style: { flex: 1 }, bodyScroll: true },
            React.createElement(ListGroup_1.default, null, filterItems)));
    };
    ExpressionBuilderUserFilter.prototype.onClickColum = function (filterName) {
        var newArray = [];
        var existingUserFilterExpression = this.props.SelectedFilterNames.find(function (f) { return f == filterName; });
        if (existingUserFilterExpression != null) {
            // it exists
            var index = this.props.SelectedFilterNames.indexOf(existingUserFilterExpression);
            newArray = tslib_1.__spread(this.props.SelectedFilterNames);
            newArray.splice(index, 1);
        }
        else {
            newArray = tslib_1.__spread(this.props.SelectedFilterNames);
            newArray.push(filterName);
        }
        this.props.onFilterNameChange(newArray);
    };
    return ExpressionBuilderUserFilter;
}(React.Component));
exports.ExpressionBuilderUserFilter = ExpressionBuilderUserFilter;
