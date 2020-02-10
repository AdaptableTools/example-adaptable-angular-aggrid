"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var AlertWizard_1 = require("./Wizard/AlertWizard");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var AlertEntityRow_1 = require("./AlertEntityRow");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EmptyContent_1 = require("../../components/EmptyContent");
var AlertPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AlertPopupComponent, _super);
    function AlertPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    AlertPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                if (this.props.PopupParams.action == 'New') {
                    var alertDefinition = ObjectFactory_1.ObjectFactory.CreateEmptyAlertDefinition();
                    alertDefinition.ColumnId = this.props.PopupParams.columnId;
                    this.setState({
                        EditedAdaptableObject: alertDefinition,
                        WizardStartIndex: 1,
                        WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
                    });
                }
            }
        }
    };
    AlertPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Alert Definitions define which changes to the source data will trigger an Alert.',
            React.createElement("br", null),
            React.createElement("br", null),
            'An Alert will appear either as a popup or in the alerts toolbar.',
        ];
        var colItems = [
            { Content: 'Alert Definition', Size: 4 },
            { Content: 'Type', Size: 2 },
            { Content: 'Expression', Size: 4 },
            { Content: '', Size: 2 },
        ];
        var alertEntities = this.props.AlertDefinitions.map(function (alertDefinition, index) {
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(alertDefinition.ColumnId, _this.props.Columns);
            return (React.createElement(AlertEntityRow_1.AlertEntityRow, { key: index, colItems: colItems, AdaptableObject: alertDefinition, Column: column, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function () { return _this.onEdit(alertDefinition); }, onShare: function () { return _this.props.onShare(alertDefinition); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: AlertRedux.AlertDefinitionDelete(alertDefinition), onChangeMessageType: function (alertDef, messageType) {
                    return _this.onMessageTypeChanged(alertDef, messageType);
                }, AccessLevel: _this.props.AccessLevel, StrategyService: _this.props.Adaptable.StrategyService }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.createAlertDefinition(); }, tooltip: "Create Alert", AccessLevel: this.props.AccessLevel }));
        var startWizardText = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
            ? 'You have no Alert Definitions.'
            : "Click 'New' to start creating Alert Definitions.  An alert will be triggered whenever an edit - or external data change - matches the condition in the Alert Definition.";
        return (React.createElement(PanelWithButton_1.PanelWithButton, { bodyProps: { padding: 0 }, headerText: StrategyConstants.AlertStrategyFriendlyName, button: newButton, glyphicon: StrategyConstants.AlertGlyph, infoBody: infoBody },
            alertEntities.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: alertEntities })) : (React.createElement(EmptyContent_1.default, null, startWizardText)),
            this.state.WizardStatus != EditableConfigEntityState_1.WizardStatus.None && (React.createElement(AlertWizard_1.AlertWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    AlertPopupComponent.prototype.createAlertDefinition = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyAlertDefinition(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    AlertPopupComponent.prototype.onMessageTypeChanged = function (alertDefinition, messageType) {
        alertDefinition.MessageType = messageType;
        this.props.onEditAlert(alertDefinition);
    };
    AlertPopupComponent.prototype.onEdit = function (alert) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(alert),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    AlertPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    AlertPopupComponent.prototype.onFinishWizard = function () {
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New) {
            this.props.onAddAlert(this.state.EditedAdaptableObject);
        }
        else if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditAlert(this.state.EditedAdaptableObject);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    AlertPopupComponent.prototype.canFinishWizard = function () {
        var AlertRule = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(AlertRule.ColumnId) &&
            ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyOrValidExpression(AlertRule.Expression));
    };
    return AlertPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        AlertDefinitions: state.Alert.AlertDefinitions,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddAlert: function (alert) { return dispatch(AlertRedux.AlertDefinitionAdd(alert)); },
        onEditAlert: function (alert) { return dispatch(AlertRedux.AlertDefinitionEdit(alert)); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId));
        },
    };
}
exports.AlertPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertPopupComponent);
