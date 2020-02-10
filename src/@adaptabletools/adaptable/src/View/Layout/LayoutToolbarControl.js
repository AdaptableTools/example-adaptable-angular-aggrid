"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var ButtonSave_1 = require("../Components/Buttons/ButtonSave");
var ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var ButtonUndo_1 = require("../Components/Buttons/ButtonUndo");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var Dropdown_1 = require("../../components/Dropdown");
var rebass_1 = require("rebass");
var join_1 = require("../../components/utils/join");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var LayoutToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutToolbarControlComponent, _super);
    function LayoutToolbarControlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var nonDefaultLayouts = this.props.Layouts.filter(function (l) { return l.Name != GeneralConstants.DEFAULT_LAYOUT; });
        var layoutEntity = nonDefaultLayouts.find(function (x) { return x.Name == _this.props.CurrentLayout || x.Uuid == _this.props.CurrentLayout; });
        // this is wrong at the moment an always returning true
        // but not going to worry until we test with non autosavelayouts (that dont think anyone uses)
        // but worth fixing and then making that save button enabled depending on whether this is true
        var isModifiedLayout = this.props.Adaptable.LayoutService.isLayoutModified(layoutEntity);
        var isManualSaveLayout = this.props.Adaptable.adaptableOptions.layoutOptions.autoSaveLayouts == false;
        var availableLayoutOptions = nonDefaultLayouts.map(function (layout, index) {
            return tslib_1.__assign(tslib_1.__assign({}, layout), { label: layout.Name, value: layout.Name });
        });
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "row" },
            React.createElement(Dropdown_1.default, { disabled: availableLayoutOptions.length == 0, style: { minWidth: 160 }, marginRight: 2, className: "ab-DashboardToolbar__Layout__select", placeholder: "Select Layout", value: layoutEntity ? layoutEntity.Name : null, options: availableLayoutOptions, onChange: function (layoutName) {
                    _this.onSelectedLayoutChanged(layoutName);
                }, clearButtonProps: {
                    tooltip: 'Clear layout',
                    disabled: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT,
                    AccessLevel: this.props.AccessLevel,
                }, showClearButton: this.props.CurrentLayout !== GeneralConstants.DEFAULT_LAYOUT }),
            React.createElement(rebass_1.Flex, { flexDirection: "row", className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '', 'ab-DashboardToolbar__Layout__wrap') },
                isManualSaveLayout && (React.createElement(ButtonSave_1.ButtonSave, { className: "ab-DashboardToolbar__Layout__save", onClick: function () { return _this.onSaveLayout(); }, tooltip: "Save Changes to Current Layout", disabled: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT, AccessLevel: this.props.AccessLevel })),
                React.createElement(ButtonNew_1.ButtonNew, { children: null, tone: "neutral", variant: "text", className: "ab-DashboardToolbar__Layout__new", onClick: function () { return _this.props.onNewLayout(); }, tooltip: "Create a new Layout", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonUndo_1.ButtonUndo, { className: "ab-DashboardToolbar__Layout__undo", onClick: function () {
                        return isManualSaveLayout
                            ? _this.onSelectedLayoutChanged(_this.props.CurrentLayout)
                            : _this.onRestoreLayout();
                    }, disabled: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT //|| !isModifiedLayout
                    , tooltip: isManualSaveLayout ? 'Undo Layout Changes' : 'Restore Layout', AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonDelete_1.ButtonDelete, { tooltip: "Delete Layout", className: "ab-DashboardToolbar__Layout__delete", disabled: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT, ConfirmAction: LayoutRedux.LayoutDelete(layoutEntity), ConfirmationMsg: "Are you sure you want to delete '" + this.props.CurrentLayout + "'?", ConfirmationTitle: 'Delete Layout', AccessLevel: this.props.AccessLevel }))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__Layout", headerText: StrategyConstants.LayoutStrategyFriendlyName, glyphicon: StrategyConstants.LayoutGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.LayoutStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    LayoutToolbarControlComponent.prototype.onSelectedLayoutChanged = function (layoutName) {
        if (StringExtensions_1.default.IsNotNullOrEmpty(layoutName)) {
            this.props.onSelectLayout(layoutName);
        }
        else {
            this.props.onSelectLayout(GeneralConstants.DEFAULT_LAYOUT);
        }
    };
    LayoutToolbarControlComponent.prototype.onSaveLayout = function () {
        var _this = this;
        var currentLayoutObject = this.props.Layouts.find(function (l) { return l.Name == _this.props.CurrentLayout; });
        if (currentLayoutObject) {
            var gridState = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;
            var visibleColumns = this.props.Columns.filter(function (c) { return c.Visible; });
            var layoutToSave = {
                Uuid: currentLayoutObject.Uuid,
                Name: this.props.CurrentLayout,
                Columns: currentLayoutObject.Columns,
                ColumnSorts: currentLayoutObject.ColumnSorts,
                VendorGridInfo: gridState,
                AdaptableGridInfo: {
                    CurrentColumns: visibleColumns ? visibleColumns.map(function (x) { return x.ColumnId; }) : [],
                    CurrentColumnSorts: this.props.ColumnSorts,
                },
            };
            this.props.onSaveLayout(layoutToSave);
        }
    };
    LayoutToolbarControlComponent.prototype.onRestoreLayout = function () {
        var _this = this;
        var currentLayoutObject = this.props.Layouts.find(function (l) { return l.Name == _this.props.CurrentLayout; });
        if (currentLayoutObject) {
            this.props.onRestoreLayout(currentLayoutObject);
        }
    };
    return LayoutToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CurrentLayout: state.Layout.CurrentLayout,
        Layouts: state.Layout.Layouts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectLayout: function (layoutName) { return dispatch(LayoutRedux.LayoutSelect(layoutName)); },
        onSaveLayout: function (layout) { return dispatch(LayoutRedux.LayoutSave(layout)); },
        onRestoreLayout: function (layout) { return dispatch(LayoutRedux.LayoutRestore(layout)); },
        onNewLayout: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup, {
                action: 'New',
                source: 'Toolbar',
            }));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup));
        },
    };
}
exports.LayoutToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LayoutToolbarControlComponent);
