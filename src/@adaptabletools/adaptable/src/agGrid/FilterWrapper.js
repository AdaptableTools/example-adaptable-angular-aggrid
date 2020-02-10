"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var React = require("react");
var styled_components_1 = require("styled-components");
var theme_1 = require("../theme");
var FilterForm_1 = require("../View/Components/FilterForm/FilterForm");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
exports.FilterWrapperFactory = function (adaptable) {
    return /** @class */ (function () {
        function FilterWrapper() {
        }
        FilterWrapper.prototype.init = function (params) {
            this.params = params;
            this.column = params.column;
            this.filterContainer = document.createElement('div');
            this.filterContainer.id =
                'filter_' + this.params.column.getColId() + '_' + adaptable.adaptableOptions.adaptableId;
        };
        FilterWrapper.prototype.isFilterActive = function () {
            var _this = this;
            //make the small filter icon to appear when there is a filter
            return (adaptable.api.columnFilterApi
                .getAllColumnFilter()
                .findIndex(function (x) { return x.ColumnId == _this.params.column.getColId(); }) > -1);
        };
        FilterWrapper.prototype.doesFilterPass = function (params) {
            //we do not filter here.... we filter using the doesExternalFilterPass. Not sure there is a difference....
            return true;
        };
        FilterWrapper.prototype.getModel = function () {
            //
        };
        FilterWrapper.prototype.setModel = function (model) {
            //
        };
        FilterWrapper.prototype.getGui = function () {
            return this.filterContainer;
        };
        FilterWrapper.prototype.afterGuiAttached = function (params) {
            //we always unmount first so the autofocus from the form works... in other grids we unmount when hidden
            ReactDOM.unmountComponentAtNode(this.filterContainer);
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(this.column.getColId(), adaptable.api.gridApi.getColumns());
            var filterContext = {
                Column: column,
                Adaptable: adaptable,
                ShowCloseButton: params != null && params.hidePopup != null,
            };
            adaptable.hideFilterFormPopup = params ? params.hidePopup : null;
            ReactDOM.render(React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default }, FilterForm_1.FilterFormReact(filterContext)), this.filterContainer);
        };
        FilterWrapper.prototype.destroy = function () {
            ReactDOM.unmountComponentAtNode(this.filterContainer);
            this.filterContainer = null;
        };
        return FilterWrapper;
    }());
};
