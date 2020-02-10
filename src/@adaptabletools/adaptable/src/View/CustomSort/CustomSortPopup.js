"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var CustomSortRedux = require("../../Redux/ActionsReducers/CustomSortRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var CustomSortEntityRow_1 = require("./CustomSortEntityRow");
var CustomSortWizard_1 = require("./Wizard/CustomSortWizard");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var rebass_1 = require("rebass");
var EmptyContent_1 = require("../../components/EmptyContent");
var CustomSortPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortPopupComponent, _super);
    function CustomSortPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    CustomSortPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                var columnId_1 = this.props.PopupParams.columnId;
                if (this.props.PopupParams.action == 'New') {
                    var newCustomSort = ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort();
                    newCustomSort.ColumnId = columnId_1;
                    this.onNewFromColumn(newCustomSort);
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var editCustomSort = this.props.CustomSorts.find(function (x) { return x.ColumnId == columnId_1; });
                    this.onEdit(editCustomSort);
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    CustomSortPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Custom Sorts enable you to create your own sort orders for columns where the default (alphabetical ascending or descending) is insufficient.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Use the Wizard to specify and order the column values in the Sort.',
            React.createElement("br", null),
            React.createElement("br", null),
            'A Custom Sort can contain as many column values as required; any values not contained in the Custom Sort will be sorted alphabetically ',
            React.createElement("strong", null, "after"),
            ' the sort order has been applied.',
        ];
        var colItems = [
            { Content: 'Column', Size: 3 },
            { Content: 'Sort Order', Size: 7 },
            { Content: '', Size: 2 },
        ];
        var customSorts = this.props.CustomSorts.map(function (customSort, index) {
            return (React.createElement(CustomSortEntityRow_1.CustomSortEntityRow, { colItems: colItems, AdaptableObject: customSort, key: customSort.Uuid, onEdit: function () { return _this.onEdit(customSort); }, TeamSharingActivated: _this.props.TeamSharingActivated, onShare: function () { return _this.props.onShare(customSort); }, onDeleteConfirm: CustomSortRedux.CustomSortDelete(customSort), ColumnLabel: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, _this.props.Columns), AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Custom Sort", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.CustomSortStrategyFriendlyName, infoBody: infoBody, button: newButton, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.CustomSortGlyph },
                customSorts.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: customSorts })) : (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a bespoke sort order for a selected column.")),
                this.state.EditedAdaptableObject && (React.createElement(CustomSortWizard_1.CustomSortWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.CustomSorts, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    CustomSortPopupComponent.prototype.onEdit = function (customSort) {
        //so we dont mutate original object
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(customSort),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    CustomSortPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    CustomSortPopupComponent.prototype.onNewFromColumn = function (customsort) {
        var clonedObject = Helper_1.Helper.cloneObject(customsort);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 1,
        });
    };
    CustomSortPopupComponent.prototype.onCloseWizard = function () {
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
    CustomSortPopupComponent.prototype.onFinishWizard = function () {
        var customSort = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    CustomSortPopupComponent.prototype.canFinishWizard = function () {
        var customSort = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues));
    };
    return CustomSortPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CustomSorts: state.CustomSort.CustomSorts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddCustomSort: function (customSort) {
            return dispatch(CustomSortRedux.CustomSortAdd(customSort));
        },
        onEditCustomSort: function (customSort) {
            return dispatch(CustomSortRedux.CustomSortEdit(customSort));
        },
        onClearPopupParams: function () { return dispatch(PopupRedux.PopupClearParam()); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId));
        },
    };
}
exports.CustomSortPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CustomSortPopupComponent);
