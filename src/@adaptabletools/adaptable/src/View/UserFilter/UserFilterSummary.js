"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var UserFilterWizard_1 = require("./Wizard/UserFilterWizard");
var UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var UserFilterSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterSummaryComponent, _super);
    function UserFilterSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    UserFilterSummaryComponent.prototype.render = function () {
        var _this = this;
        var strategySummaries = [];
        // title row
        var titleRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.UserFilterStrategyFriendlyName, FunctionName: StrategyConstants.UserFilterStrategyId, StrategySummary: this.getSummary(), onNew: function () { return _this.onNew(); }, NewButtonDisabled: !this.isFilterable(), NewButtonTooltip: StrategyConstants.UserFilterStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        strategySummaries.push(titleRow);
        // existing items
        this.props.UserFilters.map(function (item, index) {
            if (item.ColumnId == _this.props.SummarisedColumn.ColumnId) {
                var detailRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: item.Uuid, Item1: item.Name, Item2: _this.getDescription(item), ConfigEnity: item, showShare: _this.props.TeamSharingActivated, showEdit: _this.isFilterable(), EntityType: StrategyConstants.UserFilterStrategyFriendlyName, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, onDelete: UserFilterRedux.UserFilterDelete(item) }));
                strategySummaries.push(detailRow);
            }
        });
        return (React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableObject && (React.createElement(UserFilterWizard_1.UserFilterWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, SelectedColumnId: this.props.SummarisedColumn.ColumnId, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    UserFilterSummaryComponent.prototype.getSummary = function () {
        var _this = this;
        if (!this.isColumnFilterable()) {
            return 'Column is not filterable';
        }
        return Helper_1.Helper.ReturnItemCount(this.props.UserFilters.filter(function (uf) { return uf.ColumnId == _this.props.SummarisedColumn.ColumnId; }), StrategyConstants.UserFilterStrategyFriendlyName);
    };
    UserFilterSummaryComponent.prototype.getDescription = function (userFilter) {
        if (!this.isColumnFilterable()) {
            return 'Column is not filterable';
        }
        return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns);
    };
    UserFilterSummaryComponent.prototype.isFilterable = function () {
        if (!this.isColumnFilterable()) {
            return false;
        }
        return true;
    };
    UserFilterSummaryComponent.prototype.isColumnFilterable = function () {
        if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
            return false;
        }
        return true;
    };
    UserFilterSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyUserFilter();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    UserFilterSummaryComponent.prototype.onEdit = function (UserFilter) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(UserFilter),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    UserFilterSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    UserFilterSummaryComponent.prototype.onFinishWizard = function () {
        var userFilter = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditUserFilter(userFilter);
        }
        else {
            this.props.onAddUserFilter(userFilter);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    UserFilterSummaryComponent.prototype.canFinishWizard = function () {
        var userFilter = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(userFilter.Name) &&
            StringExtensions_1.StringExtensions.IsNotEmpty(userFilter.ColumnId) &&
            ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(userFilter.Expression));
    };
    return UserFilterSummaryComponent;
}(React.Component));
exports.UserFilterSummaryComponent = UserFilterSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUserFilter: function (UserFilter) {
            return dispatch(UserFilterRedux.UserFilterAdd(UserFilter));
        },
        onEditUserFilter: function (UserFilter) {
            return dispatch(UserFilterRedux.UserFilterEdit(UserFilter));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId));
        },
    };
}
exports.UserFilterSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(UserFilterSummaryComponent);
