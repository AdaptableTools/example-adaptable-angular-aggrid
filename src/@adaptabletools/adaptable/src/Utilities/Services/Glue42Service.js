"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LoggingHelper_1 = require("../Helpers/LoggingHelper");
var lodash_1 = require("lodash");
var Helper_1 = require("../Helpers/Helper");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var Glue42Service = /** @class */ (function () {
    function Glue42Service(adaptable) {
        var _this = this;
        this.adaptable = adaptable;
        this.isExcelStatus = {
            msg: '[Excel] Not checked, changed the addin status 0 times!',
            isResolved: false,
        };
        this.adaptable = adaptable;
        this.adaptable.api.eventApi.on('AdaptableReady', function () {
            if (!_this.glueInstance) {
                var glue42State = _this.adaptable.api.glue42Api.getGlue42State();
                if (glue42State) {
                    _this.adaptable.api.glue42Api.setGlue42AvailableOn();
                    if (StringExtensions_1.default.IsNotNullOrEmpty(glue42State.Username) &&
                        StringExtensions_1.default.IsNotNullOrEmpty(glue42State.Password)) {
                        _this.login(glue42State.Username, glue42State.Password, glue42State.GatewayURL);
                    }
                }
                else {
                    _this.adaptable.api.glue42Api.setGlue42AvailableOff();
                    _this.adaptable.api.glue42Api.setGlue42RunningOff();
                }
            }
        });
    }
    Glue42Service.prototype.login = function (username, password, gatewayURL) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ws, glue42Config, glue42State, glue, glue4Office, _a, glue4OfficeConfig, glue4OfficeInstance, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        ws = StringExtensions_1.default.IsNotNullOrEmpty(gatewayURL) ? gatewayURL : 'ws://localhost:8385';
                        glue42Config = {
                            initialization: {
                                application: 'Adaptable',
                                gateway: {
                                    protocolVersion: 3,
                                    ws: ws,
                                },
                                auth: {
                                    username: username,
                                    password: password,
                                },
                            },
                            excelExport: {
                                timeoutMs: 30000,
                            },
                        };
                        glue42State = this.adaptable.api.glue42Api.getGlue42State();
                        glue = glue42State.Glue;
                        glue4Office = glue42State.Glue4Office;
                        if (glue42Config && glue42Config.excelExport && glue42Config.excelExport.timeoutMs) {
                            this.excelSyncTimeout = glue42Config.excelExport.timeoutMs;
                        }
                        _a = this;
                        return [4 /*yield*/, glue(glue42Config.initialization)];
                    case 1:
                        _a.glueInstance = _b.sent();
                        glue4OfficeConfig = lodash_1.cloneDeep(glue42Config.initialization);
                        glue4OfficeConfig.glue = this.glueInstance;
                        return [4 /*yield*/, glue4Office(glue4OfficeConfig)];
                    case 2:
                        glue4OfficeInstance = _b.sent();
                        this.glue4ExcelInstance = glue4OfficeInstance.excel; // as Glue42Office.Excel.API;
                        this.subscribeToAddinStatusChanges();
                        this.adaptable.api.glue42Api.setGlue42RunningOn();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        LoggingHelper_1.LogAdaptableError(error_1);
                        this.adaptable.api.glue42Api.setGlue42RunningOff();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Glue42Service.prototype.exportData = function (data, gridColumns, primaryKeys) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2, exportColumns, exportData, sentRows, rowTrigger, updateTrigger, syncOptions, sheetData, sheet, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.glueInstance) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        if (!!this.isExcelStatus.isResolved) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        if (!this.glueInstance.appManager) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.glueInstance.appManager.application('excel').start()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        exportColumns = data[0];
                        exportData = this.createData(data, exportColumns);
                        sentRows = Helper_1.default.cloneObject(exportData);
                        rowTrigger = 'row';
                        updateTrigger = [rowTrigger];
                        syncOptions = {
                            workbook: 'Glue42 Excel Integration Demo',
                            worksheet: 'Data Sheet',
                            updateTrigger: updateTrigger,
                        };
                        if (this.excelSyncTimeout) {
                            syncOptions.timeoutMs = this.excelSyncTimeout;
                        }
                        sheetData = {
                            columnConfig: this.createColumns(data),
                            data: exportData,
                            options: syncOptions,
                        };
                        return [4 /*yield*/, this.glue4ExcelInstance.openSheet(sheetData)];
                    case 7:
                        sheet = _a.sent();
                        sheet.onChanged(this.getSheetChangeHandler(gridColumns, sentRows, exportColumns, primaryKeys));
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // this method ideally will create a connection to Excel and return an ID? somethign?
    Glue42Service.prototype.openSheet = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_4, rowTrigger, updateTrigger, syncOptions, openSheetConfig_1, error_5;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.glueInstance) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (!!this.isExcelStatus.isResolved) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        if (!this.glueInstance.appManager) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.glueInstance.appManager.application('excel').start()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        rowTrigger = 'row';
                        updateTrigger = [rowTrigger];
                        syncOptions = {
                            workbook: 'Glue42 Excel Integration Demo',
                            worksheet: 'Data Sheet',
                            updateTrigger: updateTrigger,
                        };
                        if (this.excelSyncTimeout) {
                            syncOptions.timeoutMs = this.excelSyncTimeout;
                        }
                        openSheetConfig_1 = {
                            columnConfig: this.createColumns(data),
                            data: [],
                            options: syncOptions,
                        };
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var page = _this.glue4ExcelInstance.openSheet(openSheetConfig_1);
                                _this.sheet = page;
                            })];
                    case 7:
                        error_5 = _a.sent();
                        console.error(error_5);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // this will sned the data itself to update.
    // it could be that the columns never send
    // currently we resend everything but we can change that internally just to send deltas.
    Glue42Service.prototype.updateData = function (data, gridColumns, primaryKeys) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var exportColumns, exportData, sentRows;
            return tslib_1.__generator(this, function (_a) {
                if (!this.glueInstance) {
                    return [2 /*return*/];
                }
                try {
                    exportColumns = data[0];
                    exportData = this.createData(data, exportColumns);
                    sentRows = Helper_1.default.cloneObject(exportData);
                    this.sheet.update(exportData);
                    // should this be here? or in the openSheet function?
                    this.sheet.onChanged(this.getSheetChangeHandler(gridColumns, sentRows, exportColumns, primaryKeys));
                }
                catch (error) {
                    console.error(error);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Returns a callback, handling the Sheet Changed event.
     * Walks through the delta.
     */
    Glue42Service.prototype.getSheetChangeHandler = function (gridColumns, sentRows, exportColumns, primaryKeys) {
        var _this = this;
        return function (allData, errorCallback, doneCallback, delta) {
            var primaryKeyColumnFriendlyName = ColumnHelper_1.default.getFriendlyNameFromColumnId(_this.adaptable.adaptableOptions.primaryKey, gridColumns);
            var dataChangedInfos = [];
            var errors = [];
            delta.forEach(function (deltaItem) {
                if (deltaItem.action === 'modified') {
                    deltaItem.row.forEach(function (change, changeIndex) {
                        if (change !== null) {
                            var column = ColumnHelper_1.default.getColumnFromFriendlyName(exportColumns[changeIndex], gridColumns);
                            var originalRow = sentRows[deltaItem.rowBeforeIndex - 1];
                            var originalValue = originalRow[exportColumns[changeIndex]];
                            var primaryKeyValue = void 0;
                            if (primaryKeys) {
                                primaryKeyValue = primaryKeys[deltaItem.rowBeforeIndex - 1];
                            }
                            else {
                                primaryKeyValue = originalRow[primaryKeyColumnFriendlyName];
                            }
                            var isValidEdit = _this.isValidEdit(column, originalValue, change, primaryKeyValue, deltaItem.rowBeforeIndex - 1, changeIndex, errors, gridColumns);
                            if (isValidEdit) {
                                var dataChangedInfo = {
                                    OldValue: originalValue,
                                    NewValue: change,
                                    ColumnId: column.ColumnId,
                                    PrimaryKeyValue: primaryKeyValue,
                                };
                                dataChangedInfos.push(dataChangedInfo);
                            }
                        }
                    });
                }
                else {
                    var msg = '';
                    if (deltaItem.action === 'deleted') {
                        msg = 'Deletion from Excel is not supported in this demo';
                    }
                    if (deltaItem.action === 'inserted') {
                        msg = 'Insertion of new data to Excel is not supported in this demo';
                    }
                    errors.push({
                        row: deltaItem.rowBeforeIndex - 1,
                        column: 0,
                        description: msg,
                        foregroundColor: 'white',
                        backgroundColor: 'red',
                    });
                }
            });
            dataChangedInfos.forEach(function (dc) {
                // I think we should be using one of our API methods here as that might give us the server validation we need...
                _this.adaptable.setValue(dc, false);
            });
            if (ArrayExtensions_1.default.IsNullOrEmpty(errors)) {
                doneCallback();
            }
            else {
                errorCallback(errors);
            }
        };
    };
    /**
     * Checks if Excel is running, if not starts it
     */
    Glue42Service.prototype.subscribeToAddinStatusChanges = function () {
        var _this = this;
        //check if Excel is running
        try {
            this.glue4ExcelInstance.onAddinStatusChanged(function (connected) {
                if (connected) {
                    _this.isExcelStatus = {
                        msg: 'Excel is running',
                        isResolved: true,
                    };
                    return;
                }
                _this.isExcelStatus = {
                    msg: 'Excel is not running',
                    isResolved: false,
                };
                LoggingHelper_1.default.LogAdaptableWarning("[Excel] Application isn't running!");
            });
        }
        catch (error) {
            this.isExcelStatus = {
                msg: 'Error in isExcelRunning',
                isResolved: false,
            };
        }
    };
    Glue42Service.prototype.isValidEdit = function (column, originalValue, returnedValue, primaryKeyValue, rowIndex, columnIndex, errors, columns) {
        var _this = this;
        if (column.ReadOnly) {
            errors.push(this.addValidationError(rowIndex + 1, columnIndex + 1, column.FriendlyName + ' is read only'));
            return false;
        }
        // check for type -- do properly in due course, but for now just check numbers...
        if (column.DataType == Enums_1.DataType.Number) {
            if (isNaN(Number(returnedValue))) {
                errors.push(this.addValidationError(rowIndex + 1, columnIndex + 1, column.FriendlyName + ' is numeric'));
                return false;
            }
        }
        var dataChangedInfo = {
            OldValue: originalValue,
            NewValue: returnedValue,
            ColumnId: column.ColumnId,
            PrimaryKeyValue: primaryKeyValue,
        };
        // check for any validation issues
        var cellValidationRules = this.adaptable.ValidationService.GetValidationRulesForDataChange(dataChangedInfo);
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(cellValidationRules)) {
            cellValidationRules.forEach(function (cv) {
                var failedvalidationMessage = 'Validation failed for ' +
                    column.FriendlyName +
                    ': ' +
                    ExpressionHelper_1.default.ConvertRangeToString(cv.Range, columns);
                if (cv.ActionMode == Enums_1.ActionMode.StopEdit) {
                    errors.push(_this.addValidationError(rowIndex + 1, columnIndex + 1, failedvalidationMessage));
                }
                else {
                    errors.push(_this.addValidationWarning(rowIndex + 1, columnIndex + 1, failedvalidationMessage));
                }
            });
            return false;
        }
        return true;
    };
    Glue42Service.prototype.addValidationWarning = function (rowIndex, columnIndex, errorDescription) {
        return {
            row: rowIndex,
            column: columnIndex,
            description: errorDescription,
            foregroundColor: 'orange',
            backgroundColor: 'white',
        };
    };
    Glue42Service.prototype.addValidationError = function (rowIndex, columnIndex, errorDescription) {
        return {
            row: rowIndex,
            column: columnIndex,
            description: errorDescription,
            foregroundColor: 'red',
            backgroundColor: 'white',
        };
    };
    Glue42Service.prototype.createColumns = function (data) {
        var firstRow = data[0];
        var headers = [];
        firstRow.forEach(function (element) {
            headers.push({
                header: element.replace(' ', ''),
                fieldName: element,
            });
        });
        return headers;
    };
    Glue42Service.prototype.createData = function (data, headers) {
        var returnArray = [];
        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            var returnItem = {};
            for (var j = 0; j < headers.length; j++) {
                returnItem[headers[j]] = row[j];
            }
            returnArray.push(returnItem);
        }
        return returnArray;
    };
    return Glue42Service;
}());
exports.Glue42Service = Glue42Service;
