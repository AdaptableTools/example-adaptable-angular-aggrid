"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var DataSourceParamsPopover_1 = require("./DataSourceParamsPopover");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ButtonApply_1 = require("../Components/Buttons/ButtonApply");
var Dropdown_1 = require("../../components/Dropdown");
var rebass_1 = require("rebass");
var DataSourceToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceToolbarControlComponent, _super);
    function DataSourceToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            CurrentDataSource: StringExtensions_1.StringExtensions.IsNullOrEmpty(_this.props.CurrentDataSourceName)
                ? null
                : _this.props.DataSources.find(function (ds) { return ds.Name == _this.props.CurrentDataSourceName; }),
        };
        return _this;
    }
    DataSourceToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var selectDataSourceString = 'Select Data Source';
        var currentDataSourceName = this.state.CurrentDataSource == null
            ? selectDataSourceString
            : this.state.CurrentDataSource.Name;
        // this will be a method that will check params...
        var canApplyDataSource = this.canApplyDataSource();
        var availableDataSources = this.props.DataSources
            // .filter(
            //   s => s.Name != currentDataSourceName
            // )
            .map(function (dataSource, index) {
            return {
                value: dataSource.Name,
                label: dataSource.Name,
            };
        });
        var dataSourceParamsPopover = this.state.CurrentDataSource == null ? null : (React.createElement(DataSourceParamsPopover_1.DataSourceParamsPopover, { dataSourceParams: this.state.CurrentDataSource.DataSourceParams }));
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__DataSource__wrap" },
            React.createElement(Dropdown_1.default, { className: "ab-DashboardToolbar__DataSource__select", disabled: availableDataSources.length == 0, style: { minWidth: 160 }, placeholder: "Select Data Source", value: currentDataSourceName, options: availableDataSources, onChange: function (dataSourceName) { return _this.onSelectedDataSourceChanged(dataSourceName); }, showClearButton: false }),
            React.createElement(ButtonApply_1.ButtonApply, { className: "ab-DashboardToolbar__DataSource__apply", marginLeft: 2, onClick: function () { return _this.onApplyClick(); }, tooltip: "Get Data Source", disabled: !canApplyDataSource, AccessLevel: this.props.AccessLevel })));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__DataSource", headerText: StrategyConstants.DataSourceStrategyFriendlyName, glyphicon: StrategyConstants.DataSourceGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.DataSourceStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    DataSourceToolbarControlComponent.prototype.onSelectedDataSourceChanged = function (dataSourceName) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(dataSourceName)) {
            this.setState({ CurrentDataSource: null });
        }
        else {
            var newDataSource = this.props.DataSources.find(function (ds) { return ds.Name == dataSourceName; });
            this.setState({ CurrentDataSource: newDataSource });
        }
    };
    DataSourceToolbarControlComponent.prototype.onApplyClick = function () {
        if (this.canApplyDataSource) {
            if (this.state.CurrentDataSource != null) {
                this.props.onSelectDataSource(this.state.CurrentDataSource.Name);
            }
        }
    };
    DataSourceToolbarControlComponent.prototype.canApplyDataSource = function () {
        if (this.state.CurrentDataSource == null) {
            return false;
        }
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(this.state.CurrentDataSource.DataSourceParams)) {
            return false;
        }
        return true;
    };
    return DataSourceToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CurrentDataSourceName: state.DataSource.CurrentDataSource,
        DataSources: state.DataSource.DataSources,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectDataSource: function (DataSourceName) {
            return dispatch(DataSourceRedux.DataSourceSelect(DataSourceName));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.DataSourceStrategyId, ScreenPopups.DataSourcePopup));
        },
    };
}
exports.DataSourceToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataSourceToolbarControlComponent);
