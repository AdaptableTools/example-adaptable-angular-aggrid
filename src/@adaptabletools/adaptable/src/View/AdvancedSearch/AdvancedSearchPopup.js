"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var rebass_1 = require("rebass");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var AdvancedSearchWizard_1 = require("./Wizard/AdvancedSearchWizard");
var AdvancedSearchEntityRow_1 = require("./AdvancedSearchEntityRow");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EmptyContent_1 = require("../../components/EmptyContent");
var AdvancedSearchPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchPopupComponent, _super);
    function AdvancedSearchPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    AdvancedSearchPopupComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action) {
                if (this.props.PopupParams.action == 'New') {
                    this.onNew();
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var currentAdvancedSearch = this.props.AdvancedSearches.find(function (as) { return as.Name == _this.props.CurrentAdvancedSearchName; });
                    if (currentAdvancedSearch) {
                        this.onEdit(currentAdvancedSearch);
                    }
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
        }
    };
    AdvancedSearchPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard.',
        ];
        var startWizardText = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
            ? 'You have no Advanced Searches.'
            : " Click 'New' to start the Advanced Search Wizard to create a new Advanced Search.";
        var colItems = [
            { Content: 'Current', Size: 1 },
            { Content: 'Name', Size: 3 },
            { Content: 'Query', Size: 6 },
            { Content: '', Size: 2 },
        ];
        var advancedSearchRows = this.props.AdvancedSearches.map(function (advancedSearch, index) {
            return (React.createElement(AdvancedSearchEntityRow_1.AdvancedSearchEntityRow, { key: advancedSearch.Uuid || index, colItems: colItems, IsCurrentAdvancedSearch: advancedSearch.Name == _this.props.CurrentAdvancedSearchName, AdaptableObject: advancedSearch, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function (advancedSearch) { return _this.onEdit(advancedSearch); }, onShare: function () { return _this.props.onShare(advancedSearch); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch), onSelect: function () { return _this.props.onSelectAdvancedSearch(advancedSearch.Name); }, AccessLevel: _this.props.AccessLevel }));
        });
        var newSearchButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Conditional Style", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.AdvancedSearchStrategyFriendlyName, infoBody: infoBody, button: newSearchButton, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.AdvancedSearchGlyph },
                advancedSearchRows.length > 0 && (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: advancedSearchRows })),
                advancedSearchRows.length == 0 && (React.createElement(EmptyContent_1.default, null,
                    React.createElement("p", null, startWizardText))),
                this.state.EditedAdaptableObject != null && (React.createElement(AdvancedSearchWizard_1.AdvancedSearchWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.AdvancedSearches, Adaptable: this.props.Adaptable, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    AdvancedSearchPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyAdvancedSearch(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    AdvancedSearchPopupComponent.prototype.onEdit = function (advancedSearch) {
        var clonedObject = Helper_1.Helper.cloneObject(advancedSearch);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    AdvancedSearchPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        // if we've come from the Toolbar and the Searches are identical then close the main popup
        if (this.props.PopupParams &&
            this.props.PopupParams.source &&
            this.props.PopupParams.source == 'Toolbar') {
            if (this.props.AdvancedSearches ===
                this.props.Adaptable.api.advancedSearchApi.getAllAdvancedSearch()) {
                this.props.onClosePopup();
            }
        }
        if (this.shouldClosePopupOnFinishWizard) {
            this.props.onClosePopup();
        }
    };
    AdvancedSearchPopupComponent.prototype.onFinishWizard = function () {
        var _this = this;
        var clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        var currentSearch = this.props.AdvancedSearches.filter(function (s) { return s.Name === _this.props.CurrentAdvancedSearchName; })[0];
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New) {
            this.props.onAddAdvancedSearch(clonedObject);
        }
        else if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditAdvancedSearch(clonedObject);
        }
        var wizardStatus = this.state.WizardStatus; // need this?
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (wizardStatus == EditableConfigEntityState_1.WizardStatus.New ||
            (currentSearch && currentSearch.Uuid === clonedObject.Uuid)) {
            // it its new - make it the new search
            // or if we are editing the current search - but might have changed the name
            this.props.onSelectAdvancedSearch(clonedObject.Name);
        }
        this.shouldClosePopupOnFinishWizard = false;
    };
    AdvancedSearchPopupComponent.prototype.canFinishWizard = function () {
        var advancedSearch = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(advancedSearch.Name) &&
            ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(advancedSearch.Expression));
    };
    return AdvancedSearchPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddAdvancedSearch: function (advancedSearch) {
            return dispatch(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch));
        },
        onEditAdvancedSearch: function (advancedSearch) {
            return dispatch(AdvancedSearchRedux.AdvancedSearchEdit(advancedSearch));
        },
        onSelectAdvancedSearch: function (selectedSearchName) {
            return dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AdvancedSearchStrategyId));
        },
    };
}
exports.AdvancedSearchPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPopupComponent);
