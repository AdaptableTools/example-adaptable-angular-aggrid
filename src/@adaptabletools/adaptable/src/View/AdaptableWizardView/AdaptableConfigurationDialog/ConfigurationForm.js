"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var FormLayout_1 = require("../../../components/FormLayout");
var CheckBox_1 = require("../../../components/CheckBox");
var HelpBlock_1 = require("../../../components/HelpBlock");
var Input_1 = require("../../../components/Input");
var rebass_1 = require("rebass");
var DefaultAdaptableOptions_1 = require("../../../Utilities/Defaults/DefaultAdaptableOptions");
var ConfigurationForm = function (props) {
    var abOptions = props.adaptableOptions;
    var filterOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.filterOptions), abOptions.filterOptions);
    var layoutOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.layoutOptions), abOptions.layoutOptions);
    var generalOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.generalOptions), abOptions.generalOptions);
    var userInterfaceOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.userInterfaceOptions), abOptions.userInterfaceOptions);
    var queryOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.queryOptions), abOptions.queryOptions);
    var configServerOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.configServerOptions), abOptions.configServerOptions);
    var chartOptions = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.chartOptions), abOptions.chartOptions);
    // we are 'hard-coding' this to use ag-Grid but so does helper so ok for now and we can refactor when Adaptable Grid is ready
    var vendorGrid = tslib_1.__assign(tslib_1.__assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.vendorGrid), abOptions.vendorGrid);
    return (React.createElement(React.Fragment, null,
        React.createElement(HelpBlock_1.default, null, "General Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Use Default Vendor Grid Themes" },
                React.createElement(CheckBox_1.default, { checked: userInterfaceOptions.useDefaultVendorGridThemes, onChange: function (useDefaultVendorGridThemes) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.userInterfaceOptions = tslib_1.__assign({}, abOptions.userInterfaceOptions);
                        abOptions.userInterfaceOptions.useDefaultVendorGridThemes = useDefaultVendorGridThemes;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Show Missing Primary Key Warning" },
                React.createElement(CheckBox_1.default, { checked: generalOptions.showMissingPrimaryKeyWarning, onChange: function (showMissingPrimaryKeyWarning) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.generalOptions = tslib_1.__assign({}, abOptions.generalOptions);
                        abOptions.generalOptions.showMissingPrimaryKeyWarning = showMissingPrimaryKeyWarning;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Prevent Duplicate Primary Key Values" },
                React.createElement(CheckBox_1.default, { checked: generalOptions.preventDuplicatePrimaryKeyValues, onChange: function (preventDuplicatePrimaryKeyValues) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.generalOptions = tslib_1.__assign({}, abOptions.generalOptions);
                        abOptions.generalOptions.preventDuplicatePrimaryKeyValues = preventDuplicatePrimaryKeyValues;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(HelpBlock_1.default, null, "Grid Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Enable Range Selection" },
                React.createElement(CheckBox_1.default, { checked: vendorGrid.enableRangeSelection, onChange: function (enableRangeSelection) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.vendorGrid = tslib_1.__assign({}, abOptions.vendorGrid);
                        abOptions.vendorGrid.enableRangeSelection = enableRangeSelection;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Show Quick Filter" },
                React.createElement(CheckBox_1.default, { checked: vendorGrid.floatingFilter, onChange: function (floatingFilter) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.vendorGrid = tslib_1.__assign({}, abOptions.vendorGrid);
                        abOptions.vendorGrid.floatingFilter = floatingFilter;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Suppress Column Virtualisation" },
                React.createElement(CheckBox_1.default, { checked: vendorGrid.suppressColumnVirtualisation, onChange: function (suppressColumnVirtualisation) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.vendorGrid = tslib_1.__assign({}, abOptions.vendorGrid);
                        abOptions.vendorGrid.suppressColumnVirtualisation = suppressColumnVirtualisation;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Show Column Menu Button" },
                React.createElement(CheckBox_1.default, { checked: vendorGrid.suppressMenuHide, onChange: function (suppressMenuHide) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.vendorGrid = tslib_1.__assign({}, abOptions.vendorGrid);
                        abOptions.vendorGrid.suppressMenuHide = suppressMenuHide;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(HelpBlock_1.default, null, "Filter Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Use Vendor Filter Form Style" },
                React.createElement(CheckBox_1.default, { checked: filterOptions.useVendorFilterFormStyle, onChange: function (useVendorFilterFormStyle) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.filterOptions = tslib_1.__assign({}, abOptions.filterOptions);
                        abOptions.filterOptions.useVendorFilterFormStyle = useVendorFilterFormStyle;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Use Adaptable Quick Filter" },
                React.createElement(CheckBox_1.default, { checked: filterOptions.useAdaptableQuickFilter, onChange: function (useAdaptableQuickFilter) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.filterOptions = tslib_1.__assign({}, abOptions.filterOptions);
                        abOptions.filterOptions.useAdaptableQuickFilter = useAdaptableQuickFilter;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Use Adaptable Filter Form" },
                React.createElement(CheckBox_1.default, { checked: filterOptions.useAdaptableFilterForm, onChange: function (useAdaptableFilterForm) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.filterOptions = tslib_1.__assign({}, abOptions.filterOptions);
                        abOptions.filterOptions.useAdaptableFilterForm = useAdaptableFilterForm;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Indicate Filtered Columns" },
                React.createElement(CheckBox_1.default, { checked: filterOptions.indicateFilteredColumns, onChange: function (indicateFilteredColumns) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.filterOptions = tslib_1.__assign({}, abOptions.filterOptions);
                        abOptions.filterOptions.indicateFilteredColumns = indicateFilteredColumns;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Auto Apply Filter" },
                React.createElement(CheckBox_1.default, { checked: filterOptions.autoApplyFilter, onChange: function (autoApplyFilter) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.filterOptions = tslib_1.__assign({}, abOptions.filterOptions);
                        abOptions.filterOptions.autoApplyFilter = autoApplyFilter;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(HelpBlock_1.default, null, "Layout Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Include Vendor State In Layouts" },
                React.createElement(CheckBox_1.default, { checked: layoutOptions.includeVendorStateInLayouts, onChange: function (includeVendorStateInLayouts) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.layoutOptions = tslib_1.__assign({}, abOptions.layoutOptions);
                        abOptions.layoutOptions.includeVendorStateInLayouts = includeVendorStateInLayouts;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Auto Save Layouts" },
                React.createElement(CheckBox_1.default, { checked: layoutOptions.autoSaveLayouts, onChange: function (autoSaveLayouts) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.layoutOptions = tslib_1.__assign({}, abOptions.layoutOptions);
                        abOptions.layoutOptions.autoSaveLayouts = autoSaveLayouts;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Auto Size Columns In Default Layout" },
                React.createElement(CheckBox_1.default, { checked: layoutOptions.autoSizeColumnsInLayout, onChange: function (autoSizeColumnsInLayout) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.layoutOptions = tslib_1.__assign({}, abOptions.layoutOptions);
                        abOptions.layoutOptions.autoSizeColumnsInLayout = autoSizeColumnsInLayout;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(HelpBlock_1.default, null, "Query Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Use Only Column Values In Queries" },
                React.createElement(CheckBox_1.default, { checked: queryOptions.columnValuesOnlyInQueries, onChange: function (columnValuesOnlyInQueries) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.queryOptions = tslib_1.__assign({}, abOptions.queryOptions);
                        abOptions.queryOptions.columnValuesOnlyInQueries = columnValuesOnlyInQueries;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Ignore Case In Queries" },
                React.createElement(CheckBox_1.default, { checked: queryOptions.ignoreCaseInQueries, onChange: function (ignoreCaseInQueries) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.queryOptions = tslib_1.__assign({}, abOptions.queryOptions);
                        abOptions.queryOptions.ignoreCaseInQueries = ignoreCaseInQueries;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", margin: 2 },
            React.createElement(rebass_1.Text, { style: { flex: 3 }, marginRight: 2 }, "Max Column Value Items To Display"),
            React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                React.createElement(Input_1.default, { style: { flex: 1 }, type: "number", placeholder: "Enter Number", onChange: function (event) {
                        var e = event.target;
                        var maxColumnValueItemsDisplayed = parseInt(e.value);
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.queryOptions = tslib_1.__assign({}, abOptions.queryOptions);
                        abOptions.queryOptions.maxColumnValueItemsDisplayed = maxColumnValueItemsDisplayed;
                        props.onChangeadaptableOptions(abOptions);
                    }, value: queryOptions.maxColumnValueItemsDisplayed, marginRight: 3 }))),
        React.createElement(HelpBlock_1.default, null, "Chart Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Display Charts On StartUp" },
                React.createElement(CheckBox_1.default, { checked: chartOptions.displayOnStartUp, onChange: function (displayOnStartUp) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.chartOptions = tslib_1.__assign({}, abOptions.chartOptions);
                        abOptions.chartOptions.displayOnStartUp = displayOnStartUp;
                        props.onChangeadaptableOptions(abOptions);
                    } })),
            React.createElement(FormLayout_1.FormRow, { label: "Show Charts in Popup" },
                React.createElement(CheckBox_1.default, { checked: chartOptions.showModal, onChange: function (showModal) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.chartOptions = tslib_1.__assign({}, abOptions.chartOptions);
                        abOptions.chartOptions.showModal = showModal;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", margin: 2 },
            React.createElement(rebass_1.Text, { style: { flex: 3 }, marginRight: 2 }, "Pie Chart Maximum Items"),
            React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                React.createElement(Input_1.default, { style: { flex: 1 }, type: "number", placeholder: "Enter Number", onChange: function (event) {
                        var e = event.target;
                        var pieChartMaxItems = parseInt(e.value);
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.chartOptions = tslib_1.__assign({}, abOptions.chartOptions);
                        abOptions.chartOptions.pieChartMaxItems = pieChartMaxItems;
                        props.onChangeadaptableOptions(abOptions);
                    }, value: chartOptions.pieChartMaxItems, marginRight: 3 }))),
        React.createElement(HelpBlock_1.default, null, "Config Server Options"),
        React.createElement(FormLayout_1.default, { margin: 2, columns: [{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }] },
            React.createElement(FormLayout_1.FormRow, { label: "Enable Config Server" },
                React.createElement(CheckBox_1.default, { checked: configServerOptions.enableConfigServer, onChange: function (enableConfigServer) {
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.configServerOptions = tslib_1.__assign({}, abOptions.configServerOptions);
                        abOptions.configServerOptions.enableConfigServer = enableConfigServer;
                        props.onChangeadaptableOptions(abOptions);
                    } }))),
        React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", margin: 2 },
            React.createElement(rebass_1.Text, { style: { flex: 3 }, marginRight: 2 }, "Config Server Url"),
            React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                React.createElement(Input_1.default, { style: { flex: 1 }, type: "text", placeholder: "Enter Text", onChange: function (event) {
                        var e = event.target;
                        var configServerUrl = e.value;
                        abOptions = tslib_1.__assign({}, abOptions);
                        abOptions.configServerOptions = tslib_1.__assign({}, abOptions.configServerOptions);
                        abOptions.configServerOptions.configServerUrl = configServerUrl;
                        props.onChangeadaptableOptions(abOptions);
                    }, value: configServerOptions.configServerUrl, marginRight: 3 })))));
};
exports.default = ConfigurationForm;
