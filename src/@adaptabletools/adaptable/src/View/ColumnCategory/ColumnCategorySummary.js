"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ColumnCategoryWizard_1 = require("./Wizard/ColumnCategoryWizard");
var ColumnCategoryRedux = require("../../Redux/ActionsReducers/ColumnCategoryRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var ColumnCategorySummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategorySummaryComponent, _super);
    function ColumnCategorySummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ColumnCategorySummaryComponent.prototype.render = function () {
        var _this = this;
        var ColumnCategory = this.props.ColumnCategorys.find(function (lk) {
            return ArrayExtensions_1.ArrayExtensions.ContainsItem(lk.ColumnIds, _this.props.SummarisedColumn.ColumnId);
        });
        var noColumnCategory = ColumnCategory == null;
        var ColumnCategoryRow;
        if (noColumnCategory) {
            ColumnCategoryRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.ColumnCategoryStrategyFriendlyName, FunctionName: StrategyConstants.ColumnCategoryStrategyId, StrategySummary: 'None', onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.ColumnCategoryStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        }
        else {
            ColumnCategoryRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.ColumnCategoryStrategyFriendlyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.ColumnCategoryStrategyId }), Item2: ColumnCategory.ColumnCategoryId, ConfigEnity: ColumnCategory, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.ColumnCategoryStrategyFriendlyName, onEdit: function () { return _this.onEdit(ColumnCategory); }, onShare: function () { return _this.props.onShare(ColumnCategory); }, onDelete: ColumnCategoryRedux.ColumnCategoryDelete(ColumnCategory), showBold: true }));
        }
        return (React.createElement("div", null,
            ColumnCategoryRow,
            this.state.EditedAdaptableObject && (React.createElement(ColumnCategoryWizard_1.ColumnCategoryWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ColumnCategorys: this.props.ColumnCategorys, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    ColumnCategorySummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyColumnCategory();
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ColumnCategorySummaryComponent.prototype.onEdit = function (ColumnCategory) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(ColumnCategory),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ColumnCategorySummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ColumnCategorySummaryComponent.prototype.onFinishWizard = function () {
        //  this.props.onAddUpdateColumnCategory(this.state.EditedAdaptableObjectIndex, this.state.EditedAdaptableObject as ColumnCategory);
        //  this.setState({ EditedAdaptableObject: null, WizardStartIndex: 0, EditedAdaptableObjectIndex: -1, });
    };
    ColumnCategorySummaryComponent.prototype.canFinishWizard = function () {
        //   let ColumnCategory = this.state.EditedAdaptableObject as ColumnCategory
        //   return StringExtensions.IsNotNullOrEmpty(ColumnCategory.ColumnId) &&
        //       StringExtensions.IsNotNullOrEmpty(ColumnCategory.NudgeValue.toString()) && // check its a number??
        //       (ColumnCategory.IsDefaultNudge || ExpressionHelper.IsNotEmptyOrInvalidExpression(ColumnCategory.Expression))
    };
    return ColumnCategorySummaryComponent;
}(React.Component));
exports.ColumnCategorySummaryComponent = ColumnCategorySummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        ColumnCategorys: state.ColumnCategory.ColumnCategories,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        //   onAddUpdateColumnCategory: (index: number, ColumnCategory: ColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryAddUpdateCondition(index, ColumnCategory)),
        onClearPopupParams: function () { return dispatch(PopupRedux.PopupClearParam()); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId));
        },
    };
}
exports.ColumnCategorySummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnCategorySummaryComponent);
