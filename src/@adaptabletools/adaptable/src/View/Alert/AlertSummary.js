"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var AlertWizard_1 = require("./Wizard/AlertWizard");
var AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var AlertSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AlertSummaryComponent, _super);
    function AlertSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    AlertSummaryComponent.prototype.render = function () {
        var _this = this;
        var strategySummaries = [];
        // title row
        var titleRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.AlertStrategyFriendlyName, FunctionName: StrategyConstants.AlertStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.Alerts.filter(function (item) { return item.ColumnId == _this.props.SummarisedColumn.ColumnId; }), StrategyConstants.AlertStrategyFriendlyName), onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.AlertStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        strategySummaries.push(titleRow);
        // existing items
        this.props.Alerts.map(function (item, index) {
            if (item.ColumnId == _this.props.SummarisedColumn.ColumnId) {
                var detailRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: 'CV' + index, Item1: 'something here?', Item2: _this.props.Adaptable.StrategyService.createAlertDescription(item, _this.props.Columns), ConfigEnity: item, EntityType: StrategyConstants.AlertStrategyFriendlyName, showShare: _this.props.TeamSharingActivated, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, onDelete: AlertRedux.AlertDefinitionDelete(item) }));
                strategySummaries.push(detailRow);
            }
        });
        return (React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableObject && (React.createElement(AlertWizard_1.AlertWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    AlertSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyAlertDefinition();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    AlertSummaryComponent.prototype.onEdit = function (Alert) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(Alert),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    AlertSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    AlertSummaryComponent.prototype.onFinishWizard = function () {
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New) {
            this.props.onAddAlert(this.state.EditedAdaptableObject);
        }
        else {
            this.props.onEditAlert(this.state.EditedAdaptableObject);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    AlertSummaryComponent.prototype.canFinishWizard = function () {
        //  let alertDefinition = this.state.EditedAdaptableObject as AlertDefinition
        return true;
    };
    return AlertSummaryComponent;
}(React.Component));
exports.AlertSummaryComponent = AlertSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        Alerts: state.Alert.AlertDefinitions,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddAlert: function (Alert) { return dispatch(AlertRedux.AlertDefinitionAdd(Alert)); },
        onEditAlert: function (Alert) { return dispatch(AlertRedux.AlertDefinitionEdit(Alert)); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId));
        },
    };
}
exports.AlertSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertSummaryComponent);
