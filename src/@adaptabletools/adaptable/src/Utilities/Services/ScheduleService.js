"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReminderRedux = require("../../Redux/ActionsReducers/ReminderRedux");
var ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
var IPushPullRedux = require("../../Redux/ActionsReducers/IPushPullRedux");
var Glue42Redux = require("../../Redux/ActionsReducers/Glue42Redux");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var DateExtensions_1 = require("../Extensions/DateExtensions");
var dateTimeouts = {};
var NodeSchedule = {
    scheduleJob: function (date, fn) {
        var timestamp = +date;
        var now = Date.now();
        var timeUntilDate = timestamp - now;
        if (timeUntilDate > 0) {
            var timeoutId = +setTimeout(function () {
                fn();
            }, timeUntilDate);
            dateTimeouts[timestamp] = timeoutId;
        }
        return {
            cancel: function () {
                var theTimeout = dateTimeouts[timestamp];
                if (theTimeout != undefined) {
                    clearTimeout(theTimeout);
                }
            },
        };
    },
};
/**
 * This class is used for managing scheduling of Reports and Reminders
 * It listens to any changes in the Reminder or the Export state and tells the respective stragies to refresh
 * It also createsa daily job to run at midnight that will refresh Adaptable - this is so that date-based schedules can jump to the new day
 *
 * TODO - we need to implement a way to make sure that if the user doesn't reload the browser for 5 days and has a reminder for each of those days,
 * we need to make sure all of those occurences are triggered
 */
