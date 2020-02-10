"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var LayoutWizard_1 = require("./Wizard/LayoutWizard");
var LayoutEntityRow_1 = require("./LayoutEntityRow");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var SimpleButton_1 = require("../../components/SimpleButton");
var LayoutPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutPopupComponent, _super);
    function LayoutPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    LayoutPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action) {
                if (this.props.PopupParams.action == 'New') {
                    this.onNew();
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
        }
    };
    LayoutPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Create layouts - groups of column order, visibility and sorts.',
            React.createElement("br", null),
            React.createElement("br", null),
            'You can create as many layouts as you wish.',
        ];
        var colItems = [
            { Content: 'Current', Size: 1 },
            { Content: 'Name', Size: 2 },
            { Content: 'Details', Size: 7 },
            { Content: '', Size: 2 },
        ];
        var LayoutRows = this.props.Layouts.filter(function (l) { return l.Name != GeneralConstants.DEFAULT_LAYOUT; }).map(function (x, index) {
            return (React.createElement(LayoutEntityRow_1.LayoutEntityRow, { key: x.Uuid, colItems: colItems, IsCurrentLayout: x.Name == _this.props.CurrentLayoutName, AdaptableObject: x, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function () { return _this.onEdit(x); }, onShare: function () { return _this.props.onShare(x); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: LayoutRedux.LayoutDelete(x), onSelect: function () { return _this.props.onSelectLayout(x.Name); }, AccessLevel: _this.props.AccessLevel, LayoutService: _this.props.Adaptable.LayoutService }));
        });
        var newSearchButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onNew(); }, tooltip: "Create New Layout", icon: "plus", tone: "accent", variant: "raised", AccessLevel: this.props.AccessLevel }, "ADD"));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.LayoutStrategyFriendlyName, infoBody: infoBody, button: newSearchButton, glyphicon: StrategyConstants.LayoutGlyph, bodyProps: { padding: 0 } },
                LayoutRows.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: LayoutRows })) : (React.createElement(EmptyContent_1.default, null, "Click 'New' to start creating layouts.")),
                this.state.EditedAdaptableObject != null && (React.createElement(LayoutWizard_1.LayoutWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.Layouts, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ColumnSorts: this.props.ColumnSorts, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    LayoutPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyLayout(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    LayoutPopupComponent.prototype.onEdit = function (layout) {
        var clonedObject = Helper_1.Helper.cloneObject(layout);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    LayoutPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (this.shouldClosePopupOnFinishWizard) {
            this.props.onClosePopup();
        }
    };
    LayoutPopupComponent.prototype.onFinishWizard = function () {
        var _this = this;
        var clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        this.props.onSaveLayout(clonedObject);
        var currentLayout = this.props.Layouts.find(function (l) { return l.Name == _this.props.CurrentLayoutName; });
        var shouldChangeLayout = this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New || currentLayout.Uuid == clonedObject.Uuid;
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (shouldChangeLayout) {
            // its new so make it the selected layout or name has changed.
            this.props.onSelectLayout(clonedObject.Name);
        }
        this.shouldClosePopupOnFinishWizard = false;
    };
    LayoutPopupComponent.prototype.canFinishWizard = function () {
        var layout = this.state.EditedAdaptableObject;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(layout.ColumnSorts)) {
            var canFinish_1 = true;
            layout.ColumnSorts.forEach(function (gs) {
                if (StringExtensions_1.StringExtensions.IsNullOrEmpty(gs.Column)) {
                    canFinish_1 = false;
                }
            });
            if (!canFinish_1) {
                return false;
            }
        }
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(layout.Name) &&
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(layout.Columns));
    };
    return LayoutPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        Layouts: state.Layout.Layouts,
        CurrentLayoutName: state.Layout.CurrentLayout,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSaveLayout: function (layout) { return dispatch(LayoutRedux.LayoutSave(layout)); },
        onSelectLayout: function (selectedSearchName) {
            return dispatch(LayoutRedux.LayoutSelect(selectedSearchName));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LayoutStrategyId));
        },
    };
}
exports.LayoutPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);
