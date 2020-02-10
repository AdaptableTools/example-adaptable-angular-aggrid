"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingHelper_1 = require("../Helpers/LoggingHelper");
var AuditLogEntry_1 = require("../Interface/AuditLogEntry");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var ObjectFactory_1 = require("../ObjectFactory");
var AdaptableHelper_1 = require("../Helpers/AdaptableHelper");
var AuditLogService = /** @class */ (function () {
    function AuditLogService(adaptable) {
        var _this = this;
        this.canSendLog = true;
        this.numberOfMissedPing = 0;
        this.auditLogQueue = [];
        this.adaptable = adaptable;
        // Internal State
        if (adaptable.adaptableOptions.auditOptions != null &&
            adaptable.adaptableOptions.auditOptions.auditInternalStateChanges != null) {
            this.isAuditInternalStateChangesEnabled = this.isAuditOptionEnabled(adaptable.adaptableOptions.auditOptions.auditInternalStateChanges);
        }
        else {
            this.isAuditInternalStateChangesEnabled = false;
        }
        // User State
        if (adaptable.adaptableOptions.auditOptions != null &&
            adaptable.adaptableOptions.auditOptions.auditUserStateChanges != null) {
            this.isAuditUserStateChangesEnabled = this.isAuditOptionEnabled(adaptable.adaptableOptions.auditOptions.auditUserStateChanges);
        }
        else {
            this.isAuditUserStateChangesEnabled = false;
        }
        // Function Events
        if (adaptable.adaptableOptions.auditOptions != null &&
            adaptable.adaptableOptions.auditOptions.auditFunctionEvents != null) {
            this.isAuditFunctionEventsEnabled = this.isAuditOptionEnabled(adaptable.adaptableOptions.auditOptions.auditFunctionEvents);
        }
        else {
            this.isAuditFunctionEventsEnabled = false;
        }
        // Cell Edit
        if (adaptable.adaptableOptions.auditOptions != null &&
            adaptable.adaptableOptions.auditOptions.auditCellEdits != null) {
            this.isAuditCellEditsEnabled = this.isAuditOptionEnabled(adaptable.adaptableOptions.auditOptions.auditCellEdits);
        }
        else {
            this.isAuditCellEditsEnabled = false;
        }
        // Ticking Data Changes
        if (adaptable.adaptableOptions.auditOptions != null &&
            adaptable.adaptableOptions.auditOptions.auditTickingDataUpdates != null) {
            this.isAuditTickingDataUpdatesEnabled = this.isAuditOptionEnabled(adaptable.adaptableOptions.auditOptions.auditTickingDataUpdates);
        }
        else {
            this.isAuditTickingDataUpdatesEnabled = false;
        }
        // Log State
        this.isAuditStateChangesEnabled =
            this.isAuditInternalStateChangesEnabled || this.isAuditUserStateChangesEnabled;
        // General Audit Flag
        this.isAuditEnabled =
            this.isAuditStateChangesEnabled ||
                this.isAuditFunctionEventsEnabled ||
                this.isAuditTickingDataUpdatesEnabled ||
                this.isAuditCellEditsEnabled;
        // set up the listener if we are auditing Ticking Data Changes
        if (this.isAuditTickingDataUpdatesEnabled) {
            this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
                _this.handleDataSourceChanged(dataChangedInfo);
            });
        }
        // set up the Audit Queue if any of the Audits is set to use HTTP Channel
        if (this.isAuditEnabled) {
            if (adaptable.adaptableOptions.auditOptions != undefined) {
                if (this.shouldAuditToHttpChannel(adaptable.adaptableOptions.auditOptions)) {
                    if (adaptable.adaptableOptions.auditOptions.pingInterval != undefined &&
                        adaptable.adaptableOptions.auditOptions.auditLogsSendInterval != undefined) {
                        this.ping();
                        setInterval(function () { return _this.ping(); }, adaptable.adaptableOptions.auditOptions.pingInterval * 1000);
                        setInterval(function () { return _this.flushAuditQueue(); }, adaptable.adaptableOptions.auditOptions.auditLogsSendInterval * 1000);
                    }
                }
            }
        }
    }
    AuditLogService.prototype.addEditCellAuditLog = function (dataChangedInfo) {
        if (this.isAuditCellEditsEnabled) {
            var auditLogEntry = this.createAuditLogEntryFromDataChangedInfo(dataChangedInfo, AuditLogEntry_1.AuditTrigger.CellEdit);
            var auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions.auditCellEdits;
            if (auditDestinationOptions.auditToConsole) {
                LoggingHelper_1.LoggingHelper.LogObject(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsEvent) {
                this.fireAuditLogEvent(auditLogEntry, AuditLogEntry_1.AuditTrigger.CellEdit);
            }
            if (auditDestinationOptions.auditToHttpChannel) {
                this.auditLogQueue.push(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsAlert) {
                var message = 'Column: ' +
                    ColumnHelper_1.default.getFriendlyNameFromColumnId(dataChangedInfo.ColumnId, this.adaptable.api.gridApi.getColumns()) +
                    '.  Identifier: ' +
                    dataChangedInfo.PrimaryKeyValue +
                    '.  Old Value: ' +
                    dataChangedInfo.OldValue +
                    '.  New Value: ' +
                    dataChangedInfo.NewValue;
                this.showAlert('Data Changed', message);
            }
        }
    };
    AuditLogService.prototype.addUserStateChangeAuditLog = function (stateChangeDetails) {
        if (this.isAuditUserStateChangesEnabled) {
            var auditLogEntry = {
                audit_trigger: AuditLogEntry_1.AuditTrigger.UserStateChange,
                client_timestamp: new Date(),
                username: this.adaptable.adaptableOptions.userName,
                adaptable_id: this.adaptable.adaptableOptions.adaptableId,
                state_change_details: stateChangeDetails,
            };
            var auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions
                .auditUserStateChanges;
            if (auditDestinationOptions.auditToConsole) {
                LoggingHelper_1.LoggingHelper.LogObject(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsEvent) {
                this.fireAuditLogEvent(auditLogEntry, AuditLogEntry_1.AuditTrigger.UserStateChange);
            }
            if (auditDestinationOptions.auditToHttpChannel) {
                this.auditLogQueue.push(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsAlert) {
                var message = 'Action: ' + stateChangeDetails.actionType;
                this.showAlert(stateChangeDetails.name + ' StateChange', message);
            }
        }
    };
    AuditLogService.prototype.addInternalStateChangeAuditLog = function (stateChangeDetails) {
        if (this.isAuditInternalStateChangesEnabled) {
            var auditLogEntry = {
                audit_trigger: AuditLogEntry_1.AuditTrigger.InternalStateChange,
                client_timestamp: new Date(),
                username: this.adaptable.adaptableOptions.userName,
                adaptable_id: this.adaptable.adaptableOptions.adaptableId,
                state_change_details: stateChangeDetails,
            };
            var auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions
                .auditInternalStateChanges;
            if (auditDestinationOptions.auditToConsole) {
                LoggingHelper_1.LoggingHelper.LogObject(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsEvent) {
                this.fireAuditLogEvent(auditLogEntry, AuditLogEntry_1.AuditTrigger.InternalStateChange);
            }
            if (auditDestinationOptions.auditToHttpChannel) {
                this.auditLogQueue.push(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsAlert) {
                var message = 'Action: ' + stateChangeDetails.actionType;
                this.showAlert(stateChangeDetails.name + ' StateChange', message);
            }
        }
    };
    AuditLogService.prototype.addFunctionAppliedAuditLog = function (functionAppliedDetails) {
        if (this.isAuditFunctionEventsEnabled) {
            var auditLogEntry = {
                audit_trigger: AuditLogEntry_1.AuditTrigger.FunctionApplied,
                client_timestamp: new Date(),
                username: this.adaptable.adaptableOptions.userName,
                adaptable_id: this.adaptable.adaptableOptions.adaptableId,
                function_applied_details: functionAppliedDetails,
            };
            var auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions
                .auditFunctionEvents;
            if (auditDestinationOptions.auditToConsole) {
                LoggingHelper_1.LoggingHelper.LogObject(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsEvent) {
                this.fireAuditLogEvent(auditLogEntry, AuditLogEntry_1.AuditTrigger.FunctionApplied);
            }
            if (auditDestinationOptions.auditToHttpChannel) {
                this.auditLogQueue.push(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsAlert) {
                var message = 'Action: ' + functionAppliedDetails.action + '.  Details: ' + functionAppliedDetails.info;
                this.showAlert(functionAppliedDetails.name + ' Function Applied', message);
            }
        }
    };
    AuditLogService.prototype.handleDataSourceChanged = function (dataChangedInfo) {
        if (this.isAuditTickingDataUpdatesEnabled) {
            var auditLogEntry = this.createAuditLogEntryFromDataChangedInfo(dataChangedInfo, AuditLogEntry_1.AuditTrigger.TickingDataUpdate);
            var auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions
                .auditTickingDataUpdates;
            if (auditDestinationOptions.auditToConsole) {
                LoggingHelper_1.LoggingHelper.LogObject(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsEvent) {
                this.fireAuditLogEvent(auditLogEntry, AuditLogEntry_1.AuditTrigger.TickingDataUpdate);
            }
            if (auditDestinationOptions.auditToHttpChannel) {
                this.auditLogQueue.push(auditLogEntry);
            }
            if (auditDestinationOptions.auditAsAlert) {
                var message = 'Column: ' +
                    ColumnHelper_1.default.getFriendlyNameFromColumnId(dataChangedInfo.ColumnId, this.adaptable.api.gridApi.getColumns()) +
                    '.  Identifier: ' +
                    dataChangedInfo.PrimaryKeyValue +
                    '.  Old Value: ' +
                    dataChangedInfo.OldValue +
                    '.  New Value: ' +
                    dataChangedInfo.NewValue;
                this.showAlert('Data Changed', message);
            }
        }
    };
    AuditLogService.prototype.createAuditLogEntryFromDataChangedInfo = function (dataChangedInfo, auditTrigger) {
        return {
            audit_trigger: auditTrigger,
            client_timestamp: new Date(),
            username: this.adaptable.adaptableOptions.userName,
            adaptable_id: this.adaptable.adaptableOptions.adaptableId,
            data_change_details: {
                primarykey_column_value: String(dataChangedInfo.PrimaryKeyValue),
                primarykey_column_id: this.adaptable.adaptableOptions.primaryKey,
                column_id: dataChangedInfo.ColumnId,
                previous_value: String(dataChangedInfo.OldValue),
                new_value: String(dataChangedInfo.NewValue),
                row_data: this.adaptable.getDataRowFromRowNode(dataChangedInfo.RowNode),
            },
        };
    };
    AuditLogService.prototype.ping = function () {
        var _this = this;
        var pingMessage = {
            audit_trigger: AuditLogEntry_1.AuditTrigger.Ping,
            client_timestamp: new Date(),
            username: this.adaptable.adaptableOptions.userName,
            adaptable_id: this.adaptable.adaptableOptions.adaptableId,
            number_of_missed_ping: this.numberOfMissedPing,
        };
        var xhr = new XMLHttpRequest();
        xhr.onerror = function (ev) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('error sending ping: ' + ev.message);
            _this.SetCanSendLog(false);
        };
        xhr.ontimeout = function (ev) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('timeout sending ping');
            _this.SetCanSendLog(false);
        };
        xhr.onload = function (ev) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    _this.SetCanSendLog(true);
                }
                else {
                    LoggingHelper_1.LoggingHelper.LogAdaptableError('error sending ping: ' + xhr.statusText);
                    _this.SetCanSendLog(false);
                }
            }
        };
        var url = '/auditlog';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(pingMessage));
    };
    AuditLogService.prototype.SetCanSendLog = function (enable) {
        if (enable) {
            this.canSendLog = true;
            this.numberOfMissedPing = 0;
        }
        else {
            this.canSendLog = false;
            this.numberOfMissedPing++;
        }
    };
    AuditLogService.prototype.flushAuditQueue = function () {
        //if we cannot send logs then we just clear the thing
        if (!this.canSendLog) {
            this.auditLogQueue.length = 0;
        }
        var obj = this.auditLogQueue.shift();
        var _loop_1 = function () {
            var xhr = new XMLHttpRequest();
            xhr.onerror = function (ev) {
                return LoggingHelper_1.LoggingHelper.LogAdaptableError('error sending AuditLog: ' + ev.message);
            };
            xhr.ontimeout = function (pe) {
                return LoggingHelper_1.LoggingHelper.LogAdaptableError('timeout sending AuditLog');
            };
            xhr.onload = function (pe) {
                if (xhr.readyState == 4) {
                    if (xhr.status != 200) {
                        LoggingHelper_1.LoggingHelper.LogAdaptableError('error sending AuditLog: ' + xhr.statusText);
                    }
                }
            };
            url = '/auditlog';
            //we make the request async
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(obj));
            obj = this_1.auditLogQueue.shift();
        };
        var this_1 = this, url;
        // while (obj && this.sockJS.readyState == SockJS.OPEN) {
        while (obj) {
            _loop_1();
        }
    };
    AuditLogService.prototype.convertAuditMessageToText = function (obj) {
        var stringArray = [];
        if (obj == undefined) {
            return String(obj);
        }
        else if (Array.isArray(obj)) {
            for (var prop in obj) {
                stringArray.push(this.convertAuditMessageToText(obj[prop]));
            }
            return '[' + stringArray.join(',') + ']';
        }
        if (typeof obj == 'object') {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    stringArray.push(prop + ': ' + this.convertAuditMessageToText(obj[prop]));
                }
            }
            return '{' + stringArray.join(',') + '}';
            //is function
        }
        else if (typeof obj == 'function') {
            stringArray.push(obj.toString());
        }
        else {
            stringArray.push(String(obj));
        }
        return stringArray.join(',');
    };
    AuditLogService.prototype.isAuditOptionEnabled = function (auditDestinationOptions) {
        return (auditDestinationOptions.auditAsEvent ||
            auditDestinationOptions.auditToConsole ||
            auditDestinationOptions.auditToHttpChannel ||
            auditDestinationOptions.auditAsAlert);
    };
    AuditLogService.prototype.shouldAuditToHttpChannel = function (auditLogOptions) {
        if (auditLogOptions) {
            if (auditLogOptions.auditCellEdits) {
                if (auditLogOptions.auditCellEdits.auditToHttpChannel) {
                    return true;
                }
            }
            if (auditLogOptions.auditFunctionEvents) {
                if (auditLogOptions.auditFunctionEvents.auditToHttpChannel) {
                    return true;
                }
            }
            if (auditLogOptions.auditInternalStateChanges) {
                if (auditLogOptions.auditInternalStateChanges.auditToHttpChannel) {
                    return true;
                }
            }
            if (auditLogOptions.auditUserStateChanges) {
                if (auditLogOptions.auditUserStateChanges.auditToHttpChannel) {
                    return true;
                }
            }
        }
        return false;
    };
    AuditLogService.prototype.showAlert = function (header, message) {
        var alert = {
            Header: header,
            Msg: message,
            AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error, this.adaptable.adaptableOptions.auditOptions.alertShowAsPopup),
        };
        this.adaptable.api.alertApi.displayAlert(alert);
    };
    AuditLogService.prototype.fireAuditLogEvent = function (auditLogEntry, auditTrigger) {
        var auditLogEventArgs = AdaptableHelper_1.default.createFDC3Message(auditTrigger, auditLogEntry);
        switch (auditTrigger) {
            case AuditLogEntry_1.AuditTrigger.CellEdit:
                this.adaptable.api.auditEventApi.emit('AuditCellEdited', auditLogEventArgs);
                break;
            case AuditLogEntry_1.AuditTrigger.TickingDataUpdate:
                this.adaptable.api.auditEventApi.emit('AuditTickingDataUpdated', auditLogEventArgs);
                break;
            case AuditLogEntry_1.AuditTrigger.FunctionApplied:
                this.adaptable.api.auditEventApi.emit('AuditFunctionApplied', auditLogEventArgs);
                break;
            case AuditLogEntry_1.AuditTrigger.InternalStateChange:
            case AuditLogEntry_1.AuditTrigger.UserStateChange:
                this.adaptable.api.auditEventApi.emit('AuditStateChanged', auditLogEventArgs);
                break;
        }
    };
    return AuditLogService;
}());
exports.AuditLogService = AuditLogService;
