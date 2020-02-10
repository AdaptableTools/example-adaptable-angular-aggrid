"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var CustomSortWizard_1 = require("./Wizard/CustomSortWizard");
var CustomSortRedux = require("../../Redux/ActionsReducers/CustomSortRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var CustomSortSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortSummaryComponent, _super);
    function CustomSortSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    CustomSortSummaryComponent.prototype.render = function () {
        var _this = this;
        var customSort = this.props.CustomSorts.find(function (c) { return c.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var noCustomSort = customSort == null;
        var customSortRow;
        if (!this.props.SummarisedColumn.Sortable) {
            customSortRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.CustomSortStrategyFriendlyName, FunctionName: StrategyConstants.CustomSortStrategyId, StrategySummary: 'Column is not sortable', NewButtonDisabled: true, onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.CustomSortStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        }
        else if (noCustomSort) {
            // title row
            customSortRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.CustomSortStrategyFriendlyName, FunctionName: StrategyConstants.CustomSortStrategyId, StrategySummary: 'No Custom Sort Set', onNew: function () { return _this.onNew(); }, AccessLevel: this.props.AccessLevel, NewButtonTooltip: StrategyConstants.CustomSortStrategyFriendlyName }));
        }
        else {
            customSortRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.CustomSortStrategyFriendlyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.CustomSortStrategyId }), Item2: customSort.SortedValues.join(', '), ConfigEnity: customSort, EntityType: StrategyConstants.CustomSortStrategyFriendlyName, onEdit: function () { return _this.onEdit(customSort); }, onShare: function () { return _this.props.onShare(customSort); }, showShare: this.props.TeamSharingActivated, onDelete: CustomSortRedux.CustomSortDelete(customSort), showBold: true }));
        }
        return (React.createElement("div", null,
            customSortRow,
            this.state.EditedAdaptableObject && (React.createElement(CustomSortWizard_1.CustomSortWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.CustomSorts, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    CustomSortSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    CustomSortSummaryComponent.prototype.onEdit = function (customSort) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(customSort),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    CustomSortSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CustomSortSummaryComponent.prototype.onFinishWizard = function () {
        var customSort = this.state.EditedAdaptableObject;
        if (this.props.CustomSorts.find(function (x) { return x.ColumnId == customSort.ColumnId; })) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CustomSortSummaryComponent.prototype.canFinishWizard = function () {
        var customSort = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues));
    };
    return CustomSortSummaryComponent;
}(React.Component));
exports.CustomSortSummaryComponent = CustomSortSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        CustomSorts: state.CustomSort.CustomSorts,
        Entitlements: state.Entitlements.FunctionEntitlements,
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
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId));
        },
    };
}
exports.CustomSortSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CustomSortSummaryComponent);