var ScheduleService = /** @class */ (function () {
    function ScheduleService(adaptable) {
        var _this = this;
        this.adaptable = adaptable;
        this.adaptable = adaptable;
        this.reminderJobs = [];
        this.exportJobs = [];
        this.iPushPullJobs = [];
        this.glue42Jobs = [];
        this.AddMidnightRefreshSchedule();
        this.adaptable.api.eventApi.on('AdaptableReady', function () {
            setTimeout(function () {
                _this.updateReminderJobs();
                _this.updateReportJobs();
                _this.updateIPushPullJobs();
                _this.updateGlue42Jobs();
            }, 2000);
        });
        this.adaptable._on('GridReloaded', function () {
            // this.scheduleIPushPullReports();
        });
        this.adaptable.AdaptableStore.onAny(function (eventName) {
            if (_this.adaptable.isInitialised) {
                if (eventName == ReminderRedux.REMINDER_SCHEDULE_ADD ||
                    eventName == ReminderRedux.REMINDER_SCHEDULE_EDIT ||
                    eventName == ReminderRedux.REMINDER_SCHEDULE_DELETE) {
                    _this.updateReminderJobs();
                }
                else if (eventName == ExportRedux.REPORT_SCHEDULE_ADD ||
                    eventName == ExportRedux.REPORT_SCHEDULE_EDIT ||
                    eventName == ExportRedux.REPORT_SCHEDULE_DELETE) {
                    _this.updateReportJobs();
                }
                else if (eventName == IPushPullRedux.IPUSHPULL_SCHEDULE_ADD ||
                    eventName == IPushPullRedux.IPUSHPULL_SCHEDULE_EDIT ||
                    eventName == IPushPullRedux.IPUSHPULL_SCHEDULE_DELETE) {
                    _this.updateIPushPullJobs();
                }
                else if (eventName == Glue42Redux.GLUE42_SCHEDULE_ADD ||
                    eventName == Glue42Redux.GLUE42_SCHEDULE_EDIT ||
                    eventName == Glue42Redux.GLUE42_SCHEDULE_DELETE) {
                    _this.updateGlue42Jobs();
                }
            }
        });
    }
    ScheduleService.prototype.updateReminderJobs = function () {
        var _this = this;
        this.clearAllReminderJobs();
        this.adaptable.api.scheduleApi
            .getAllReminderSchedule()
            .forEach(function (reminderSchedule) {
            _this.AddReminderSchedule(reminderSchedule);
        });
    };
    ScheduleService.prototype.updateReportJobs = function () {
        var _this = this;
        this.clearAllExportJobs();
        this.adaptable.api.scheduleApi
            .getAllReportSchedule()
            .forEach(function (reportSchedule) {
            _this.AddReportSchedule(reportSchedule);
        });
    };
    ScheduleService.prototype.updateIPushPullJobs = function () {
        var _this = this;
        this.clearAllIPushPullJobs();
        this.adaptable.api.scheduleApi
            .getAllIPushPullSchedule()
            .forEach(function (iPushPullSchedule) {
            _this.AddIPushPullSchedule(iPushPullSchedule);
        });
    };
    ScheduleService.prototype.updateGlue42Jobs = function () {
        var _this = this;
        this.clearAllGlue42Jobs();
        this.adaptable.api.scheduleApi
            .getAllGlue42Schedule()
            .forEach(function (glue42Schedule) {
            _this.AddGlue42Schedule(glue42Schedule);
        });
    };
    ScheduleService.prototype.AddReminderSchedule = function (reminderSchedule) {
        var _this = this;
        var date = this.getDateFromSchedule(reminderSchedule.Schedule);
        if (date != null) {
            var alertJob = NodeSchedule.scheduleJob(date, function () {
                _this.adaptable.api.alertApi.displayAlert(reminderSchedule.Alert);
            });
            this.reminderJobs.push(alertJob);
        }
    };
    ScheduleService.prototype.AddReportSchedule = function (reportSchedule) {
        var _this = this;
        var date = this.getDateFromSchedule(reportSchedule.Schedule);
        if (date != null) {
            var exportJob = NodeSchedule.scheduleJob(date, function () {
                _this.adaptable.api.exportApi.sendReport(reportSchedule.ReportName, reportSchedule.ExportDestination);
            });
            this.exportJobs.push(exportJob);
        }
    };
    ScheduleService.prototype.AddIPushPullSchedule = function (iPushPullSchedule) {
        var _this = this;
        var date = this.getDateFromSchedule(iPushPullSchedule.Schedule);
        if (date != null) {
            var iPushPullJob = NodeSchedule.scheduleJob(date, function () {
                // we need to go through Redux as the flow is always Redux => Adaptable Store => api
                if (iPushPullSchedule.Transmission == 'Snapshot') {
                    _this.adaptable.api.internalApi.dispatchReduxAction(IPushPullRedux.IPushPullSendSnapshot(iPushPullSchedule.IPushPullReport));
                }
                else if (iPushPullSchedule.Transmission == 'Live Data') {
                    _this.adaptable.api.internalApi.dispatchReduxAction(IPushPullRedux.IPushPullStartLiveData(iPushPullSchedule.IPushPullReport));
                }
                _this.iPushPullJobs.push(iPushPullJob);
            });
        }
    };
    ScheduleService.prototype.AddGlue42Schedule = function (glue42Schedule) {
        var _this = this;
        var date = this.getDateFromSchedule(glue42Schedule.Schedule);
        if (date != null) {
            var glue42Job = NodeSchedule.scheduleJob(date, function () {
                // we need to go through Redux as the flow is always Redux => Adaptable Store => api
                if (glue42Schedule.Transmission == 'Snapshot') {
                    _this.adaptable.api.internalApi.dispatchReduxAction(Glue42Redux.Glue42SendSnapshot(glue42Schedule.Glue42Report));
                }
                else if (glue42Schedule.Transmission == 'Live Data') {
                    console.log('we dont yet have live data for glue');
                    //   this.adaptable.api.internalApi.dispatchReduxAction(
                    //     Glue42Redux.Glue42SendSnapshot(glue42Schedule.Glue42Report)
                    //   );
                }
                _this.glue42Jobs.push(glue42Job);
            });
        }
    };
    ScheduleService.prototype.AddMidnightRefreshSchedule = function () {
        var reloadSchedule = {
            Hour: 0,
            Minute: 1,
            DaysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        };
        var date = this.getDateFromSchedule(reloadSchedule);
        if (date != null) {
        }
    };
    ScheduleService.prototype.getDateFromSchedule = function (schedule) {
        var date = null;
        if (schedule.OneOffDate != null) {
            date = new Date(schedule.OneOffDate);
            date.setHours(schedule.Hour);
            date.setMinutes(schedule.Minute);
            date.setSeconds(0);
        }
        else {
            date = new Date();
            if (ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, date.getDay())) {
                date.setHours(schedule.Hour);
                date.setMinutes(schedule.Minute);
                date.setSeconds(0);
            }
            else {
                return null; // because it will rerun at midnight so we can get rid
            }
        }
        // add check for whether date in the past
        if (date != null && DateExtensions_1.default.IsDateInFuture(date)) {
            return date;
        }
        return null;
    };
    ScheduleService.prototype.clearAllReminderJobs = function () {
        this.reminderJobs.forEach(function (j) {
            if (j != null) {
                j.cancel();
            }
        });
        this.reminderJobs = [];
    };
    ScheduleService.prototype.clearAllExportJobs = function () {
        this.exportJobs.forEach(function (j) {
            if (j != null) {
                j.cancel();
            }
        });
        this.exportJobs = [];
    };
    ScheduleService.prototype.clearAllIPushPullJobs = function () {
        this.iPushPullJobs.forEach(function (j) {
            if (j != null) {
                j.cancel();
            }
        });
        this.iPushPullJobs = [];
    };
    ScheduleService.prototype.clearAllGlue42Jobs = function () {
        this.glue42Jobs.forEach(function (j) {
            if (j != null) {
                j.cancel();
            }
        });
        this.glue42Jobs = [];
    };
    return ScheduleService;
}());
exports.ScheduleService = ScheduleService;
