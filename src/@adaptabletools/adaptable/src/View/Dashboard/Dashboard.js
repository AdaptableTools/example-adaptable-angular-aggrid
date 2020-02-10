"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var AdaptableViewFactory_1 = require("../AdaptableViewFactory");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var SimpleButton_1 = require("../../components/SimpleButton");
var rebass_1 = require("rebass");
var AdaptableHelper_1 = require("../../Utilities/Helpers/AdaptableHelper");
var DashboardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardComponent, _super);
    function DashboardComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardComponent.prototype.render = function () {
        var _this = this;
        // this logic is repeated from Home Toolbar where we get the Title  - perhaps put it one place?
        var instanceName = this.props.DashboardState.HomeToolbarTitle;
        if (StringExtensions_1.default.IsNullOrEmpty(instanceName)) {
            instanceName = this.props.Adaptable.adaptableOptions.adaptableId;
            if (instanceName == GeneralConstants.USER_NAME) {
                instanceName = 'Adaptable ';
            }
        }
        var showInstanceName = 'Show ' + instanceName + ' Dashboard';
        var hiddenEntitlements = this.props.EntitlementState.FunctionEntitlements.filter(function (e) { return e.AccessLevel == 'Hidden'; });
        var visibleDashboardControls = this.props.DashboardState.VisibleToolbars.filter(function (vt) {
            return ArrayExtensions_1.ArrayExtensions.NotContainsItem(hiddenEntitlements, vt);
        });
        var visibleDashboardElements = visibleDashboardControls.map(function (control, idx) {
            var customToolbar = _this.props.DashboardState.CustomToolbars.find(function (ct) { return ct.Name == control; });
            if (customToolbar) {
                var accessLevel = AdaptableHelper_1.AdaptableHelper.getEntitlementAccessLevelForStrategy(_this.props.EntitlementState.FunctionEntitlements, StrategyConstants.DashboardStrategyId);
                if (accessLevel != Enums_1.AccessLevel.Hidden) {
                    var customToolbarControl = AdaptableViewFactory_1.AdaptableDashboardFactory.get(StrategyConstants.DashboardStrategyId);
                    if (customToolbarControl) {
                        var customDshboardElememt = React.createElement(customToolbarControl, {
                            Adaptable: _this.props.Adaptable,
                            Columns: _this.props.Columns,
                            UserFilters: _this.props.UserFilters,
                            SystemFilters: _this.props.SystemFilters,
                            ColorPalette: _this.props.ColorPalette,
                            ColumnSorts: _this.props.ColumnSorts,
                            AccessLevel: accessLevel,
                            CustomToolbar: customToolbar,
                        });
                        return (React.createElement(rebass_1.Box, { key: customToolbar.Name, marginTop: 1, marginRight: 1, className: "ab-Dashboard__container ab-Dashboard__container--customToolbar" }, customDshboardElememt));
                    }
                    else {
                        LoggingHelper_1.LoggingHelper.LogAdaptableError('Cannot find CustomToolbar entitled: ' + customToolbar.Name);
                    }
                }
            }
            else {
                var shippedToolbar = control;
                var accessLevel = AdaptableHelper_1.AdaptableHelper.getEntitlementAccessLevelForStrategy(_this.props.EntitlementState.FunctionEntitlements, shippedToolbar);
                if (accessLevel != Enums_1.AccessLevel.Hidden) {
                    var dashboardControl = AdaptableViewFactory_1.AdaptableDashboardFactory.get(shippedToolbar);
                    if (dashboardControl) {
                        var dashboardElememt = React.createElement(dashboardControl, {
                            Adaptable: _this.props.Adaptable,
                            Columns: _this.props.Columns,
                            UserFilters: _this.props.UserFilters,
                            SystemFilters: _this.props.SystemFilters,
                            ColorPalette: _this.props.ColorPalette,
                            ColumnSorts: _this.props.ColumnSorts,
                            AccessLevel: accessLevel,
                        });
                        return (React.createElement(rebass_1.Box, { key: control, marginTop: 1, marginRight: 1, className: "ab-Dashboard__container ab-Dashboard__container--" + control }, dashboardElememt));
                    }
                    else {
                        LoggingHelper_1.LoggingHelper.LogAdaptableError('Cannot find Dashboard Control for ' + control);
                    }
                }
            }
        });
        var homeToolbar = AdaptableViewFactory_1.AdaptableDashboardPermanentToolbarFactory.get(StrategyConstants.HomeStrategyId);
        var homeToolbarElement = (React.createElement(rebass_1.Box, { key: 'home', marginTop: 1, marginRight: 1, className: "ab-Dashboard__container ab-Dashboard__container--Home" }, React.createElement(homeToolbar, {
            Adaptable: this.props.Adaptable,
        })));
        return (React.createElement(rebass_1.Box, { padding: 1, paddingTop: 0, className: 'ab-Dashboard' }, this.props.DashboardState.DashboardVisibility != Enums_1.Visibility.Hidden && (React.createElement("div", { className: "ab_no_margin" }, this.props.DashboardState.DashboardVisibility == Enums_1.Visibility.Minimised ? (React.createElement(SimpleButton_1.default, { variant: this.props.DashboardState.MinimisedHomeToolbarButtonStyle.Variant, tone: this.props.DashboardState.MinimisedHomeToolbarButtonStyle.Tone, m: 1, px: 1, py: 1, icon: "arrow-down", tooltip: showInstanceName, className: "ab-Dashboard__expand", onClick: function () { return _this.props.onSetDashboardVisibility(Enums_1.Visibility.Visible); } }, instanceName)) : (React.createElement(rebass_1.Flex, { className: "ab-Dashboard__inner", alignItems: "stretch", style: { zoom: 1 } },
            homeToolbarElement,
            visibleDashboardElements))))));
    };
    return DashboardComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        DashboardState: state.Dashboard,
        EntitlementState: state.Entitlements,
        // need to get these props so we can 'feed' the toolbars...
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        ColorPalette: state.UserInterface.ColorPalette,
        ColumnSorts: state.Grid.ColumnSorts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClick: function (action) { return dispatch(action); },
        onSetDashboardVisibility: function (visibility) {
            return dispatch(DashboardRedux.DashboardSetVisibility(visibility));
        },
    };
}
exports.Dashboard = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
