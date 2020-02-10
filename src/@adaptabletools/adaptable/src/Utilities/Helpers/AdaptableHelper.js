"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var ColumnHelper_1 = require("./ColumnHelper");
var LoggingHelper_1 = require("./LoggingHelper");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var DefaultAdaptableOptions_1 = require("../Defaults/DefaultAdaptableOptions");
function assignadaptableOptions(adaptableOptions) {
    var returnadaptableOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions, adaptableOptions);
    returnadaptableOptions.auditOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.auditOptions, adaptableOptions.auditOptions);
    returnadaptableOptions.configServerOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.configServerOptions, adaptableOptions.configServerOptions);
    returnadaptableOptions.layoutOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.layoutOptions, adaptableOptions.layoutOptions);
    returnadaptableOptions.filterOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.filterOptions, adaptableOptions.filterOptions);
    returnadaptableOptions.queryOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.queryOptions, adaptableOptions.queryOptions);
    returnadaptableOptions.editOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.editOptions, adaptableOptions.editOptions);
    returnadaptableOptions.containerOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.containerOptions, adaptableOptions.containerOptions);
    returnadaptableOptions.generalOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.generalOptions, adaptableOptions.generalOptions);
    returnadaptableOptions.searchOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.searchOptions, adaptableOptions.searchOptions);
    returnadaptableOptions.userInterfaceOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.userInterfaceOptions, adaptableOptions.userInterfaceOptions);
    returnadaptableOptions.chartOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.chartOptions, adaptableOptions.chartOptions);
    returnadaptableOptions.stateOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.stateOptions, adaptableOptions.stateOptions);
    returnadaptableOptions.exportOptions = Object.assign({}, DefaultAdaptableOptions_1.DefaultAdaptableOptions.exportOptions, adaptableOptions.exportOptions);
    var predefinedConfig = returnadaptableOptions.predefinedConfig;
    if (predefinedConfig) {
        // this customizer function is called by lodash.cloneDeepWith
        // to determine how to clone each property
        var customizer = function (value) {
            // so whenever we clone a plain object,
            // we add a Uuid property
            if (lodash_1.isPlainObject(value) && value != predefinedConfig) {
                value.Uuid = Uuid_1.createUuid();
            }
        };
        returnadaptableOptions.predefinedConfig = lodash_1.cloneDeepWith(predefinedConfig, customizer);
    }
    return returnadaptableOptions;
}
exports.assignadaptableOptions = assignadaptableOptions;
function isValidPrimaryKey(adaptable, columns) {
    var pkColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(adaptable.adaptableOptions.primaryKey, columns);
    if (pkColumn == null) {
        var errorMessage = "The PK Column '" + adaptable.adaptableOptions.primaryKey + "' does not exist.  This will affect many functions in Adaptable.";
        if (adaptable.adaptableOptions.generalOptions.showMissingPrimaryKeyWarning == true) {
            // show an alert if that is the option
            adaptable.api.alertApi.showAlertError('No Primary Key', errorMessage);
        }
        else {
            // otherwise just log it
            LoggingHelper_1.LoggingHelper.LogAdaptableError(errorMessage);
        }
        return false;
    }
    return true;
}
exports.isValidPrimaryKey = isValidPrimaryKey;
function isConfigServerEnabled(adaptableOptions) {
    return (adaptableOptions.configServerOptions != null &&
        adaptableOptions.configServerOptions.enableConfigServer != null &&
        adaptableOptions.configServerOptions.enableConfigServer == true &&
        StringExtensions_1.StringExtensions.IsNotNullOrEmpty(adaptableOptions.configServerOptions.configServerUrl));
}
exports.isConfigServerEnabled = isConfigServerEnabled;
function AdaptableObjectExistsInState(array, itemToCheck) {
    if (array == null) {
        return false;
    }
    return array.findIndex(function (abObject) { return abObject.Uuid == itemToCheck.Uuid; }) > -1;
}
exports.AdaptableObjectExistsInState = AdaptableObjectExistsInState;
// perform any checks that are necessary here
// for now just adaptableId
function CheckadaptableOptions(adaptableOptions) {
    if (adaptableOptions.adaptableId) {
        if (adaptableOptions.adaptableId.includes('.')) {
            LoggingHelper_1.LoggingHelper.LogWarning("The 'adaptableId' property in adaptableOptions should not include a '.'.  We strongly recommend that you remove this.");
        }
    }
}
exports.CheckadaptableOptions = CheckadaptableOptions;
function getEntitlementAccessLevelForStrategy(entitlements, functionName) {
    if (ArrayExtensions_1.default.IsNotNullOrEmpty(entitlements)) {
        var entitlement = entitlements.find(function (e) { return e.FunctionName == functionName; });
        if (entitlement) {
            return entitlement.AccessLevel;
        }
    }
    return Enums_1.AccessLevel.Full;
}
exports.getEntitlementAccessLevelForStrategy = getEntitlementAccessLevelForStrategy;
function createFDC3Message(type, id) {
    var eventData = {
        name: 'Adaptable Audit Event',
        type: type,
        id: id,
    };
    return {
        object: 'fdc3-context',
        definition: 'https://fdc3.org/context/1.0.0/',
        version: '1.0.0',
        data: [eventData],
    };
}
exports.createFDC3Message = createFDC3Message;
exports.AdaptableHelper = {
    assignadaptableOptions: assignadaptableOptions,
    isValidPrimaryKey: isValidPrimaryKey,
    isConfigServerEnabled: isConfigServerEnabled,
    AdaptableObjectExistsInState: AdaptableObjectExistsInState,
    CheckadaptableOptions: CheckadaptableOptions,
    getEntitlementAccessLevelForStrategy: getEntitlementAccessLevelForStrategy,
    createFDC3Message: createFDC3Message,
};
exports.default = exports.AdaptableHelper;
