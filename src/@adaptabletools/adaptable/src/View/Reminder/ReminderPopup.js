"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ReminderRedux = require("../../Redux/ActionsReducers/ReminderRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ReminderEntityRow_1 = require("./ReminderEntityRow");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var ScheduleWizard_1 = require("../Schedule/Wizard/ScheduleWizard");
var ReminderPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ReminderPopupComponent, _super);
    function ReminderPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ReminderPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Reminders are alerts that you set by schdedule.',
            React.createElement("br", null),
            'You can choose to show the alert on a given date or on a recurring basis.',
        ];
        var colItems = [
            { Content: 'Message', Size: 4 },
            { Content: 'Type', Size: 2 },
            { Content: 'Schedule', Size: 4 },
            { Content: '', Size: 2 },
        ];
        var Reminders = this.props.Reminders.map(function (reminder, index) {
            return (React.createElement(ReminderEntityRow_1.ReminderEntityRow, { AdaptableObject: reminder, colItems: colItems, key: 'CS' + index, onShare: function () { return _this.props.onShare(reminder); }, TeamSharingActivated: _this.props.TeamSharingActivated, UserFilters: _this.props.UserFilters, Columns: _this.props.Columns, onEdit: function () { return _this.onEdit(reminder); }, onDeleteConfirm: ReminderRedux.ReminderScheduleDelete(reminder), AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Reminder", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ReminderStrategyFriendlyName, button: newButton, glyphicon: StrategyConstants.ReminderGlyph, infoBody: infoBody },
                this.props.Reminders.length == 0 ? (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a new Reminder that will trigger an alert according to a schedule set by you.")) : (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: Reminders })),
                this.state.EditedAdaptableObject != null && (React.createElement(ScheduleWizard_1.ScheduleWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    ReminderPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyReminder(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ReminderPopupComponent.prototype.onEdit = function (reminder) {
        var clonedObject = Helper_1.Helper.cloneObject(reminder);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ReminderPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ReminderPopupComponent.prototype.onFinishWizard = function () {
        var reminder = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditReminder(reminder);
        }
        else {
            this.props.onAddReminder(reminder);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ReminderPopupComponent.prototype.canFinishWizard = function () {
        var reminder = this.state.EditedAdaptableObject;
        if (reminder.Alert == null && reminder.Schedule == null) {
            return false;
        }
        if (reminder.Schedule.Hour == null || reminder.Schedule.Minute == null) {
            return false;
        }
        if (reminder.Schedule.OneOffDate == null &&
            ArrayExtensions_1.ArrayExtensions.IsEmpty(reminder.Schedule.DaysOfWeek)) {
            return false;
        }
        return true;
    };
    return ReminderPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        Reminders: state.Reminder.Reminders,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddReminder: function (reminder) {
            return dispatch(ReminderRedux.ReminderScheduleAdd(reminder));
        },
        onEditReminder: function (reminder) {
            return dispatch(ReminderRedux.ReminderScheduleEdit(reminder));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ReminderStrategyId));
        },
    };
}
exports.ReminderPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ReminderPopupComponent);
