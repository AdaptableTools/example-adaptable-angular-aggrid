"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PlusMinusWizard_1 = require("./Wizard/PlusMinusWizard");
var PlusMinusRedux = require("../../Redux/ActionsReducers/PlusMinusRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var PlusMinusSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusSummaryComponent, _super);
    function PlusMinusSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    PlusMinusSummaryComponent.prototype.render = function () {
        var _this = this;
        var strategySummaries = [];
        // title row
        var titleRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.PlusMinusStrategyFriendlyName, FunctionName: StrategyConstants.PlusMinusStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.PlusMinusRules.filter(function (item) { return item.ColumnId == _this.props.SummarisedColumn.ColumnId; }), 'Plus Minus Condition'), onNew: function () { return _this.onNew(); }, NewButtonTooltip: 'Plus / Minus Rule', AccessLevel: this.props.AccessLevel }));
        strategySummaries.push(titleRow);
        // existing items
        this.props.PlusMinusRules.map(function (item, index) {
            if (item.ColumnId == _this.props.SummarisedColumn.ColumnId) {
                var detailRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: 'PM' + index, Item1: 'Nudge Value: ' + item.NudgeValue, Item2: _this.wrapExpressionDescription(ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(item.Expression, _this.props.Columns)), ConfigEnity: item, showShare: _this.props.TeamSharingActivated, EntityType: StrategyConstants.PlusMinusStrategyFriendlyName, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, onDelete: PlusMinusRedux.PlusMinusRuleDelete(item) }));
                strategySummaries.push(detailRow);
            }
        });
        return (React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableObject && (React.createElement(PlusMinusWizard_1.PlusMinusWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, SelectedColumnId: this.props.SummarisedColumn.ColumnId, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    PlusMinusSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyPlusMinusRule();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    PlusMinusSummaryComponent.prototype.onEdit = function (PlusMinus) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(PlusMinus),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    PlusMinusSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    PlusMinusSummaryComponent.prototype.onFinishWizard = function () {
        var plusMinus = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditPlusMinusRule(plusMinus);
        }
        else {
            this.props.onAddPlusMinusRule(plusMinus);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    PlusMinusSummaryComponent.prototype.canFinishWizard = function () {
        var plusMinus = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
            (plusMinus.IsDefaultNudge ||
                ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyOrValidExpression(plusMinus.Expression)));
    };
    PlusMinusSummaryComponent.prototype.wrapExpressionDescription = function (expressionDescription) {
        return expressionDescription == 'Any' ? '[Default Column Nudge Value]' : expressionDescription;
    };
    return PlusMinusSummaryComponent;
}(React.Component));
exports.PlusMinusSummaryComponent = PlusMinusSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        PlusMinusRules: state.PlusMinus.PlusMinusRules,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPlusMinusRule: function (PlusMinusRule) {
            return dispatch(PlusMinusRedux.PlusMinusRuleAdd(PlusMinusRule));
        },
        onEditPlusMinusRule: function (PlusMinusRule) {
            return dispatch(PlusMinusRedux.PlusMinusRuleEdit(PlusMinusRule));
        },
        onClearPopupParams: function () { return dispatch(PopupRedux.PopupClearParam()); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PlusMinusStrategyId));
        },
    };
}
exports.PlusMinusSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PlusMinusSummaryComponent);
