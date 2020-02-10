"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LoggingHelper_1 = require("./LoggingHelper");
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this._subscriptions = new Array();
    }
    EventDispatcher.prototype.Subscribe = function (fn) {
        if (fn) {
            this._subscriptions.push(fn);
        }
    };
    EventDispatcher.prototype.Unsubscribe = function (fn) {
        var i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    };
    EventDispatcher.prototype.Dispatch = function (sender, args) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this._subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                handler(sender, args);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
var ExcelServiceStatus;
(function (ExcelServiceStatus) {
    ExcelServiceStatus["Unknown"] = "Unknown";
    ExcelServiceStatus["Disconnected"] = "Disconnected";
    ExcelServiceStatus["Connecting"] = "Connecting";
    ExcelServiceStatus["Connected"] = "Connected";
    ExcelServiceStatus["Error"] = "Error";
})(ExcelServiceStatus || (ExcelServiceStatus = {}));
var excelStatus = ExcelServiceStatus.Unknown;
var _onExcelDisconnected = new EventDispatcher();
var _onWorkbookDisconnected = new EventDispatcher();
var _onWorkbookSaved = new EventDispatcher();
function OnExcelDisconnected() {
    return _onExcelDisconnected;
}
exports.OnExcelDisconnected = OnExcelDisconnected;
function OnWorkbookDisconnected() {
    return _onWorkbookDisconnected;
}
exports.OnWorkbookDisconnected = OnWorkbookDisconnected;
function OnWorkbookSaved() {
    return _onWorkbookSaved;
}
exports.OnWorkbookSaved = OnWorkbookSaved;
function isRunningInOpenfin() {
    return 'fin' in window && 'desktop' in fin;
}
exports.isRunningInOpenfin = isRunningInOpenfin;
function isExcelOpenfinLoaded() {
    return isRunningInOpenfin() && 'Excel' in fin.desktop;
}
exports.isExcelOpenfinLoaded = isExcelOpenfinLoaded;
function addWorkbook() {
    return new Promise(function (resolve, reject) {
        LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Creating new workbook');
        fin.desktop.Excel.addWorkbook(function (workbook /*ExcelWorkbook*/) {
            LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('workbook created:' + workbook.name);
            resolve(workbook.name);
            // workbook.addEventListener("workbookActivated", (event) => onWorkbookActivated(event, resolve));
            // workbook.activate();
            // setTimeout(() => {
            //     workbook.getWorksheets((ack: any) => {
            //        LoggingHelper.LogMessage('getWorksheets:', ack);
            //         resolve(workbook.name)
            //     })
            // }, 500);
        });
    });
}
// function onWorkbookActivated(event: any, resolve: any) {
//    LoggingHelper.LogMessage('workbookActivated:', event);
//     event.target.getWorksheets((ack: any) => {
//        LoggingHelper.LogMessage('getWorksheets:', ack);
//         resolve();
//     });
// }
// export function addRangeWorkSheet(workBook: ExcelWorkbook, range: string): Promise<ExcelWorksheet> {
//     return new Promise<ExcelWorksheet>((resolve: any, reject: any) => {
//         resolve(workBook.getWorksheetByName("Sheet1"))
//         // workBook.addWorksheet(function (worksheet: ExcelWorksheet) {
//         //     //worksheet.worksheetName = range
//         //     resolve(worksheet);
//         // });
//     });
// }
function pushData(workBookName, data) {
    return new Promise(function (resolve, reject) {
        var workBook = fin.desktop.Excel.getWorkbookByName(workBookName);
        if (!workBook) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('Cannot find workbook:' + workBookName);
            reject('Cannot find workbook:' + workBookName);
        }
        var worksheet = workBook.getWorksheetByName('Sheet1');
        worksheet.setCells(data, 'A1');
        resolve();
    });
}
exports.pushData = pushData;
function initOpenFinExcel() {
    // fin.desktop.main(function () {
    fin.desktop.Excel.init();
    if (excelStatus == ExcelServiceStatus.Unknown) {
        return Promise.resolve()
            .then(initExcelPluginService)
            .then(connectToExcel)
            .then(onExcelConnected)
            .then(addWorkbook)
            .catch(function (err) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError(err);
            return '';
        });
    }
    else {
        return Promise.resolve()
            .then(connectToExcel)
            .then(onExcelConnected)
            .then(addWorkbook)
            .catch(function (err) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError(err);
            return '';
        });
    }
    // });
}
exports.initOpenFinExcel = initOpenFinExcel;
function initExcelPluginService() {
    var installFolder = '%localappdata%\\OpenFin\\shared\\assets\\excel-api-addin';
    var servicePath = 'OpenFin.ExcelService.exe';
    var addInPath = 'OpenFin.ExcelApi-AddIn.xll';
    if (excelStatus != ExcelServiceStatus.Unknown) {
        LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Skipping Add-in deployment as already deployed');
        return Promise.resolve();
    }
    excelStatus = ExcelServiceStatus.Connecting;
    return Promise.resolve()
        .then(function () { return deployAddIn(servicePath, installFolder); })
        .then(function () { return startExcelService(servicePath, installFolder); })
        .then(function () { return registerAddIn(servicePath, installFolder); });
}
function deployAddIn(servicePath, installFolder) {
    return new Promise(function (resolve, reject) {
        LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Deploying Add-In');
        fin.desktop.System.launchExternalProcess({
            alias: 'excel-api-addin',
            target: servicePath,
            arguments: '-d "' + installFolder + '"',
            listener: function (args) {
                LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('Installer script completed! ' + args.exitCode);
                resolve();
            },
        });
    });
}
function startExcelService(servicePath, installFolder) {
    var serviceUuid = '886834D1-4651-4872-996C-7B2578E953B9';
    return new Promise(function (resolve, reject) {
        fin.desktop.System.getAllExternalApplications(function (extApps) {
            var excelServiceIndex = extApps.findIndex(function (extApp) { return extApp.uuid === serviceUuid; });
            if (excelServiceIndex >= 0) {
                LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Service Already Running');
                resolve();
                return;
            }
            var onServiceStarted = function () {
                LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('Service Started');
                fin.desktop.Excel.instance.removeEventListener('started', onServiceStarted);
                resolve();
            };
            chrome.desktop.getDetails(function (details) {
                fin.desktop.Excel.instance.addEventListener('started', onServiceStarted);
                fin.desktop.System.launchExternalProcess({
                    target: installFolder + '\\OpenFin.ExcelService.exe',
                    arguments: '-p ' + details.port,
                    uuid: serviceUuid,
                }, function (process) {
                    LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('Service Launched: ' + process.uuid);
                }, function (error) {
                    reject('Error starting Excel service');
                });
            });
        });
    });
}
function registerAddIn(servicePath, installFolder) {
    return new Promise(function (resolve, reject) {
        LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Registering Add-In');
        fin.desktop.Excel.install(function (ack) {
            LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Add-In Registration callback', ack);
            //if (ack.success) {
            resolve();
            //}
        });
    });
}
function connectToExcel() {
    return new Promise(function (resolve, reject) {
        fin.desktop.Excel.instance.getExcelInstances(function (instances) {
            if (instances.length > 0) {
                LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Excel Already Running');
                resolve();
            }
            else {
                LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Launching Excel');
                fin.desktop.Excel.run(resolve);
            }
        });
    });
}
function onWorkbookRemoved(event) {
    event.workbook.removeEventListener('workbookActivated', onWorkbookActivated);
    _onWorkbookDisconnected.Dispatch(this, event.workbook);
}
function onWorkbookSaved(event) {
    _onWorkbookSaved.Dispatch(this, { OldName: event.oldWorkbookName, NewName: event.workbook.name });
}
function onWorkbookActivated(event) {
    LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Workbook Activated: ' + event.target.name);
    event.target.getWorksheets(function (ack) {
        LoggingHelper_1.LoggingHelper.LogAdaptableInfo('getWorksheets:', ack);
    });
}
function onWorkbookAdded(event) {
    LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('Workbook Added: ' + event.workbook.name);
    var workbook = event.workbook;
    workbook.addEventListener('workbookActivated', onWorkbookActivated);
}
function onExcelConnected() {
    if (excelStatus != ExcelServiceStatus.Connected) {
        LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('Excel Connected: ' + fin.desktop.Excel.legacyApi.connectionUuid);
        excelStatus = ExcelServiceStatus.Connected;
        // fin.desktop.Excel.instance.removeEventListener("excelConnected", onExcelConnected);
        fin.desktop.Excel.addEventListener('workbookClosed', onWorkbookRemoved);
        fin.desktop.Excel.addEventListener('workbookSaved', onWorkbookSaved);
        fin.desktop.Excel.addEventListener('workbookAdded', onWorkbookAdded);
        // Grab a snapshot of the current instance, it can change!
        var legacyApi = fin.desktop.Excel.legacyApi;
        var onExcelDisconnected = function () {
            LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Excel Disconnected: ' + legacyApi.connectionUuid);
            fin.desktop.Excel.instance.removeEventListener('excelDisconnected', onExcelDisconnected);
            legacyApi.removeEventListener('workbookClosed', onWorkbookRemoved);
            legacyApi.removeEventListener('workbookSaved', onWorkbookSaved);
            legacyApi.removeEventListener('workbookAdded', onWorkbookAdded);
            excelStatus = ExcelServiceStatus.Disconnected;
            if (fin.desktop.Excel.legacyApi) {
                onExcelConnected();
            }
            else {
                excelStatus = ExcelServiceStatus.Disconnected;
                _onExcelDisconnected.Dispatch(this, null);
                // fin.desktop.Excel.instance.addEventListener("excelConnected", onExcelConnected);
            }
        };
        fin.desktop.Excel.instance.addEventListener('excelDisconnected', onExcelDisconnected);
    }
}
exports.OpenfinHelper = {
    OnExcelDisconnected: OnExcelDisconnected,
    OnWorkbookDisconnected: OnWorkbookDisconnected,
    OnWorkbookSaved: OnWorkbookSaved,
    isRunningInOpenfin: isRunningInOpenfin,
    isExcelOpenfinLoaded: isExcelOpenfinLoaded,
    pushData: pushData,
    initOpenFinExcel: initOpenFinExcel,
};
exports.default = exports.OpenfinHelper;
