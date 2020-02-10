"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PanelWithImage_1 = require("../Panels/PanelWithImage");
var AdaptableObjectRow_1 = require("../AdaptableObjectRow");
var Helper_1 = require("../../../Utilities/Helpers/Helper");
var AdaptableObjectCollection_1 = require("../AdaptableObjectCollection");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var UIHelper_1 = require("../../UIHelper");
var PanelWithButton_1 = require("../Panels/PanelWithButton");
var ButtonMaximise_1 = require("../Buttons/ButtonMaximise");
var ButtonMinimise_1 = require("../Buttons/ButtonMinimise");
var AdaptablePopover_1 = require("../../AdaptablePopover");
// this will be correctly configured at build time to contain the correct version
var version_1 = require("../../../../version");
var Dialog_1 = require("../../../components/Dialog");
var rebass_1 = require("rebass");
var SimpleButton_1 = require("../../../components/SimpleButton");
var Radio_1 = require("../../../components/Radio");
var AdaptableGridInfo = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableGridInfo, _super);
    function AdaptableGridInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ShowGridProperties: true,
            IsBaseOptionsMinimised: true,
            IsContainerOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
        };
        return _this;
    }
    AdaptableGridInfo.prototype.render = function () {
        var _this = this;
        var modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.Adaptable.adaptableOptions, document);
        var gridPropertiesColItems = [
            { Content: 'Property', Size: 5 },
            { Content: 'Value', Size: 7 },
        ];
        var adaptableOptionsColItems = [
            { Content: 'Property', Size: 6 },
            { Content: 'Value', Size: 4 },
            { Content: '', Size: 2 },
        ];
        var gridProperties = this.CreateGridInfo(gridPropertiesColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var baseadaptableOptions = this.CreateBaseOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var containeradaptableOptions = this.CreateContainerOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var auditadaptableOptions = this.CreateAuditOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var configServeradaptableOptions = this.CreateConfigServerOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var queryadaptableOptions = this.CreateQueryOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var layoutadaptableOptions = this.CreateLayoutOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var filteradaptableOptions = this.CreateFilterOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var generaladaptableOptions = this.CreateGeneralOptionsInfo(adaptableOptionsColItems).map(function (x, index) {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: index, colItems: x });
        });
        var showBaseOptionsButton = this.state.IsBaseOptionsMinimised
            ? this.createMaximiseButton('Base', function () {
                _this.setState({
                    IsBaseOptionsMinimised: false,
                    IsContainerOptionsMinimised: true,
                    IsAuditOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Base', function () {
                _this.setState({ IsBaseOptionsMinimised: true });
            });
        var showContainerOptionsButton = this.state.IsContainerOptionsMinimised
            ? this.createMaximiseButton('Container', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsContainerOptionsMinimised: false,
                    IsAuditOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Container', function () {
                _this.setState({ IsContainerOptionsMinimised: true });
            });
        var showAuditOptionsButton = this.state.IsAuditOptionsMinimised
            ? this.createMaximiseButton('Audit', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsAuditOptionsMinimised: false,
                    IsContainerOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Audit', function () {
                _this.setState({ IsAuditOptionsMinimised: true });
            });
        var showConfigServerOptionsButton = this.state.IsConfigServerOptionsMinimised
            ? this.createMaximiseButton('Config Server', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsAuditOptionsMinimised: true,
                    IsContainerOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: false,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Config Server', function () {
                _this.setState({ IsConfigServerOptionsMinimised: true });
            });
        var showQueryOptionsButton = this.state.IsQueryOptionsMinimised
            ? this.createMaximiseButton('Query', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsAuditOptionsMinimised: true,
                    IsContainerOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: false,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Query', function () {
                _this.setState({ IsQueryOptionsMinimised: true });
            });
        var showLayoutOptionsButton = this.state.IsLayoutOptionsMinimised
            ? this.createMaximiseButton('Layout', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsAuditOptionsMinimised: true,
                    IsContainerOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: false,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Layout', function () {
                _this.setState({ IsLayoutOptionsMinimised: true });
            });
        var showFilterOptionsButton = this.state.IsFilterOptionsMinimised
            ? this.createMaximiseButton('Filter', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsAuditOptionsMinimised: true,
                    IsContainerOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: false,
                    IsGeneralOptionsMinimised: true,
                });
            })
            : this.createMinimiseButton('Filter', function () {
                _this.setState({ IsFilterOptionsMinimised: true });
            });
        var showGeneralOptionsButton = this.state.IsGeneralOptionsMinimised
            ? this.createMaximiseButton('General', function () {
                _this.setState({
                    IsBaseOptionsMinimised: true,
                    IsAuditOptionsMinimised: true,
                    IsContainerOptionsMinimised: true,
                    IsConfigServerOptionsMinimised: true,
                    IsQueryOptionsMinimised: true,
                    IsLayoutOptionsMinimised: true,
                    IsFilterOptionsMinimised: true,
                    IsGeneralOptionsMinimised: false,
                });
            })
            : this.createMinimiseButton('General', function () {
                _this.setState({ IsGeneralOptionsMinimised: true });
            });
        return (React.createElement(Dialog_1.default, { isOpen: this.props.showAbout, onDismiss: this.props.onClose, style: { minWidth: '35vw' }, showCloseButton: false },
            React.createElement(rebass_1.Flex, { flexDirection: "column", style: { height: '100%' } },
                React.createElement(PanelWithImage_1.PanelWithImage, { header: 'Grid Info', variant: "primary", glyphicon: 'info-sign', style: { flex: 1 } },
                    React.createElement(rebass_1.Flex, { marginBottom: 2, padding: 3 },
                        React.createElement(Radio_1.default, { marginRight: 3, value: "GridProperties", checked: this.state.ShowGridProperties == true, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "Grid Properties"),
                        React.createElement(Radio_1.default, { value: "adaptableOptions", checked: this.state.ShowGridProperties == false, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "Adaptable Options")),
                    this.state.ShowGridProperties ? (React.createElement("div", null,
                        React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: gridPropertiesColItems, items: gridProperties }))) : (React.createElement("div", null,
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Base Options', button: showBaseOptionsButton }, this.state.IsBaseOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: baseadaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Container Options', button: showContainerOptionsButton }, this.state.IsContainerOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: containeradaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Audit Options', button: showAuditOptionsButton }, this.state.IsAuditOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: auditadaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Config Server Options', button: showConfigServerOptionsButton }, this.state.IsConfigServerOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: configServeradaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Query Options', button: showQueryOptionsButton }, this.state.IsQueryOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: queryadaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Layout Options', button: showLayoutOptionsButton }, this.state.IsLayoutOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: layoutadaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Filter Options', button: showFilterOptionsButton }, this.state.IsFilterOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: filteradaptableOptions }))),
                        React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'General Options', button: showGeneralOptionsButton }, this.state.IsGeneralOptionsMinimised == false && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: adaptableOptionsColItems, items: generaladaptableOptions })))))),
                React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", padding: 2, backgroundColor: "defaultbackground" },
                    React.createElement(SimpleButton_1.default, { onClick: function () { return _this.props.onClose(); } }, "Close")))));
    };
    AdaptableGridInfo.prototype.CreateGridInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var calcColumns = this.props.Adaptable.api.calculatedColumnApi
                .getAllCalculatedColumn()
                .map(function (c) { return c.ColumnId; });
            var columns_1 = this.props.Adaptable.api.gridApi.getColumns();
            var columnFilterDescription = this.props.Adaptable.FilterService.GetColumnFiltersDescription(this.props.Adaptable.api.columnFilterApi.getAllColumnFilter(), columns_1);
            var sorts = this.props.Adaptable.api.gridApi.getColumnSorts().map(function (gs) {
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns_1) + ': ' + gs.SortOrder;
            });
            returnRows.push(this.createColItem(colItems, 'Vendor Grid', this.props.Adaptable.vendorGridName));
            returnRows.push(this.createColItem(colItems, 'Adaptable Version', version_1.default));
            returnRows.push(this.createColItem(colItems, 'Sorted Columns', ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join('; ') : 'None'));
            returnRows.push(this.createColItem(colItems, 'Column Filters', columnFilterDescription));
            returnRows.push(this.createColItem(colItems, 'All Rows', this.props.Adaptable.getRowCount()));
            returnRows.push(this.createColItem(colItems, 'Visible Rows', this.props.Adaptable.getVisibleRowCount()));
            returnRows.push(this.createColItem(colItems, 'All Columns', this.props.Adaptable.getColumnCount()));
            returnRows.push(this.createColItem(colItems, 'Visible Column', this.props.Adaptable.getVisibleColumnCount()));
            returnRows.push(this.createColItem(colItems, 'Can Multi Select', this.props.Adaptable.isSelectable() ? 'True' : 'False'));
            returnRows.push(this.createColItem(colItems, 'Calculated Columns', ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : 'None'));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateBaseOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            // base options
            returnRows.push(this.createColItem(colItems, 'adaptableId', options.adaptableId, 'Identifier for this instance of Adaptable'));
            returnRows.push(this.createColItem(colItems, 'userName', options.userName, 'Current user of Adaptable'));
            returnRows.push(this.createColItem(colItems, 'primaryKey', options.primaryKey, 'Unique column in the grid (useful for cell identification purposes)'));
            //   returnRows.push(this.createColItem(colItems, "predefinedConfig", options.predefinedConfig, "Configuration properties and objects set at design-time"));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateContainerOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'adaptableContainer', options.containerOptions.adaptableContainer, 'Id of <div> element which contains Adaptable'));
            returnRows.push(this.createColItem(colItems, 'vendorContainer', options.containerOptions.vendorContainer, 'Id of <div> element which contains the underlying grid'));
            returnRows.push(this.createColItem(colItems, 'modalContainer', options.containerOptions.modalContainer
                ? options.containerOptions.modalContainer
                : 'None', "Id of <div> element where popups appear.  If set to 'None' then they appear in the middle of the screen."));
            returnRows.push(this.createColItem(colItems, 'chartContainer', options.containerOptions.chartContainer
                ? options.containerOptions.chartContainer
                : 'None', "Id of <div> element where charts appear.  If set to 'None' then they appear in the middle of the screen."));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateAuditOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'auditCellEdits', options.auditOptions.auditCellEdits == true ? 'Yes' : 'No', ' Whether to audit cell edits.  These include any edits made to the data in the grid but not outside (e.g. not a ticking stream)'));
            returnRows.push(this.createColItem(colItems, 'auditFunctionEvents', options.auditOptions.auditFunctionEvents == true ? 'Yes' : 'No', " Whether to audit function events in Adaptable (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)"));
            returnRows.push(this.createColItem(colItems, 'auditUserStateChanges', options.auditOptions.auditUserStateChanges == true ? 'Yes' : 'No', 'Whether to audit all changes to the User State; includes any objects (e.g. Conditional Styles) created, edited or deleted'));
            returnRows.push(this.createColItem(colItems, 'auditInternalStateChanges', options.auditOptions.auditInternalStateChanges == true ? 'Yes' : 'No', "Whether to audit changes to Adaptable's state; includes things like which popups are active, what are the selected cells (can potentially be very verbos)e"));
            returnRows.push(this.createColItem(colItems, 'pingInterval', options.auditOptions.pingInterval, 'How often (in seconds) the Audit Log should ping to check that the listening service is up and running'));
            returnRows.push(this.createColItem(colItems, 'auditLogsSendInterval', options.auditOptions.auditLogsSendInterval, "The 'batch' time (in seconds) for pushing Audit Log messages"));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateConfigServerOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'enableConfigServer', options.configServerOptions.enableConfigServer == true ? 'Yes' : 'No', "If enabled Config Server store State in the remote location specified in the 'configServerUrl' property (rather than the default of using local storage)."));
            returnRows.push(this.createColItem(colItems, 'configServerUrl', options.configServerOptions.configServerUrl, 'Location of Config Server that persists the user state and gives it back on demand (only used if enableConfigServer is true).'));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateQueryOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'maxColumnValueItemsDisplayed', options.queryOptions.maxColumnValueItemsDisplayed, 'No. of items to display in column value listboxes when building queries - useful when datasource is very large'));
            returnRows.push(this.createColItem(colItems, 'columnValuesOnlyInQueries', options.queryOptions.columnValuesOnlyInQueries == true ? 'Yes' : 'No', ' Whether query builder includes just ColumnValues, or should also include Filters and Ranges.'));
            returnRows.push(this.createColItem(colItems, 'ignoreCaseInQueries', options.queryOptions.ignoreCaseInQueries == true ? 'Yes' : 'No', 'Whether case is ignored when running queries (on text columns)'));
            returnRows.push(this.createColItem(colItems, 'getColumnValues', options.queryOptions.getColumnValues != null ? 'Function Exists' : '', 'Function that is run when getting list of column values (run by user on their server).'));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateLayoutOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'includeVendorStateInLayouts', options.layoutOptions.includeVendorStateInLayouts == true ? 'Yes' : 'No', 'Whether layouts include vendor grid related state.'));
            returnRows.push(this.createColItem(colItems, 'autoSaveLayouts', options.layoutOptions.autoSaveLayouts == true ? 'Yes' : 'No', 'Whether layouts save as soon as column order or sorts change.'));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateFilterOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'indicateFilteredColumns', options.filterOptions.indicateFilteredColumns == true ? 'Yes' : 'No', 'Whether the font in the Column header for filtered columns is bold and italicised.'));
            returnRows.push(this.createColItem(colItems, 'useAdaptableFilterForm', options.filterOptions.useAdaptableFilterForm == true ? 'Yes' : 'No', 'If using Adaptable filter form in column menu (or that provided by the vendor grid).'));
            returnRows.push(this.createColItem(colItems, 'useAdaptableQuickFilter', options.filterOptions.useAdaptableQuickFilter == true ? 'Yes' : 'No', 'Use Adaptable quick filter row (or that provided by the vendor grid).'));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.CreateGeneralOptionsInfo = function (colItems) {
        var returnRows = [];
        if (this.props.showAbout) {
            var options = this.props.Adaptable.adaptableOptions;
            returnRows.push(this.createColItem(colItems, 'serverSearchOption', options.searchOptions.serverSearchOption, 'Which searching and filtering options, if any, are taking place on the server.'));
            //   returnRows.push(
            //      this.createColItem(
            //        colItems,
            //        'useDefaultVendorGridThemes',
            //        options.generalOptions.useDefaultVendorGridThemes == true ? 'Yes' : 'No',
            //        'Whether the default theme(s) for the vendor grid are being used).'
            //      )
            //    );
            returnRows.push(this.createColItem(colItems, 'showMissingPrimaryKeyWarning', options.generalOptions.showMissingPrimaryKeyWarning == true ? 'Yes' : 'No', 'Whether a warning is shown if the primary key column does not actually exist.'));
            returnRows.push(this.createColItem(colItems, 'preventDuplicatePrimaryKeyValues', options.generalOptions.preventDuplicatePrimaryKeyValues == true ? 'Yes' : 'No', 'Whether a duplicate value can be entered into the primary key column.'));
        }
        return returnRows;
    };
    AdaptableGridInfo.prototype.createMaximiseButton = function (optionType, onClickFunction) {
        return (React.createElement(ButtonMaximise_1.ButtonMaximise, { onClick: function () { return onClickFunction(); }, tooltip: 'Show ' + optionType + ' Options' }));
    };
    AdaptableGridInfo.prototype.createMinimiseButton = function (optionType, onClickFunction) {
        return (React.createElement(ButtonMinimise_1.ButtonMinimise, { onClick: function () { return onClickFunction(); }, tooltip: 'Hide ' + optionType + ' Options' }));
    };
    AdaptableGridInfo.prototype.createColItem = function (colItems, item1, item2, item3) {
        var rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = item1;
        rowColItems[1].Content = item2;
        if (item3) {
            var infoButton = React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: null, bodyText: [item3] });
            rowColItems[2].Content = infoButton;
        }
        return rowColItems;
    };
    AdaptableGridInfo.prototype.onShowGridPropertiesChanged = function (event) {
        var e = event.target;
        this.setState({ ShowGridProperties: e.value == 'GridProperties' });
    };
    return AdaptableGridInfo;
}(React.Component));
exports.AdaptableGridInfo = AdaptableGridInfo;
