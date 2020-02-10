"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var React = require("react");
var styled_components_1 = require("styled-components");
var theme_1 = require("../theme");
var QuickFilterForm_1 = require("../View/Components/FilterForm/QuickFilterForm");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
exports.FloatingFilterWrapperFactory = function (adaptable) {
    return /** @class */ (function () {
        function FloatingFilterWrapper() {
        }
        FloatingFilterWrapper.prototype.onParentModelChanged = function (parentModel, filterChangedEvent) {
            // todo?
        };
        FloatingFilterWrapper.prototype.afterGuiAttached = function (params) {
            // todo?
        };
        FloatingFilterWrapper.prototype.init = function (params) {
            var colId = params.column.getColId();
            this.filterContainer = document.createElement('div');
            this.filterContainer.id = "floatingFilter_" + colId + "_" + adaptable.adaptableOptions.adaptableId;
            this.filterContainer.style.display = 'flex';
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, adaptable.api.gridApi.getColumns());
            var width = params.column.getActualWidth() - 40;
            var filterContext = {
                Column: column,
                Adaptable: adaptable,
                ColumnWidth: width,
                ShowCloseButton: false,
            };
            ReactDOM.render(React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default }, QuickFilterForm_1.QuickFilterFormReact(filterContext)), this.filterContainer);
        };
        FloatingFilterWrapper.prototype.getGui = function () {
            return this.filterContainer;
        };
        FloatingFilterWrapper.prototype.destroy = function () {
            ReactDOM.unmountComponentAtNode(this.filterContainer);
            this.filterContainer = null;
        };
        return FloatingFilterWrapper;
    }());
};
