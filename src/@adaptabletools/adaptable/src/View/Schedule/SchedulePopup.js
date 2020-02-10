"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ReminderRedux = require("../../Redux/ActionsReducers/ReminderRedux");
var ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
var IPushPullRedux = require("../../Redux/ActionsReducers/IPushPullRedux");
var Glue42Redux = require("../../Redux/ActionsReducers/Glue42Redux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var ScheduleEntityRow_1 = require("./ScheduleEntityRow");
var ScheduleWizard_1 = require("./Wizard/ScheduleWizard");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var DropdownButton_1 = require("../../components/DropdownButton");
var plus_1 = require("../../components/icons/plus");
var SchedulePopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SchedulePopupComponent, _super);
    function SchedulePopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    SchedulePopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.value) {
                if (this.props.PopupParams.action == 'New') {
                    var baseSchedule = this.props.PopupParams.value;
                    if (baseSchedule) {
                        this.onNew(baseSchedule);
                    }
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    SchedulePopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Use schedules to ensure that actions happen at set times.',
            React.createElement("br", null),
            'You can create schedules for Reminders, Exports (reports) or to send data to ipushpull or Glue42.',
        ];
        var colItems = [
            { Content: 'Type', Size: 2 },
            { Content: 'Details', Size: 5 },
            { Content: 'Schedule', Size: 3 },
            { Content: '', Size: 2 },
        ];
        // we need to do this for all 3 schedule types and then concact them into one array
        var allSchedules = [];
        allSchedules.push.apply(allSchedules, tslib_1.__spread(this.props.Reminders));
        allSchedules.push.apply(allSchedules, tslib_1.__spread(this.props.ReportSchedules));
        if (this.props.Adaptable.api.iPushPullApi.isIPushPullRunning()) {
            allSchedules.push.apply(allSchedules, tslib_1.__spread(this.props.IPushPullSchedules));
        }
        if (this.props.Adaptable.api.glue42Api.isGlue42Available()) {
            allSchedules.push.apply(allSchedules, tslib_1.__spread(this.props.Glue42Schedules));
        }
        var allScheduleRows = allSchedules.map(function (baseSchedule, index) {
            var deleteAction;
            switch (baseSchedule.ScheduleType) {
                case Enums_1.ScheduleType.Reminder:
                    deleteAction = ReminderRedux.ReminderScheduleDelete(baseSchedule);
                    break;
                case Enums_1.ScheduleType.Report:
                    deleteAction = ExportRedux.ReportScheduleDelete(baseSchedule);
                    break;
                case Enums_1.ScheduleType.iPushPull:
                    deleteAction = IPushPullRedux.IPushPullScheduleDelete(baseSchedule);
                    break;
                case Enums_1.ScheduleType.Glue42:
                    deleteAction = Glue42Redux.Glue42ScheduleDelete(baseSchedule);
                    break;
            }
            return (React.createElement(ScheduleEntityRow_1.ScheduleEntityRow, { AdaptableObject: baseSchedule, colItems: colItems, key: 'CS' + index, onShare: function () { return _this.props.onShare(baseSchedule); }, TeamSharingActivated: _this.props.TeamSharingActivated, UserFilters: _this.props.UserFilters, Columns: _this.props.Columns, onEdit: function () { return _this.onEdit(baseSchedule); }, onDeleteConfirm: deleteAction, AccessLevel: _this.props.AccessLevel }));
        });
        var reminderMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onCreateSchedule(Enums_1.ScheduleType.Reminder); },
            label: 'Reminder',
        };
        var reportMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onCreateSchedule(Enums_1.ScheduleType.Report); },
            label: 'Report',
        };
        var iPushPullMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onCreateSchedule(Enums_1.ScheduleType.iPushPull); },
            label: 'ipushpull',
        };
        var glue42MenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onCreateSchedule(Enums_1.ScheduleType.Glue42); },
            label: 'Glue42',
        };
        var scheduleMenuItems = [reminderMenuItem, reportMenuItem];
        if (this.props.Adaptable.api.iPushPullApi.isIPushPullRunning()) {
            scheduleMenuItems.push(iPushPullMenuItem);
        }
        if (this.props.Adaptable.api.glue42Api.isGlue42Available()) {
            scheduleMenuItems.push(glue42MenuItem);
        }
        var dropdownButton = (React.createElement(DropdownButton_1.default, { tooltip: "Create New Schedule", variant: "raised", tone: "accent", columns: ['label'], items: scheduleMenuItems, style: { zIndex: 100 } },
            React.createElement(plus_1.default, null),
            " New"));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ScheduleStrategyFriendlyName, button: dropdownButton, bodyProps: { padding: 0 }, bodyScroll: true, glyphicon: StrategyConstants.ScheduleGlyph, infoBody: infoBody },
                allSchedules.length == 0 ? (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a new Schedule.")) : (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: allScheduleRows })),
                this.state.EditedAdaptableObject != null && (React.createElement(ScheduleWizard_1.ScheduleWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    SchedulePopupComponent.prototype.onCreateSchedule = function (scheduleType) {
        var baseSchedule;
        switch (scheduleType) {
            case Enums_1.ScheduleType.Reminder:
                baseSchedule = ObjectFactory_1.ObjectFactory.CreateEmptyReminderSchedule();
                break;
            case Enums_1.ScheduleType.Report:
                baseSchedule = ObjectFactory_1.ObjectFactory.CreateEmptyReportSchedule();
                break;
            case Enums_1.ScheduleType.iPushPull:
                baseSchedule = ObjectFactory_1.ObjectFactory.CreateEmptyIPushPullSchedule();
                break;
            case Enums_1.ScheduleType.Glue42:
                baseSchedule = ObjectFactory_1.ObjectFactory.CreateEmptyGlue42Schedule();
                break;
        }
        this.onNew(baseSchedule);
    };
    SchedulePopupComponent.prototype.onNew = function (baseSchedule) {
        this.setState({
            EditedAdaptableObject: baseSchedule,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    SchedulePopupComponent.prototype.onEdit = function (baseSchedule) {
        var clonedObject = Helper_1.Helper.cloneObject(baseSchedule);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    SchedulePopupComponent.prototype.onCloseWizard = function () {
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
    SchedulePopupComponent.prototype.onFinishWizard = function () {
        var baseSchedule = this.state.EditedAdaptableObject;
        switch (baseSchedule.ScheduleType) {
            case Enums_1.ScheduleType.Reminder:
                if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
                    this.props.onEditReminderSchedule(baseSchedule);
                }
                else {
                    this.props.onAddReminderSchedule(baseSchedule);
                }
                break;
            case Enums_1.ScheduleType.Report:
                if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
                    this.props.onEditReportSchedule(baseSchedule);
                }
                else {
                    this.props.onAddReportSchedule(baseSchedule);
                }
                break;
            case Enums_1.ScheduleType.iPushPull:
                if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
                    this.props.onEditIPushPullSchedule(baseSchedule);
                }
                else {
                    this.props.onAddIPushPullSchedule(baseSchedule);
                }
                break;
            case Enums_1.ScheduleType.Glue42:
                if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
                    this.props.onEditGlue42Schedule(baseSchedule);
                }
                else {
                    this.props.onAddGlue42Schedule(baseSchedule);
                }
                break;
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    SchedulePopupComponent.prototype.canFinishWizard = function () {
        var baseSchedule = this.state.EditedAdaptableObject;
        // todo - need to do the type specific checks...
        // if (reminder.Alert == null) {
        //   return false;
        //  }
        if (baseSchedule.Schedule == null) {
            return false;
        }
        if (baseSchedule.Schedule.Hour == null || baseSchedule.Schedule.Minute == null) {
            return false;
        }
        if (baseSchedule.Schedule.OneOffDate == null &&
            ArrayExtensions_1.ArrayExtensions.IsEmpty(baseSchedule.Schedule.DaysOfWeek)) {
            return false;
        }
        return true;
    };
    return SchedulePopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        Reminders: state.Reminder.Reminders,
        ReportSchedules: state.Export.ReportSchedules,
        IPushPullSchedules: state.IPushPull.IPushPullSchedules,
        Glue42Schedules: state.Glue42.Glue42Schedules,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddReminderSchedule: function (reminderSchedule) {
            return dispatch(ReminderRedux.ReminderScheduleAdd(reminderSchedule));
        },
        onEditReminderSchedule: function (reminderSchedule) {
            return dispatch(ReminderRedux.ReminderScheduleEdit(reminderSchedule));
        },
        onAddReportSchedule: function (reportSchedule) {
            return dispatch(ExportRedux.ReportScheduleAdd(reportSchedule));
        },
        onEditReportSchedule: function (reportSchedule) {
            return dispatch(ExportRedux.ReportScheduleEdit(reportSchedule));
        },
        onAddIPushPullSchedule: function (iPushPullSchedule) {
            return dispatch(IPushPullRedux.IPushPullScheduleAdd(iPushPullSchedule));
        },
        onEditIPushPullSchedule: function (iPushPullSchedule) {
            return dispatch(IPushPullRedux.IPushPullScheduleEdit(iPushPullSchedule));
        },
        onAddGlue42Schedule: function (glue42Schedule) {
            return dispatch(Glue42Redux.Glue42ScheduleAdd(glue42Schedule));
        },
        onEditGlue42Schedule: function (glue42Schedule) {
            return dispatch(Glue42Redux.Glue42ScheduleEdit(glue42Schedule));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ScheduleStrategyId));
        },
    };
}
exports.SchedulePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SchedulePopupComponent);
