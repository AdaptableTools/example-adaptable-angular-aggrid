"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var Redux = require("redux");
var DeepDiff = require("deep-diff");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var AdaptableReduxRemoteStorageEngine_1 = require("./AdaptableReduxRemoteStorageEngine");
var AdaptableReduxLocalStorageEngine_1 = require("./AdaptableReduxLocalStorageEngine");
var AdaptableReduxMerger_1 = require("./AdaptableReduxMerger");
var PopupRedux = require("../ActionsReducers/PopupRedux");
var PluginsRedux = require("../ActionsReducers/PluginsRedux");
var ChartRedux = require("../ActionsReducers/ChartRedux");
var AlertRedux = require("../ActionsReducers/AlertRedux");
var SmartEditRedux = require("../ActionsReducers/SmartEditRedux");
var BulkUpdateRedux = require("../ActionsReducers/BulkUpdateRedux");
var CustomSortRedux = require("../ActionsReducers/CustomSortRedux");
var CalculatedColumnRedux = require("../ActionsReducers/CalculatedColumnRedux");
var ShortcutRedux = require("../ActionsReducers/ShortcutRedux");
var GridRedux = require("../ActionsReducers/GridRedux");
var SystemRedux = require("../ActionsReducers/SystemRedux");
var PlusMinusRedux = require("../ActionsReducers/PlusMinusRedux");
var ExportRedux = require("../ActionsReducers/ExportRedux");
var FlashingCellsRedux = require("../ActionsReducers/FlashingCellsRedux");
var UpdatedRowRedux = require("../ActionsReducers/UpdatedRowRedux");
var CalendarRedux = require("../ActionsReducers/CalendarRedux");
var ConditionalStyleRedux = require("../ActionsReducers/ConditionalStyleRedux");
var QuickSearchRedux = require("../ActionsReducers/QuickSearchRedux");
var AdvancedSearchRedux = require("../ActionsReducers/AdvancedSearchRedux");
var DataSourceRedux = require("../ActionsReducers/DataSourceRedux");
var ColumnFilterRedux = require("../ActionsReducers/ColumnFilterRedux");
var UserFilterRedux = require("../ActionsReducers/UserFilterRedux");
var SystemFilterRedux = require("../ActionsReducers/SystemFilterRedux");
var ReminderRedux = require("../ActionsReducers/ReminderRedux");
var ThemeRedux = require("../ActionsReducers/ThemeRedux");
var FormatColumnRedux = require("../ActionsReducers/FormatColumnRedux");
var GradientColumnRedux = require("../ActionsReducers/GradientColumnRedux");
var ActionColumnRedux = require("../ActionsReducers/ActionColumnRedux");
var ApplicationRedux = require("../ActionsReducers/ApplicationRedux");
var SparklineColumnRedux = require("../ActionsReducers/SparklineColumnRedux");
var FreeTextColumnRedux = require("../ActionsReducers/FreeTextColumnRedux");
var LayoutRedux = require("../ActionsReducers/LayoutRedux");
var NamedFilterRedux = require("../ActionsReducers/NamedFilterRedux");
var ColumnCategoryRedux = require("../ActionsReducers/ColumnCategoryRedux");
var DashboardRedux = require("../ActionsReducers/DashboardRedux");
var ToolPanelRedux = require("../ActionsReducers/ToolPanelRedux");
var CellValidationRedux = require("../ActionsReducers/CellValidationRedux");
var PercentBarRedux = require("../ActionsReducers/PercentBarRedux");
var EntitlementsRedux = require("../ActionsReducers/EntitlementsRedux");
var CellSummaryRedux = require("../ActionsReducers/CellSummaryRedux");
var SystemStatusRedux = require("../ActionsReducers/SystemStatusRedux");
var TeamSharingRedux = require("../ActionsReducers/TeamSharingRedux");
var UserInterfaceRedux = require("../ActionsReducers/UserInterfaceRedux");
var IPushPullRedux = require("../ActionsReducers/IPushPullRedux");
var Glue42Redux = require("../ActionsReducers/Glue42Redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ConfigConstants = require("../../Utilities/Constants/ConfigConstants");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PreviewHelper_1 = require("../../Utilities/Helpers/PreviewHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var AdaptableHelper_1 = require("../../Utilities/Helpers/AdaptableHelper");
var ChartEnums_1 = require("../../PredefinedConfig/Common/ChartEnums");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var AuditEvents_1 = require("../../Api/Events/AuditEvents");
var Emitter_1 = require("../../Utilities/Emitter");
/*
This is the main store for Adaptable State
*/
var rootReducer = Redux.combineReducers({
    //  Reducers for Non-Persisted State
    Grid: GridRedux.GridReducer,
    Popup: PopupRedux.PopupReducer,
    System: SystemRedux.SystemReducer,
    SystemStatus: SystemStatusRedux.SystemStatusReducer,
    TeamSharing: TeamSharingRedux.TeamSharingReducer,
    Plugins: PluginsRedux.PluginsReducer,
    ActionColumn: ActionColumnRedux.ActionColumnReducer,
    Entitlements: EntitlementsRedux.EntitlementsReducer,
    NamedFilter: NamedFilterRedux.NamedFilterReducer,
    Glue42: Glue42Redux.Glue42Reducer,
    IPushPull: IPushPullRedux.IPushPullReducer,
    SparklineColumn: SparklineColumnRedux.SparklineColumnReducer,
    SystemFilter: SystemFilterRedux.SystemFilterReducer,
    UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,
    // not sure
    CellSummary: CellSummaryRedux.CellSummaryReducer,
    // Reducers for Persisted State
    AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
    Alert: AlertRedux.AlertReducer,
    Application: ApplicationRedux.ApplicationReducer,
    BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
    CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
    Calendar: CalendarRedux.CalendarReducer,
    CellValidation: CellValidationRedux.CellValidationReducer,
    Chart: ChartRedux.ChartReducer,
    ColumnCategory: ColumnCategoryRedux.ColumnCategoryReducer,
    ColumnFilter: ColumnFilterRedux.ColumnFilterReducer,
    ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
    CustomSort: CustomSortRedux.CustomSortReducer,
    Dashboard: DashboardRedux.DashboardReducer,
    DataSource: DataSourceRedux.DataSourceReducer,
    Export: ExportRedux.ExportReducer,
    FlashingCell: FlashingCellsRedux.FlashingCellReducer,
    FormatColumn: FormatColumnRedux.FormatColumnReducer,
    FreeTextColumn: FreeTextColumnRedux.FreeTextColumnReducer,
    Layout: LayoutRedux.LayoutReducer,
    PercentBar: PercentBarRedux.PercentBarReducer,
    GradientColumn: GradientColumnRedux.GradientColumnReducer,
    PlusMinus: PlusMinusRedux.PlusMinusReducer,
    QuickSearch: QuickSearchRedux.QuickSearchReducer,
    Reminder: ReminderRedux.ReminderReducer,
    Shortcut: ShortcutRedux.ShortcutReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer,
    Theme: ThemeRedux.ThemeReducer,
    ToolPanel: ToolPanelRedux.ToolPanelReducer,
    UpdatedRow: UpdatedRowRedux.UpdatedRowReducer,
    UserFilter: UserFilterRedux.UserFilterReducer,
});
exports.RESET_STATE = 'RESET_STATE';
exports.INIT_STATE = 'INIT_STATE';
exports.LOAD_STATE = 'LOAD_STATE';
var NON_PERSIST_ACTIONS = (_a = {},
    _a[exports.LOAD_STATE] = true,
    _a['@@INIT'] = true,
    _a['@@redux/init'] = true,
    _a[exports.INIT_STATE] = true,
    _a[exports.RESET_STATE] = true,
    _a);
exports.ResetUserData = function () { return ({
    type: exports.RESET_STATE,
}); };
exports.InitState = function () { return ({
    type: exports.INIT_STATE,
}); };
exports.LoadState = function (State) { return ({
    type: exports.LOAD_STATE,
    State: State,
}); };
var rootReducerWithResetManagement = function (state, action) {
    switch (action.type) {
        case exports.RESET_STATE:
            //This trigger the persist of the state with nothing
            state.AdvancedSearch = undefined;
            state.Alert = undefined;
            state.BulkUpdate = undefined;
            state.CalculatedColumn = undefined;
            state.Calendar = undefined;
            state.CellValidation = undefined;
            state.ConditionalStyle = undefined;
            state.Chart = undefined;
            state.CustomSort = undefined;
            state.Dashboard.AvailableToolbars = [];
            state.Dashboard.VisibleButtons = [];
            state.Dashboard.VisibleToolbars = [];
            state.Dashboard = undefined;
            state.DataSource = undefined;
            state.Entitlements = undefined;
            state.Export = undefined;
            state.FlashingCell = undefined;
            state.FormatColumn = undefined;
            state.ColumnFilter.ColumnFilters = [];
            state.UserFilter.UserFilters = [];
            state.SystemFilter.SystemFilters = [];
            state.Grid = undefined;
            state.Layout = undefined;
            state.PlusMinus = undefined;
            state.QuickSearch = undefined;
            state.Shortcut = undefined;
            state.SmartEdit = undefined;
            state.CellSummary = undefined;
            state.Theme = undefined;
            state.IPushPull = undefined;
            state.Glue42 = undefined;
            state.ToolPanel = undefined;
            break;
        case exports.LOAD_STATE:
            var State_1 = action.State;
            Object.keys(State_1).forEach(function (key) {
                state[key] = State_1[key];
            });
            break;
    }
    return rootReducer(state, action);
};
// const configServerUrl = "/adaptableadaptable-config"
var configServerTeamSharingUrl = '/adaptableadaptable-teamsharing';
var AdaptableStore = /** @class */ (function () {
    function AdaptableStore(adaptable) {
        var _this = this;
        this.loadStartOnStartup = true; // set to false if you want no state
        this.on = function (eventName, callback) {
            return _this.emitter.on(eventName, callback);
        };
        this.onAny = function (callback) {
            return _this.emitter.onAny(callback);
        };
        this.emit = function (eventName, data) {
            return _this.emitter.emit(eventName, data);
        };
        var storageEngine;
        this.emitter = new Emitter_1.default();
        // If the user has remote storage set then we use Remote Engine, otherwise we use Local Enginge
        // not sure we can do this as we need to be backwardly compatible with existing users so need to stick with adaptable id (which should be unique)
        // const localStorageKey =  'adaptable-adaptable-state-' + adaptable.adaptableOptions.primaryKey;
        if (AdaptableHelper_1.AdaptableHelper.isConfigServerEnabled(adaptable.adaptableOptions)) {
            storageEngine = AdaptableReduxRemoteStorageEngine_1.createEngine({
                url: adaptable.adaptableOptions.configServerOptions.configServerUrl,
                userName: adaptable.adaptableOptions.userName,
                adaptableId: adaptable.adaptableOptions.adaptableId,
                loadState: adaptable.adaptableOptions.stateOptions.loadState,
                persistState: adaptable.adaptableOptions.stateOptions.persistState,
            });
        }
        else {
            storageEngine = AdaptableReduxLocalStorageEngine_1.createEngine({
                adaptableId: adaptable.adaptableOptions.adaptableId,
                userName: adaptable.adaptableOptions.userName,
                predefinedConfig: adaptable.adaptableOptions.predefinedConfig,
                loadState: adaptable.adaptableOptions.stateOptions.loadState,
                persistState: adaptable.adaptableOptions.stateOptions.persistState,
            });
        }
        var nonPersistentReduxKeys = [
            // Non Persisted State
            ConfigConstants.SYSTEM,
            ConfigConstants.GRID,
            ConfigConstants.POPUP,
            ConfigConstants.TEAM_SHARING,
            ConfigConstants.PLUGINS,
            // Config State - set ONLY in PredefinedConfig and never changed at runtime
            ConfigConstants.ENTITLEMENTS,
            ConfigConstants.SYSTEM_FILTER,
            ConfigConstants.USER_INTERFACE,
            // Config State - set ONLY in PredefinedConfig and never changed at runtime and contains functions
            ConfigConstants.ACTION_COLUMN,
            ConfigConstants.NAMED_FILTER,
            ConfigConstants.SPARKLINE_COLUMN,
        ];
        // this is now VERY BADLY NAMED!
        var rootReducer = AdaptableReduxMerger_1.mergeReducer(rootReducerWithResetManagement, exports.LOAD_STATE);
        var composeEnhancers;
        if ('production' != process.env.NODE_ENV) {
            composeEnhancers = redux_devtools_extension_1.composeWithDevTools({
            // Specify here name, actionsBlacklist, actionsCreators and other options if needed
            });
        }
        else {
            composeEnhancers = function (x) { return x; };
        }
        var persistedReducer = function (state, action) {
            var init = state === undefined;
            var newState = rootReducer(state, action);
            // ideally the reducer should be pure,
            // but having the emitter emit the event here
            // is really useful
            _this.emitter.emit(action.type, { action: action, state: state, newState: newState });
            var shouldPersist = !NON_PERSIST_ACTIONS[action.type] && !init;
            if (shouldPersist) {
                var storageState_1 = tslib_1.__assign({}, newState);
                nonPersistentReduxKeys.forEach(function (key) {
                    delete storageState_1[key];
                });
                storageEngine.save(adaptable.adaptableOptions.stateOptions.saveState(storageState_1));
            }
            return newState;
        };
        //TODO: need to check if we want the storage to be done before or after
        //we enrich the state with the AB middleware
        this.TheStore = Redux.createStore(persistedReducer, composeEnhancers(Redux.applyMiddleware(stateChangedAuditLogMiddleware(adaptable), // checks for changes in internal / user state and sends to audit log
        adaptableadaptableMiddleware(adaptable), // the main middleware that actually does stuff
        functionAppliedLogMiddleware(adaptable) // looks at when functions are applied (e..g Quick Search) and logs accordingly
        )));
        this.Load = storageEngine
            .load()
            .then(function (storedState) {
            if (storedState && _this.loadStartOnStartup) {
                _this.TheStore.dispatch(exports.LoadState(adaptable.adaptableOptions.stateOptions.applyState(storedState)));
            }
        })
            .then(function () { return _this.TheStore.dispatch(exports.InitState()); }, function (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('Failed to load previous Adaptable State : ', e);
            //for now i'm still initializing Adaptable even if loading state has failed....
            //we may revisit that later
            _this.TheStore.dispatch(exports.InitState());
            _this.TheStore.dispatch(PopupRedux.PopupShowAlert({
                Header: 'Configuration',
                Msg: 'Error loading your configuration:' + e,
                AlertDefinition: ObjectFactory_1.ObjectFactory.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
            }));
        });
    }
    return AdaptableStore;
}());
exports.AdaptableStore = AdaptableStore;
// this function checks for any differences in the state and sends it to AUDIT LOGGER (for use in Audit Log)
// we now allow users to differentiate between user and internal state so we check for both
// NOTE: the Audit Logger is also responsible for firing AuditEventApi changes if that has been set
var stateChangedAuditLogMiddleware = function (adaptable) {
    return function (middlewareAPI) {
        return function (next) {
            return function (action) {
                if (
                // if audit state is turned off, then get out
                !adaptable.isInitialised ||
                    !adaptable.AuditLogService.isAuditStateChangesEnabled) {
                    return next(action);
                }
                // If Reset or Init State then dont log
                if (ArrayExtensions_1.ArrayExtensions.ContainsItem(getPrimaryStateReduxActions(), action.type)) {
                    return next(action);
                }
                // for non persisting actions (e.g. system, grid, menu and popup state functions)
                // we audit state changes only if audit is set to log internal state
                // and we send a diff of the change to Audit Log for Internal Changes
                if (ArrayExtensions_1.ArrayExtensions.ContainsItem(getNonPersistedReduxActions(), action.type)) {
                    if (adaptable.AuditLogService.isAuditInternalStateChangesEnabled) {
                        var oldState_1 = middlewareAPI.getState();
                        var ret_1 = next(action);
                        var newState_1 = middlewareAPI.getState();
                        var diff_1 = adaptable.AuditLogService.convertAuditMessageToText(DeepDiff.diff(oldState_1, newState_1));
                        var stateChangedDetails = {
                            name: 'Internal State Changes',
                            actionType: action.type,
                            state: null,
                            diffInfo: diff_1,
                        };
                        adaptable.AuditLogService.addInternalStateChangeAuditLog(stateChangedDetails);
                        return ret_1;
                    }
                    else {
                        return next(action);
                    }
                }
                // Unlikely but possible that ONLY Internal Audit is on so get out if so...
                if (!adaptable.AuditLogService.isAuditUserStateChangesEnabled) {
                    return next(action);
                }
                // We have User Changes Audit On
                // Get the OldState, NewState and Diff - as required for each use case
                var oldState = middlewareAPI.getState();
                var ret = next(action);
                var newState = middlewareAPI.getState();
                var diff = adaptable.AuditLogService.convertAuditMessageToText(DeepDiff.diff(oldState, newState));
                switch (action.type) {
                    /*
                    **********************
                     ADVANCED SEARCH
                    **********************
                     */
                    case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AdvancedSearchStrategyId,
                            actionType: action.type,
                            state: newState.AdvancedSearch,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_ADVANCED_SEARCH_STATE_PROPERTY,
                            oldValue: oldState.AdvancedSearch.CurrentAdvancedSearch,
                            newValue: actionTyped.selectedSearchName,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case AdvancedSearchRedux.ADVANCED_SEARCH_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AdvancedSearchStrategyId,
                            actionType: action.type,
                            state: newState.AdvancedSearch,
                            diffInfo: diff,
                            objectChanged: actionTyped.advancedSearch,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case AdvancedSearchRedux.ADVANCED_SEARCH_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AdvancedSearchStrategyId,
                            actionType: action.type,
                            state: newState.AdvancedSearch,
                            diffInfo: diff,
                            objectChanged: actionTyped.advancedSearch,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case AdvancedSearchRedux.ADVANCED_SEARCH_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AdvancedSearchStrategyId,
                            actionType: action.type,
                            state: newState.AdvancedSearch,
                            diffInfo: diff,
                            objectChanged: actionTyped.advancedSearch,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     ALERT
                    **********************
                     */
                    case AlertRedux.ALERT_DEFIINITION_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AlertStrategyId,
                            actionType: action.type,
                            state: newState.Alert,
                            diffInfo: diff,
                            objectChanged: actionTyped.alertDefinition,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case AlertRedux.ALERT_DEFIINITION_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AlertStrategyId,
                            actionType: action.type,
                            state: newState.Alert,
                            diffInfo: diff,
                            objectChanged: actionTyped.alertDefinition,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case AlertRedux.ALERT_DEFIINITION_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.AlertStrategyId,
                            actionType: action.type,
                            state: newState.Alert,
                            diffInfo: diff,
                            objectChanged: actionTyped.alertDefinition,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     BULK UPDATE
                    **********************
                     */
                    case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.BulkUpdateStrategyId,
                            actionType: action.type,
                            state: newState.BulkUpdate,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.BULK_UPDATE_VALUE_STATE_PROPERTY,
                            oldValue: oldState.BulkUpdate.BulkUpdateValue,
                            newValue: actionTyped.bulkUpdateValue,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     CALCULATED COLUMN
                    **********************
                     */
                    case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CalculatedColumnStrategyId,
                            actionType: action.type,
                            state: newState.CalculatedColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.calculatedColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CalculatedColumnStrategyId,
                            actionType: action.type,
                            state: newState.CalculatedColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.calculatedColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case CalculatedColumnRedux.CalculatedColumnDelete: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CalculatedColumnStrategyId,
                            actionType: action.type,
                            state: newState.CalculatedColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.calculatedColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     CALENDAR
                    **********************
                     */
                    case CalendarRedux.CALENDAR_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CalendarStrategyId,
                            actionType: action.type,
                            state: newState.Calendar,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_CALENDAR_STATE_PROPERTY,
                            oldValue: oldState.Calendar.CurrentCalendar,
                            newValue: actionTyped.selectedCalendarName,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     CELL SUMMARY
                    **********************
                     */
                    case CellSummaryRedux.CELL_SUMMARY_CHANGE_OPERATION: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CellSummaryStrategyId,
                            actionType: action.type,
                            state: newState.CellSummary,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.SUMMARY_OPERATION_STATE_PROPERTY,
                            oldValue: oldState.CellSummary.SummaryOperation,
                            newValue: actionTyped.SummaryOperation,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     CELL VALIDATION
                    **********************
                     */
                    case CellValidationRedux.CELL_VALIDATION_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CellValidationStrategyId,
                            actionType: action.type,
                            state: newState.CellValidation,
                            diffInfo: diff,
                            objectChanged: actionTyped.cellValidationRule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case CellValidationRedux.CELL_VALIDATION_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CellValidationStrategyId,
                            actionType: action.type,
                            state: newState.CellValidation,
                            diffInfo: diff,
                            objectChanged: actionTyped.cellValidationRule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case CellValidationRedux.CELL_VALIDATION_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CellValidationStrategyId,
                            actionType: action.type,
                            state: newState.CellValidation,
                            diffInfo: diff,
                            objectChanged: actionTyped.cellValidationRule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     CHART
                    **********************
                     */
                    case ChartRedux.CHART_DEFINITION_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ChartStrategyId,
                            actionType: action.type,
                            state: newState.Chart,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_CHART_NAME_STATE_PROPERTY,
                            oldValue: oldState.Chart.CurrentChartName,
                            newValue: actionTyped.chartName,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ChartRedux.CHART_DEFINITION_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ChartStrategyId,
                            actionType: action.type,
                            state: newState.Chart,
                            diffInfo: diff,
                            objectChanged: actionTyped.chartDefinition,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ChartRedux.CHART_DEFINITION_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ChartStrategyId,
                            actionType: action.type,
                            state: newState.Chart,
                            diffInfo: diff,
                            objectChanged: actionTyped.chartDefinition,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ChartRedux.CHART_DEFINITION_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ChartStrategyId,
                            actionType: action.type,
                            state: newState.Chart,
                            diffInfo: diff,
                            objectChanged: actionTyped.chartDefinition,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    COLUMN CATEGORY
                    **********************
                     */
                    case ColumnCategoryRedux.COLUMN_CATEGORY_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ColumnCategoryStrategyId,
                            actionType: action.type,
                            state: newState.ColumnCategory,
                            diffInfo: diff,
                            objectChanged: actionTyped.columnCategory,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ColumnCategoryRedux.COLUMN_CATEGORY_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ColumnCategoryStrategyId,
                            actionType: action.type,
                            state: newState.ColumnCategory,
                            diffInfo: diff,
                            objectChanged: actionTyped.columnCategory,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ColumnCategoryRedux.COLUMN_CATEGORY_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ColumnCategoryStrategyId,
                            actionType: action.type,
                            state: newState.ColumnCategory,
                            diffInfo: diff,
                            objectChanged: actionTyped.columnCategory,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    COLUMN FILTER
                   **********************
                    */
                    case ColumnFilterRedux.COLUMN_FILTER_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            actionType: action.type,
                            state: newState.ColumnFilter,
                            diffInfo: diff,
                            objectChanged: actionTyped.columnFilter,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ColumnFilterRedux.COLUMN_FILTER_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            actionType: action.type,
                            state: newState.ColumnFilter,
                            diffInfo: diff,
                            objectChanged: actionTyped.columnFilter,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
                        var changedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            actionType: action.type,
                            state: newState.ColumnFilter,
                            diffInfo: diff,
                            objectChanged: undefined,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ColumnFilterRedux.COLUMN_FILTER_CLEAR_ALL: {
                        var changedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            actionType: action.type,
                            state: newState.ColumnFilter,
                            diffInfo: diff,
                            objectChanged: null,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    CONDITIONAL STYLE
                    **********************
                     */
                    case ConditionalStyleRedux.CONDITIONAL_STYLE_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ConditionalStyleStrategyId,
                            actionType: action.type,
                            state: newState.ConditionalStyle,
                            diffInfo: diff,
                            objectChanged: actionTyped.conditionalStyle,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ConditionalStyleRedux.CONDITIONAL_STYLE_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ConditionalStyleStrategyId,
                            actionType: action.type,
                            state: newState.ConditionalStyle,
                            diffInfo: diff,
                            objectChanged: actionTyped.conditionalStyle,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ConditionalStyleRedux.CONDITIONAL_STYLE_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ConditionalStyleStrategyId,
                            actionType: action.type,
                            state: newState.ConditionalStyle,
                            diffInfo: diff,
                            objectChanged: actionTyped.conditionalStyle,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    CUSTOM SORT
                    **********************
                     */
                    case CustomSortRedux.CUSTOM_SORT_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CustomSortStrategyId,
                            actionType: action.type,
                            state: newState.CustomSort,
                            diffInfo: diff,
                            objectChanged: actionTyped.customSort,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case CustomSortRedux.CUSTOM_SORT_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CustomSortStrategyId,
                            actionType: action.type,
                            state: newState.CustomSort,
                            diffInfo: diff,
                            objectChanged: actionTyped.customSort,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case CustomSortRedux.CUSTOM_SORT_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.CustomSortStrategyId,
                            actionType: action.type,
                            state: newState.CustomSort,
                            diffInfo: diff,
                            objectChanged: actionTyped.customSort,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    DATA SOURCE
                    **********************
                     */
                    case DataSourceRedux.DATA_SOURCE_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.DataSourceStrategyId,
                            actionType: action.type,
                            state: newState.DataSource,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_DATA_SOURCE_STATE_PROPERTY,
                            oldValue: oldState.DataSource.CurrentDataSource,
                            newValue: actionTyped.SelectedDataSource,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case DataSourceRedux.DATA_SOURCE_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.DataSourceStrategyId,
                            actionType: action.type,
                            state: newState.DataSource,
                            diffInfo: diff,
                            objectChanged: actionTyped.dataSource,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case DataSourceRedux.DATA_SOURCE_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.DataSourceStrategyId,
                            actionType: action.type,
                            state: newState.DataSource,
                            diffInfo: diff,
                            objectChanged: actionTyped.dataSource,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case DataSourceRedux.DATA_SOURCE_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.DataSourceStrategyId,
                            actionType: action.type,
                            state: newState.DataSource,
                            diffInfo: diff,
                            objectChanged: actionTyped.dataSource,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                     EXPORT
                    **********************
                     */
                    case ExportRedux.REPORT_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ExportStrategyId,
                            actionType: action.type,
                            state: newState.Export,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_REPORT_STATE_PROPERTY,
                            oldValue: oldState.Export.CurrentReport,
                            newValue: actionTyped.SelectedReport,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ExportRedux.REPORT_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ExportStrategyId,
                            actionType: action.type,
                            state: newState.Export,
                            diffInfo: diff,
                            objectChanged: actionTyped.report,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ExportRedux.REPORT_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ExportStrategyId,
                            actionType: action.type,
                            state: newState.Export,
                            diffInfo: diff,
                            objectChanged: actionTyped.report,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ExportRedux.REPORT_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ExportStrategyId,
                            actionType: action.type,
                            state: newState.Export,
                            diffInfo: diff,
                            objectChanged: actionTyped.report,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    } /*
                    **********************
                    FLASHING CELL
                    **********************
                     */
                    case FlashingCellsRedux.FLASHING_CELL_CHANGE_UP_COLOR: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FlashingCellsStrategyId,
                            actionType: action.type,
                            state: newState.FlashingCell,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.FLASHING_CELL_DEFAULT_UP_COLOR_STATE_PROPERTY,
                            oldValue: oldState.FlashingCell.DefaultUpColor,
                            newValue: actionTyped.UpColor,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case FlashingCellsRedux.FLASHING_CELL_CHANGE_DOWN_COLOR: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FlashingCellsStrategyId,
                            actionType: action.type,
                            state: newState.FlashingCell,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.FLASHING_CELL_DEFAULT_DOWN_COLOR_STATE_PROPERTY,
                            oldValue: oldState.FlashingCell.DefautDownColor,
                            newValue: actionTyped.DownColor,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case FlashingCellsRedux.FLASHING_CELL_CHANGE_DURATION: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FlashingCellsStrategyId,
                            actionType: action.type,
                            state: newState.FlashingCell,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.FLASHING_CELL_DEFAULT_DURATION_STATE_PROPERTY,
                            oldValue: oldState.FlashingCell.DefaultDuration.toString(),
                            newValue: actionTyped.NewFlashDuration.toString(),
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    FORMAT COLUMN
                    **********************
                     */
                    case FormatColumnRedux.FORMAT_COLUMN_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FormatColumnStrategyId,
                            actionType: action.type,
                            state: newState.FormatColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.formatColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case FormatColumnRedux.FORMAT_COLUMN_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FormatColumnStrategyId,
                            actionType: action.type,
                            state: newState.FormatColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.formatColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case FormatColumnRedux.FORMAT_COLUMN_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FormatColumnStrategyId,
                            actionType: action.type,
                            state: newState.FormatColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.formatColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    FREE TEXT COLUMN
                    **********************
                     */
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FreeTextColumnStrategyId,
                            actionType: action.type,
                            state: newState.FreeTextColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.freeTextColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FreeTextColumnStrategyId,
                            actionType: action.type,
                            state: newState.FreeTextColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.freeTextColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.FreeTextColumnStrategyId,
                            actionType: action.type,
                            state: newState.FreeTextColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.freeTextColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    LAYOUT
                    **********************
                     */
                    case LayoutRedux.LAYOUT_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.LayoutStrategyId,
                            actionType: action.type,
                            state: newState.Layout,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_LAYOUT_STATE_PROPERTY,
                            oldValue: oldState.Layout.CurrentLayout,
                            newValue: actionTyped.LayoutName,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case LayoutRedux.LAYOUT_SAVE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.LayoutStrategyId,
                            actionType: action.type,
                            state: newState.Layout,
                            diffInfo: diff,
                            objectChanged: actionTyped.layout,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case LayoutRedux.LAYOUT_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.LayoutStrategyId,
                            actionType: action.type,
                            state: newState.Layout,
                            diffInfo: diff,
                            objectChanged: actionTyped.layout,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case LayoutRedux.LAYOUT_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.LayoutStrategyId,
                            actionType: action.type,
                            state: newState.Layout,
                            diffInfo: diff,
                            objectChanged: actionTyped.layout,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case LayoutRedux.LAYOUT_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.LayoutStrategyId,
                            actionType: action.type,
                            state: newState.Layout,
                            diffInfo: diff,
                            objectChanged: actionTyped.layout,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    PERCENT BAR
                    **********************
                     */
                    case PercentBarRedux.PERCENT_BAR_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.PercentBarStrategyId,
                            actionType: action.type,
                            state: newState.PercentBar,
                            diffInfo: diff,
                            objectChanged: actionTyped.percentBar,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case PercentBarRedux.PERCENT_BAR_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.PercentBarStrategyId,
                            actionType: action.type,
                            state: newState.PercentBar,
                            diffInfo: diff,
                            objectChanged: actionTyped.percentBar,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case PercentBarRedux.PERCENT_BAR_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.PercentBarStrategyId,
                            actionType: action.type,
                            state: newState.PercentBar,
                            diffInfo: diff,
                            objectChanged: actionTyped.percentBar,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    Sparklines
                    **********************
                     */
                    case SparklineColumnRedux.SPARKLINE_COLUMNS_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.SparklineStrategyId,
                            actionType: action.type,
                            state: newState.SparklineColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.sparklineColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case SparklineColumnRedux.SPARKLINE_COLUMNS_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.SparklineStrategyId,
                            actionType: action.type,
                            state: newState.SparklineColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.sparklineColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case SparklineColumnRedux.SPARKLINE_COLUMNS_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.SparklineStrategyId,
                            actionType: action.type,
                            state: newState.SparklineColumn,
                            diffInfo: diff,
                            objectChanged: actionTyped.sparklineColumn,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    PLUS / MINUS
                    **********************
                     */
                    case PlusMinusRedux.PLUS_MINUS_RULE_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.PlusMinusStrategyId,
                            actionType: action.type,
                            state: newState.PlusMinus,
                            diffInfo: diff,
                            objectChanged: actionTyped.plusMinusRule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case PlusMinusRedux.PLUS_MINUS_RULE_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.PlusMinusStrategyId,
                            actionType: action.type,
                            state: newState.PlusMinus,
                            diffInfo: diff,
                            objectChanged: actionTyped.plusMinusRule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case PlusMinusRedux.PLUS_MINUS_RULE_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.PlusMinusStrategyId,
                            actionType: action.type,
                            state: newState.PlusMinus,
                            diffInfo: diff,
                            objectChanged: actionTyped.plusMinusRule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    QUICK SEARCH
                    **********************
                     */
                    case QuickSearchRedux.QUICK_SEARCH_APPLY: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.QuickSearchStrategyId,
                            actionType: action.type,
                            state: newState.QuickSearch,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.QUICK_SEARCH_TEXT_STATE_PROPERTY,
                            oldValue: oldState.QuickSearch.QuickSearchText,
                            newValue: actionTyped.quickSearchText,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.QuickSearchStrategyId,
                            actionType: action.type,
                            state: newState.QuickSearch,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.QUICK_SEARCH_DISPLAY_ACTION_STATE_PROPERTY,
                            oldValue: oldState.QuickSearch.DisplayAction,
                            newValue: actionTyped.DisplayAction,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case QuickSearchRedux.QUICK_SEARCH_SET_STYLE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.QuickSearchStrategyId,
                            actionType: action.type,
                            state: newState.QuickSearch,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.QUICK_SEARCH_STYLE_STATE_PROPERTY,
                            oldValue: adaptable.AuditLogService.convertAuditMessageToText(oldState.QuickSearch.Style),
                            newValue: adaptable.AuditLogService.convertAuditMessageToText(actionTyped.style),
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    REMINDER
                    **********************
                     */
                    case ReminderRedux.REMINDER_SCHEDULE_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ReminderStrategyId,
                            actionType: action.type,
                            state: newState.Reminder,
                            diffInfo: diff,
                            objectChanged: actionTyped.reminderSchedule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ReminderRedux.REMINDER_SCHEDULE_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ReminderStrategyId,
                            actionType: action.type,
                            state: newState.Reminder,
                            diffInfo: diff,
                            objectChanged: actionTyped.reminderSchedule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ReminderRedux.REMINDER_SCHEDULE_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ReminderStrategyId,
                            actionType: action.type,
                            state: newState.Reminder,
                            diffInfo: diff,
                            objectChanged: actionTyped.reminderSchedule,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    SHORTCUT
                    **********************
                     */
                    case ShortcutRedux.SHORTCUT_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ShortcutStrategyId,
                            actionType: action.type,
                            state: newState.Shortcut,
                            diffInfo: diff,
                            objectChanged: actionTyped.shortcut,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ShortcutRedux.SHORTCUT_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ShortcutStrategyId,
                            actionType: action.type,
                            state: newState.Shortcut,
                            diffInfo: diff,
                            objectChanged: actionTyped.shortcut,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case ShortcutRedux.SHORTCUT_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ShortcutStrategyId,
                            actionType: action.type,
                            state: newState.Shortcut,
                            diffInfo: diff,
                            objectChanged: actionTyped.shortcut,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    SMART EDIT
                    **********************
                     */
                    case SmartEditRedux.SMARTEDIT_CHANGE_VALUE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.SmartEditStrategyId,
                            actionType: action.type,
                            state: newState.SmartEdit,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.SMART_EDIT_VALUE_STATE_PROPERTY,
                            oldValue: oldState.SmartEdit.SmartEditValue.toString(),
                            newValue: actionTyped.value.toString(),
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.SmartEditStrategyId,
                            actionType: action.type,
                            state: newState.SmartEdit,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.SMART_EDIT_MATH_OPERATION_STATE_PROPERTY,
                            oldValue: oldState.SmartEdit.MathOperation,
                            newValue: actionTyped.MathOperation,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    THEME
                    **********************
                     */
                    case ThemeRedux.THEME_SELECT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.ThemeStrategyId,
                            actionType: action.type,
                            state: newState.Theme,
                            diffInfo: diff,
                            propertyName: GeneralConstants_1.CURRENT_THEME_STATE_PROPERTY,
                            oldValue: oldState.Theme.CurrentTheme,
                            newValue: actionTyped.type,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /*
                    **********************
                    USER FILTER
                    **********************
                     */
                    case UserFilterRedux.USER_FILTER_ADD: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.UserFilterStrategyId,
                            actionType: action.type,
                            state: newState.UserFilter,
                            diffInfo: diff,
                            objectChanged: actionTyped.userFilter,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Created,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case UserFilterRedux.USER_FILTER_EDIT: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.UserFilterStrategyId,
                            actionType: action.type,
                            state: newState.UserFilter,
                            diffInfo: diff,
                            objectChanged: actionTyped.userFilter,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Updated,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    case UserFilterRedux.USER_FILTER_DELETE: {
                        var actionTyped = action;
                        var changedDetails = {
                            name: StrategyConstants.UserFilterStrategyId,
                            actionType: action.type,
                            state: newState.UserFilter,
                            diffInfo: diff,
                            objectChanged: actionTyped.userFilter,
                            stateObjectChangeType: AuditEvents_1.StateObjectChangeType.Deleted,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
                        return ret;
                    }
                    /**
                     * TODO: Dashboard,  Teamsharing
                     *
                     * NOT DOING AS THEY DONT CHANGE:  Entitlement, UserInterface
                     */
                    // leave this here in case we miss any actions and then at least we have the old and new state
                    // but we wont have meaningful details of what has changed - so try to avoid
                    default: {
                        var stateChangedDetails = {
                            name: 'User State Changes',
                            actionType: action.type,
                            state: null,
                            diffInfo: diff,
                        };
                        adaptable.AuditLogService.addUserStateChangeAuditLog(stateChangedDetails);
                        return ret;
                    }
                }
            };
        };
    };
};
// this function is responsible for sending any  user-action functions to the audit
// there are relatively few - primarily relating to search and edit functions
// note it does not capture when something happens automatically as the result of a function (e.g. if a conditional style gets applied because a value has changed)
// e.g. this should say when the current Advanced search has changed, or if a custom sort is being applied (it doesnt yet), but not when sorts have been added generally or searches changed
var functionAppliedLogMiddleware = function (adaptable) {
    return function (middlewareAPI) {
        return function (next) {
            return function (action) {
                if (!adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
                    // not logging functions so leave...
                    return next(action);
                }
                if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(getFunctionAppliedReduxActions(), action.type)) {
                    // not an applied functions so leave...
                    return next(action);
                }
                var state = middlewareAPI.getState();
                // Note: not done custom sort as not sure how!
                // Shortcut Apply, Bulk Update Apply and Smart Edit Apply we do in relevant Strategy
                switch (action.type) {
                    case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
                        var actionTyped_1 = action;
                        var advancedSearch = state.AdvancedSearch.AdvancedSearches.find(function (as) { return as.Name == actionTyped_1.selectedSearchName; });
                        var functionAppliedDetails = {
                            name: StrategyConstants.AdvancedSearchStrategyId,
                            action: action.type,
                            info: actionTyped_1.selectedSearchName,
                            data: advancedSearch,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case CalendarRedux.CALENDAR_SELECT: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.CalendarStrategyId,
                            action: action.type,
                            info: GeneralConstants_1.CURRENT_CALENDAR_STATE_PROPERTY,
                            data: actionTyped.selectedCalendarName,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case ChartRedux.CHART_DEFINITION_SELECT: {
                        var actionTyped_2 = action;
                        var chart = state.Chart.ChartDefinitions.find(function (cd) { return cd.Name == actionTyped_2.chartName; });
                        var functionAppliedDetails = {
                            name: StrategyConstants.ChartStrategyId,
                            action: action.type,
                            info: actionTyped_2.chartName,
                            data: chart,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case DataSourceRedux.DATA_SOURCE_SELECT: {
                        var actionTyped_3 = action;
                        var dataSource = state.DataSource.DataSources.find(function (ds) { return ds.Name == actionTyped_3.SelectedDataSource; });
                        var functionAppliedDetails = {
                            name: StrategyConstants.DataSourceStrategyId,
                            action: action.type,
                            info: actionTyped_3.SelectedDataSource,
                            data: dataSource,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case ExportRedux.EXPORT_APPLY: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.ExportStrategyId,
                            action: action.type,
                            info: actionTyped.Report.Name,
                            data: actionTyped.Report,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case FlashingCellsRedux.FLASHING_CELL_SELECT: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.FlashingCellsStrategyId,
                            action: action.type,
                            info: adaptable.AuditLogService.convertAuditMessageToText(actionTyped.FlashingCell),
                            data: actionTyped.FlashingCell,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case FlashingCellsRedux.FLASHING_CELL_SELECT_ALL: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.FlashingCellsStrategyId,
                            action: action.type,
                            info: adaptable.AuditLogService.convertAuditMessageToText(actionTyped.FlashingCells),
                            data: actionTyped.FlashingCells,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.FreeTextColumnStrategyId,
                            action: action.type,
                            info: actionTyped.FreeTextColumn.ColumnId,
                            data: actionTyped.FreeTextStoredValue,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    // should we create a Quick Search Clear?  Might be neater...
                    case QuickSearchRedux.QUICK_SEARCH_APPLY: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.QuickSearchStrategyId,
                            action: action.type,
                            info: actionTyped.quickSearchText,
                            data: state.QuickSearch,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.QuickSearchStrategyId,
                            action: action.type,
                            info: actionTyped.DisplayAction,
                            data: state.QuickSearch,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case QuickSearchRedux.QUICK_SEARCH_SET_STYLE: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.QuickSearchStrategyId,
                            action: action.type,
                            info: actionTyped.style.ClassName,
                            data: state.QuickSearch,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case PlusMinusRedux.PLUS_MINUS_APPLY: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.PlusMinusStrategyId,
                            action: action.type,
                            info: 'KeyPressed:',
                            data: actionTyped.GridCells,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case ThemeRedux.THEME_SELECT: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.ThemeStrategyId,
                            action: action.type,
                            info: GeneralConstants_1.CURRENT_THEME_STATE_PROPERTY,
                            data: actionTyped.Theme,
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case ColumnFilterRedux.COLUMN_FILTER_ADD: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            action: action.type,
                            info: 'Column Filter Applied',
                            data: {
                                Column: actionTyped.columnFilter.ColumnId,
                                ColumnFilter: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(actionTyped.columnFilter.Filter, middlewareAPI.getState().Grid.Columns),
                            },
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case ColumnFilterRedux.COLUMN_FILTER_EDIT: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            action: action.type,
                            info: 'Column Filter Updated',
                            data: {
                                Column: actionTyped.columnFilter.ColumnId,
                                ColumnFilter: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(actionTyped.columnFilter.Filter, middlewareAPI.getState().Grid.Columns),
                            },
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
                        var actionTyped = action;
                        var functionAppliedDetails = {
                            name: StrategyConstants.ColumnFilterStrategyId,
                            action: action.type,
                            info: 'Column Filter Cleared',
                            data: {
                                Column: actionTyped.columnFilter,
                            },
                        };
                        adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
                        return next(action);
                    }
                    default: {
                        // not one of the functions we log so nothing to do
                        return next(action);
                    }
                }
            };
        };
    };
};
// this is the main function for dealing with Redux Actions which require additional functionality to be triggered.
// Please document each use case where we have to use the Store rather than a strategy or a popup screen
var adaptableadaptableMiddleware = function (adaptable) {
    return function (middlewareAPI) {
        return function (next) {
            return function (action) {
                switch (action.type) {
                    /*******************
                     * ADVANCED SEARCH ACTIONS
                     *******************/
                    /**
                     * Use Case: User has selected an Advanced Search
                     * Action: Apply Grid Filtering
                     */
                    case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
                        var ret = next(action);
                        adaptable.applyGridFiltering();
                        return ret;
                    }
                    /**
                     * Use Case: User has deleted an Advanced Search
                     * Action: If the deleted Advanced Search was the currently selected one: Apply Grid Filtering
                     */
                    case AdvancedSearchRedux.ADVANCED_SEARCH_DELETE: {
                        var actionTyped_4 = action;
                        var CurrentAdvancedSearch = middlewareAPI.getState().AdvancedSearch
                            .CurrentAdvancedSearch;
                        var ret = next(action);
                        if (CurrentAdvancedSearch == actionTyped_4.advancedSearch.Name) {
                            adaptable.applyGridFiltering();
                        }
                        return ret;
                    }
                    /*******************
                     * ALERT ACTIONS
                     *******************/
                    /**
                     * Use Case: User has deleted a System Alert which has a Highlight Cell
                     * Action: Refresh the cell (to clear the style)
                     */
                    case SystemRedux.SYSTEM_ALERT_DELETE: {
                        var actionTyped_5 = action;
                        var ret = next(action);
                        if (actionTyped_5.Alert.AlertDefinition.AlertProperties.HighlightCell &&
                            actionTyped_5.Alert.DataChangedInfo) {
                            var record = actionTyped_5.Alert.DataChangedInfo.RowNode;
                            adaptable.refreshCells([record], [actionTyped_5.Alert.DataChangedInfo.ColumnId]);
                        }
                        return ret;
                    }
                    /**
                     * Use Case: User has deleted all System Alerts some of which have a Highlight Cell
                     * Action: Refresh the cell (to clear the style)
                     */
                    case SystemRedux.SYSTEM_ALERT_DELETE_ALL: {
                        var actionTyped_6 = action;
                        var ret = next(action);
                        var alerts = actionTyped_6.Alerts;
                        alerts.forEach(function (alert) {
                            if (alert.AlertDefinition.AlertProperties.HighlightCell && alert.DataChangedInfo) {
                                var record = alert.DataChangedInfo.RowNode;
                                adaptable.refreshCells([record], [alert.DataChangedInfo.ColumnId]);
                            }
                        });
                        return ret;
                    }
                    /*******************
                     * UPDATED ROW ACTIONS
                     *******************/
                    /**
                     * Use Case: User has deleted a Updated Row
                     * Action: Refresh the row (to clear the style)
                     */
                    case SystemRedux.SYSTEM_UPDATED_ROW_DELETE: {
                        var actionTyped_7 = action;
                        var ret = next(action);
                        var rowNode = adaptable.getRowNodeForPrimaryKey(actionTyped_7.updatedRowInfo.primaryKeyValue);
                        adaptable.redrawRow(rowNode);
                        return ret;
                    }
                    /**
                     * Use Case: User has deleted all Updated Rows
                     * Action: Refresh the rows (to clear the style)
                     */
                    case SystemRedux.SYSTEM_UPDATED_ROW_DELETE_ALL: {
                        var actionTyped_8 = action;
                        var ret = next(action);
                        var updatedRowInfos = actionTyped_8.updatedRowInfos;
                        updatedRowInfos.forEach(function (uri) {
                            var rowNode = adaptable.getRowNodeForPrimaryKey(uri.primaryKeyValue);
                            adaptable.redrawRow(rowNode);
                        });
                        return ret;
                    }
                    /*******************
                     * CALCULATED COLUMN ACTIONS
                     *******************/
                    /**
                     * Use Case: User is creating a calculated column and want to check if its valid
                     * Action: If it is valid, then clear any error; otherwise set one
                     */
                    case SystemRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID: {
                        var returnObj = adaptable.CalculatedColumnExpressionService.IsExpressionValid(action.expression);
                        if (!returnObj.IsValid) {
                            middlewareAPI.dispatch(SystemRedux.CalculatedColumnSetErrorMessage(returnObj.ErrorMsg));
                        }
                        else {
                            middlewareAPI.dispatch(SystemRedux.CalculatedColumnSetErrorMessage(null));
                        }
                        return next(action);
                    }
                    /**
                     * Use Cases: User has created / edited / deleted a Calculated Column
                     * Action:  Tell Adaptableso it can do what it needs
                     */
                    case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
                        var returnAction = next(action);
                        var calculatedColumn = action
                            .calculatedColumn;
                        adaptable.addCalculatedColumnToGrid(calculatedColumn);
                        return returnAction;
                    }
                    case CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE: {
                        var actionTyped_9 = action;
                        adaptable.removeCalculatedColumnFromGrid(actionTyped_9.calculatedColumn.ColumnId);
                        var returnAction = next(action);
                        return returnAction;
                    }
                    case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
                        var actionTyped_10 = action;
                        adaptable.editCalculatedColumnInGrid(actionTyped_10.calculatedColumn);
                        var returnAction = next(action);
                        return returnAction;
                    }
                    /*******************
                     * FREE TEXT COLUMN ACTIONS
                     *******************/
                    /**
                     * Use Cases: User has created / edited / deleted a Free Text column
                     * Action:  Tell Adaptableso it can do what it needs
                     */
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
                        var actionTyped_11 = action;
                        adaptable.addFreeTextColumnToGrid(actionTyped_11.freeTextColumn);
                        var returnAction = next(action);
                        return returnAction;
                    }
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
                        var actionTyped_12 = action;
                        adaptable.editFreeTextColumnInGrid(actionTyped_12.freeTextColumn);
                        var returnAction = next(action);
                        return returnAction;
                    }
                    case FreeTextColumnRedux.FREE_TEXT_COLUMN_DELETE: {
                        var actionTyped_13 = action;
                        adaptable.removeFreeTextColumnFromGrid(actionTyped_13.freeTextColumn.ColumnId);
                        var returnAction = next(action);
                        return returnAction;
                    }
                    /*******************
                     * COLUMN CATEGORY ACTIONS
                     *******************/
                    /**
                     * Use Case: User deletes a Column Category (and there might be conditional styles that reference it)
                     * Action (1):  Get all condiitonal styles from state
                     * Action (2):  Delete any (without currently showing a warning) that reference this Column Category
                     */
                    case ColumnCategoryRedux.COLUMN_CATEGORY_DELETE: {
                        var returnAction = next(action);
                        var actionTyped_14 = action;
                        var conditionalStyleState = middlewareAPI.getState().ConditionalStyle;
                        conditionalStyleState.ConditionalStyles.forEach(function (cs) {
                            if (cs.ColumnCategoryId == actionTyped_14.columnCategory.ColumnCategoryId) {
                                // some warning?
                                middlewareAPI.dispatch(ConditionalStyleRedux.ConditionalStyleDelete(cs));
                            }
                        });
                        return returnAction;
                    }
                    /*******************
                     * CHART ACTIONS
                     *******************/
                    /**
                     * Use Case: User deletes a chart (which might be currently showing)
                     * Action:  Set ALL chart visibility to hidden (even if its not current chart)?
                     * Also - check if the chart being deleted is the current chart and if so then update the current selected chart to empty.
                     * Note:  No need to worry about using a popup as cannot delete a chart while in popup (other than through api)
                     */
                    case ChartRedux.CHART_DEFINITION_DELETE: {
                        var returnAction = next(action);
                        middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
                        var chartState = middlewareAPI.getState().Chart;
                        var currentChartName = chartState.CurrentChartName;
                        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(currentChartName)) {
                            var actionTyped_15 = action;
                            var chartDefinition = actionTyped_15.chartDefinition;
                            if (chartDefinition && currentChartName == actionTyped_15.chartDefinition.Name) {
                                middlewareAPI.dispatch(ChartRedux.ChartDefinitionSelect(''));
                            }
                        }
                        return returnAction;
                    }
                    /**
                     * Use Case: User clears the currrent chart
                     * Action:  Set chart visibility to hidden
                     */
                    case ChartRedux.CHART_DEFINITION_SELECT: {
                        var actionTyped_16 = action;
                        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(actionTyped_16.chartName)) {
                            middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
                        }
                        var returnAction = next(action);
                        return returnAction;
                    }
                    /**
                     * Use Case: User sets chart visibility to Maximised (probably from the Chart popup by showing a chart)
                     * Action:  Close all popups (so that user directly sees the chart)
                     */
                    case SystemRedux.CHART_SET_CHART_VISIBILITY: {
                        var actionTyped_17 = action;
                        if (actionTyped_17.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        }
                        return next(action);
                    }
                    /*******************
                     * LAYOUT ACTIONS
                     *******************/
                    case LayoutRedux.LAYOUT_SELECT: {
                        var returnAction = next(action);
                        var layoutState_1 = middlewareAPI.getState().Layout;
                        var currentLayout_1 = layoutState_1.Layouts.find(function (l) { return l.Name == layoutState_1.CurrentLayout; });
                        if (currentLayout_1) {
                            if (currentLayout_1.AdaptableGridInfo == null) {
                                currentLayout_1.AdaptableGridInfo = {
                                    CurrentColumns: currentLayout_1.Columns,
                                    CurrentColumnSorts: currentLayout_1.ColumnSorts,
                                };
                            }
                            var hasNoVendorGridInfo = currentLayout_1.VendorGridInfo == null;
                            if (hasNoVendorGridInfo) {
                                adaptable.setGroupedColumns(currentLayout_1.GroupedColumns);
                                adaptable.setPivotingDetails(currentLayout_1.PivotDetails);
                            }
                            var gridState_1 = middlewareAPI.getState().Grid;
                            // set columns
                            var adaptableColumns_1 = [];
                            currentLayout_1.AdaptableGridInfo.CurrentColumns.forEach(function (c) {
                                var column = ColumnHelper_1.ColumnHelper.getColumnFromId(c, gridState_1.Columns);
                                if (column) {
                                    adaptableColumns_1.push(column);
                                }
                                else {
                                    LoggingHelper_1.LoggingHelper.LogAdaptableWarning("Column '" + c + "' not found while selecting layout: " + currentLayout_1);
                                }
                            });
                            middlewareAPI.dispatch(SystemRedux.SetNewColumnListOrder(adaptableColumns_1));
                            // set sort
                            middlewareAPI.dispatch(GridRedux.GridSetSort(currentLayout_1.AdaptableGridInfo.CurrentColumnSorts));
                            adaptable.setColumnSort(currentLayout_1.AdaptableGridInfo.CurrentColumnSorts);
                            // set pivot mode
                            adaptable.setPivotMode(currentLayout_1.PivotDetails, currentLayout_1.VendorGridInfo);
                            // set vendor specific info
                            adaptable.setVendorGridLayoutInfo(currentLayout_1.VendorGridInfo);
                            //  adaptable.reloadGrid();
                            if (hasNoVendorGridInfo) {
                                var currentGridVendorInfo = currentLayout_1.Name == GeneralConstants_1.DEFAULT_LAYOUT
                                    ? adaptable.getVendorGridDefaultLayoutInfo()
                                    : adaptable.getVendorGridLayoutInfo(currentLayout_1.AdaptableGridInfo.CurrentColumns);
                                currentLayout_1.VendorGridInfo = currentGridVendorInfo;
                                middlewareAPI.dispatch(LayoutRedux.LayoutSave(currentLayout_1));
                            }
                        }
                        return returnAction;
                    }
                    case LayoutRedux.LAYOUT_DELETE: {
                        var returnAction = next(action);
                        var layoutState_2 = middlewareAPI.getState().Layout;
                        var currentLayout = layoutState_2.Layouts.find(function (l) { return l.Name == layoutState_2.CurrentLayout; });
                        if (!currentLayout) {
                            // we have deleted the current layout (allowed) so lets make the layout default
                            middlewareAPI.dispatch(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
                        }
                        return returnAction;
                    }
                    case LayoutRedux.LAYOUT_SAVE: {
                        var returnAction = next(action);
                        var actionTyped_18 = action;
                        var layout_1 = Helper_1.Helper.cloneObject(actionTyped_18.layout);
                        if (layout_1.AdaptableGridInfo == null) {
                            layout_1.AdaptableGridInfo = {
                                CurrentColumns: layout_1.Columns,
                                CurrentColumnSorts: layout_1.ColumnSorts,
                            };
                        }
                        if (layout_1.VendorGridInfo == null) {
                            adaptable.setGroupedColumns(layout_1.GroupedColumns);
                            adaptable.setPivotingDetails(layout_1.PivotDetails);
                        }
                        var layouts = adaptable.api.layoutApi.getAllLayout();
                        var isExistingLayout = layouts.find(function (l) { return l.Uuid == layout_1.Uuid; }) != null;
                        // if its default layout then we need to use the id for that one to prevent 2 layouts being created
                        // - this is all a bit messy and needs refactoring
                        if (layout_1.Name == GeneralConstants_1.DEFAULT_LAYOUT) {
                            var currentDefaultLayout = layouts.find(function (l) { return l.Name == GeneralConstants_1.DEFAULT_LAYOUT; });
                            if (currentDefaultLayout) {
                                layout_1.Uuid = currentDefaultLayout.Uuid;
                                isExistingLayout = true;
                            }
                        }
                        if (isExistingLayout) {
                            var currentGridVendorInfo = layout_1.Name == GeneralConstants_1.DEFAULT_LAYOUT
                                ? adaptable.getVendorGridDefaultLayoutInfo()
                                : adaptable.getVendorGridLayoutInfo(layout_1.AdaptableGridInfo.CurrentColumns);
                            layout_1.VendorGridInfo = currentGridVendorInfo;
                            middlewareAPI.dispatch(LayoutRedux.LayoutEdit(layout_1));
                        }
                        else {
                            middlewareAPI.dispatch(LayoutRedux.LayoutAdd(layout_1));
                        }
                        return returnAction;
                    }
                    case LayoutRedux.LAYOUT_RESTORE: {
                        var returnAction = next(action);
                        var actionTyped_19 = action;
                        var layout = Helper_1.Helper.cloneObject(actionTyped_19.layout);
                        layout.VendorGridInfo = null;
                        layout.AdaptableGridInfo = null;
                        if (layout.GroupedColumns == null) {
                            layout.GroupedColumns = [];
                        }
                        adaptable.setGroupedColumns(layout.GroupedColumns);
                        adaptable.setPivotingDetails(layout.PivotDetails);
                        middlewareAPI.dispatch(LayoutRedux.LayoutEdit(layout));
                        middlewareAPI.dispatch(LayoutRedux.LayoutSelect(layout.Name));
                        return returnAction;
                    }
                    /*******************
                     * SMART EDIT ACTIONS
                     *******************/
                    /**
                     * Use Case: User wants to perform Smart Edit and we need to check if the cell selection is valid
                     * Action (1):  Get the result from the SmartEdit strategy
                     * If the return is an Alert:
                     * Action (2): If there is a popup open, close it and show the Alert; otherwise just set false valid selection
                     * If the return is valid:
                     * Action (2): Set the valid selection to true
                     * Action (3): Build the Preview Values (via Smart Edit strategy)
                     * Action (4): Set the Preview Values (this will populate the preview screen)
                     */
                    case SystemRedux.SMARTEDIT_CHECK_CELL_SELECTION: {
                        var SmartEditStrategy = (adaptable.strategies.get(StrategyConstants.SmartEditStrategyId));
                        var state = middlewareAPI.getState();
                        var returnAction = next(action);
                        var apiReturn = SmartEditStrategy.CheckCorrectCellSelection();
                        if (apiReturn.Alert) {
                            // check if Smart Edit is showing as popup and then close and show error (dont want to do that if from toolbar)
                            var popup = state.Popup.ScreenPopup;
                            if (popup.ComponentName == ScreenPopups.SmartEditPopup) {
                                // We are in SmartEditPopup so let's close it
                                middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                                // and now show the alert Popup
                                middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                            }
                            middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(false));
                        }
                        else {
                            middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(true));
                            var apiPreviewReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation);
                            middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiPreviewReturn));
                        }
                        return returnAction;
                    }
                    /**
                     * Use Case: User has changed a Smmart Edit property or requested a preview
                     * Action (1):  Get the new preview set from the Smart Edit Strategy
                     * Action (2):  Set the Preview Values (this will populate the preview screen)
                     */
                    case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION:
                    case SmartEditRedux.SMARTEDIT_CHANGE_VALUE:
                    case SystemRedux.SMARTEDIT_FETCH_PREVIEW: {
                        //all our logic needs to be executed AFTER the main reducers
                        //so our state is up to date which allow us not to care about the data within each different action
                        var returnAction = next(action);
                        var SmartEditStrategy = (adaptable.strategies.get(StrategyConstants.SmartEditStrategyId));
                        var state = middlewareAPI.getState();
                        var apiReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation);
                        middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiReturn));
                        return returnAction;
                    }
                    /**
                     * Use Case: User has clicked 'Apply' in Smart Edit popup or toolbar
                     * Action (1):  Gets the values that need to be applied from the Preview Info and passes to Preview Helper (incl. whether to bypass validation)
                     * Action (2):  Sends these new values to the Smart Edit Strategy (which will, in turn, apply them to Adaptable)
                     */
                    case SmartEditRedux.SMARTEDIT_APPLY: {
                        var SmartEditStrategy = (adaptable.strategies.get(StrategyConstants.SmartEditStrategyId));
                        var actionTyped_20 = action;
                        var thePreview = middlewareAPI.getState().System.SmartEditPreviewInfo;
                        var newValues = PreviewHelper_1.PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped_20.bypassCellValidationWarnings);
                        SmartEditStrategy.ApplySmartEdit(newValues);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    /*******************
                     * BULK UPDATE ACTIONS
                     *******************/
                    case SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION: {
                        var BulkUpdateStrategy = (adaptable.strategies.get(StrategyConstants.BulkUpdateStrategyId));
                        var state = middlewareAPI.getState();
                        var returnAction = next(action);
                        var apiReturn = BulkUpdateStrategy.checkCorrectCellSelection();
                        if (apiReturn.Alert) {
                            // check if BulkUpdate is showing as popup
                            var popup = state.Popup.ScreenPopup;
                            if (popup.ComponentName == ScreenPopups.BulkUpdatePopup) {
                                //We close the BulkUpdatePopup
                                middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                                //We show the Error Popup -- assume that will alwasy be an Error
                                middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                            }
                        }
                        middlewareAPI.dispatch(SystemRedux.BulkUpdateSetValidSelection(apiReturn));
                        return returnAction;
                    }
                    // Here we have all actions that triggers a refresh of the BulkUpdatePreview
                    case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
                        //all our logic needs to be executed AFTER the main reducers
                        //so our state is up to date which allow us not to care about the data within each different action
                        var returnAction = next(action);
                        var BulkUpdateStrategy = (adaptable.strategies.get(StrategyConstants.BulkUpdateStrategyId));
                        var state = middlewareAPI.getState();
                        var apiReturn = BulkUpdateStrategy.buildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                        middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiReturn));
                        return returnAction;
                    }
                    case BulkUpdateRedux.BULK_UPDATE_APPLY: {
                        var BulkUpdateStrategy = (adaptable.strategies.get(StrategyConstants.BulkUpdateStrategyId));
                        var actionTyped_21 = action;
                        var thePreview = middlewareAPI.getState().System.BulkUpdatePreviewInfo;
                        var newValues = PreviewHelper_1.PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped_21.bypassCellValidationWarnings);
                        BulkUpdateStrategy.applyBulkUpdate(newValues);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    /*******************
                     * PLUS MINUS ACTIONS
                     *******************/
                    case PlusMinusRedux.PLUS_MINUS_APPLY: {
                        // This is for the very rare use case that a Plus Minus breaks validation and the user wants to continue
                        // in which case we just need to apply the values to the Grid
                        var actionTyped_22 = action;
                        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(actionTyped_22.GridCells)) {
                            var dataChangedInfos = actionTyped_22.GridCells.map(function (gc) {
                                return {
                                    OldValue: adaptable.getDisplayValue(gc.primaryKeyValue, gc.columnId),
                                    NewValue: gc.rawValue,
                                    ColumnId: gc.columnId,
                                    PrimaryKeyValue: gc.primaryKeyValue,
                                };
                            });
                            dataChangedInfos.forEach(function (dc) {
                                adaptable.setValue(dc, true);
                            });
                        }
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    /*******************
                     * EXPORT ACTIONS
                     *******************/
                    case ExportRedux.EXPORT_APPLY: {
                        var exportStrategy = (adaptable.strategies.get(StrategyConstants.ExportStrategyId));
                        var actionTyped_23 = action;
                        exportStrategy.export(actionTyped_23.Report, actionTyped_23.ExportDestination);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    // When deleting a report check if its the currently selected one
                    // if it is then clear
                    case ExportRedux.REPORT_DELETE: {
                        var actionTyped_24 = action;
                        var report = actionTyped_24.report;
                        var currentReport = middlewareAPI.getState().Export.CurrentReport;
                        if (report && report.Name == currentReport) {
                            middlewareAPI.dispatch(ExportRedux.ReportSelect(GeneralConstants_1.EMPTY_STRING));
                        }
                        return next(action);
                    }
                    /*******************
                     * IPUSHPULL ACTIONS
                     *******************/
                    case IPushPullRedux.IPUSHPULL_LOGIN: {
                        var actionTyped_25 = action;
                        adaptable.api.iPushPullApi.loginToIPushPull(actionTyped_25.username, actionTyped_25.password);
                        return next(action);
                    }
                    case IPushPullRedux.IPUSHPULL_SEND_SNAPSHOT: {
                        var iPushPullStrategy = (adaptable.strategies.get(StrategyConstants.IPushPullStrategyId));
                        var actionTyped_26 = action;
                        iPushPullStrategy.sendSnapshot(actionTyped_26.iPushPullReport);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    case IPushPullRedux.IPUSHPULL_START_LIVE_DATA: {
                        var iPushPullStrategy = (adaptable.strategies.get(StrategyConstants.IPushPullStrategyId));
                        var actionTyped_27 = action;
                        iPushPullStrategy.startLiveData(actionTyped_27.iPushPullReport);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    case IPushPullRedux.IPUSHPULL_STOP_LIVE_DATA: {
                        adaptable.api.iPushPullApi.stopLiveData();
                        return next(action);
                    }
                    case IPushPullRedux.IPUSHPULL_ADD_PAGE: {
                        var actionTyped_28 = action;
                        adaptable.api.iPushPullApi.addNewIPushPullPage(actionTyped_28.folder, actionTyped_28.page);
                        return next(action);
                    }
                    // Not doing this for ipushpull and think we should not do the same for the others
                    // when we come to update them
                    // better to do it in the api for each
                    case SystemRedux.REPORT_START_LIVE: {
                        var ret = next(action);
                        var actionTyped_29 = action;
                        // fire the Live Report event for Export Started
                        adaptable.ReportService.PublishLiveLiveDataChangedEvent(actionTyped_29.ReportDestination, 'LiveDataStarted');
                        // set livereport on
                        //  adaptable.api.internalApi.setLiveReportRunningOn();
                        return ret;
                    }
                    // Not doing this for ipushpull any more either
                    case SystemRedux.REPORT_STOP_LIVE: {
                        var actionTyped_30 = action;
                        var ret = next(action);
                        // fire the Live Report event for Export Stopped
                        adaptable.ReportService.PublishLiveLiveDataChangedEvent(actionTyped_30.ReportDestination, 'LiveDataStopped');
                        // set livereport off
                        //   adaptable.api.internalApi.setLiveReportRunningOff();
                        return ret;
                    }
                    /*******************
                     * GLUE42 ACTIONS
                     *******************/
                    case Glue42Redux.GLUE42_LOGIN: {
                        var actionTyped_31 = action;
                        adaptable.api.glue42Api.loginToGlue42(actionTyped_31.username, actionTyped_31.password);
                        return next(action);
                    }
                    case Glue42Redux.GLUE42_SEND_SNAPSHOT: {
                        var glue42Strategy = (adaptable.strategies.get(StrategyConstants.Glue42StrategyId));
                        var actionTyped_32 = action;
                        glue42Strategy.sendSnapshot(actionTyped_32.glue42Report);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    case Glue42Redux.GLUE42_START_LIVE_DATA: {
                        var glue42Strategy = (adaptable.strategies.get(StrategyConstants.Glue42StrategyId));
                        var actionTyped_33 = action;
                        glue42Strategy.startLiveData(actionTyped_33.glue42Report);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        return next(action);
                    }
                    case Glue42Redux.GLUE42_STOP_LIVE_DATA: {
                        adaptable.api.glue42Api.stopLiveData();
                        return next(action);
                    }
                    /*******************
                     * USER FILTER ACTIONS
                     *******************/
                    case UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER: {
                        var actionTyped_34 = action;
                        // first create a new user filter based on the column filter and input name
                        var userFilter = ObjectFactory_1.ObjectFactory.CreateUserFilterFromColumnFilter(actionTyped_34.ColumnFilter, actionTyped_34.InputText);
                        middlewareAPI.dispatch(UserFilterRedux.UserFilterAdd(userFilter));
                        // then update a new column filter from the user filter - so that it will display the user filter name
                        var columnFilter = actionTyped_34.ColumnFilter;
                        columnFilter.Filter = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(userFilter.ColumnId, [], [], [userFilter.Name], []);
                        middlewareAPI.dispatch(ColumnFilterRedux.ColumnFilterEdit(columnFilter));
                        return next(action);
                    }
                    /*******************
                     * TEAM SHARING ACTIONS
                     *******************/
                    // Use case - an item needs to be shared between teams
                    case TeamSharingRedux.TEAMSHARING_SHARE: {
                        var actionTyped_35 = action;
                        var returnAction = next(action);
                        var xhr_1 = new XMLHttpRequest();
                        xhr_1.onerror = function (ev) {
                            return LoggingHelper_1.LoggingHelper.LogAdaptableError('TeamSharing share error :' + ev.message, actionTyped_35.Entity);
                        };
                        xhr_1.ontimeout = function () {
                            return LoggingHelper_1.LoggingHelper.LogAdaptableWarning('TeamSharing share timeout', actionTyped_35.Entity);
                        };
                        xhr_1.onload = function () {
                            if (xhr_1.readyState == 4) {
                                if (xhr_1.status != 200) {
                                    LoggingHelper_1.LoggingHelper.LogAdaptableError('TeamSharing share error : ' + xhr_1.statusText, actionTyped_35.Entity);
                                    middlewareAPI.dispatch(PopupRedux.PopupShowAlert({
                                        Header: 'Team Sharing Error',
                                        Msg: "Couldn't share item: " + xhr_1.statusText,
                                        AlertDefinition: ObjectFactory_1.ObjectFactory.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                                    }));
                                }
                                else {
                                    middlewareAPI.dispatch(PopupRedux.PopupShowAlert({
                                        Header: 'Team Sharing',
                                        Msg: 'Item Shared Successfully',
                                        AlertDefinition: ObjectFactory_1.ObjectFactory.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Info),
                                    }));
                                }
                            }
                        };
                        //we make the request async
                        xhr_1.open('POST', configServerTeamSharingUrl, true);
                        xhr_1.setRequestHeader('Content-type', 'application/json');
                        var obj = {
                            entity: actionTyped_35.Entity,
                            user: adaptable.adaptableOptions.userName,
                            adaptable_id: adaptable.adaptableOptions.adaptableId,
                            functionName: actionTyped_35.FunctionName,
                            timestamp: new Date(),
                        };
                        xhr_1.send(JSON.stringify(obj));
                        return returnAction;
                    }
                    case TeamSharingRedux.TEAMSHARING_GET: {
                        var returnAction = next(action);
                        var xhr_2 = new XMLHttpRequest();
                        xhr_2.onerror = function (ev) {
                            return LoggingHelper_1.LoggingHelper.LogAdaptableError('TeamSharing get error :' + ev.message);
                        };
                        xhr_2.ontimeout = function () { return LoggingHelper_1.LoggingHelper.LogAdaptableWarning('TeamSharing get timeout'); };
                        xhr_2.onload = function () {
                            if (xhr_2.readyState == 4) {
                                if (xhr_2.status != 200) {
                                    LoggingHelper_1.LoggingHelper.LogAdaptableError('TeamSharing get error : ' + xhr_2.statusText);
                                }
                                else {
                                    middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(JSON.parse(xhr_2.responseText, function (key, value) {
                                        if (key == 'timestamp') {
                                            return new Date(value);
                                        }
                                        return value;
                                    })));
                                }
                            }
                        };
                        //we make the request async
                        xhr_2.open('GET', configServerTeamSharingUrl, true);
                        xhr_2.setRequestHeader('Content-type', 'application/json');
                        xhr_2.send();
                        return returnAction;
                    }
                    case TeamSharingRedux.TEAMSHARING_IMPORT_ITEM: {
                        var returnAction = next(action);
                        var actionTyped_36 = action;
                        var importAction = void 0;
                        var overwriteConfirmation = false;
                        switch (actionTyped_36.FunctionName) {
                            case StrategyConstants.CellValidationStrategyId:
                                importAction = CellValidationRedux.CellValidationAdd(actionTyped_36.Entity);
                                break;
                            case StrategyConstants.CalculatedColumnStrategyId: {
                                var calcCol_1 = actionTyped_36.Entity;
                                var idx = middlewareAPI
                                    .getState()
                                    .CalculatedColumn.CalculatedColumns.findIndex(function (x) { return x.ColumnId == calcCol_1.ColumnId; });
                                if (idx > -1) {
                                    overwriteConfirmation = true;
                                    importAction = CalculatedColumnRedux.CalculatedColumnEdit(calcCol_1);
                                }
                                else {
                                    importAction = CalculatedColumnRedux.CalculatedColumnAdd(calcCol_1);
                                }
                                break;
                            }
                            case StrategyConstants.ConditionalStyleStrategyId:
                                importAction = ConditionalStyleRedux.ConditionalStyleAdd(actionTyped_36.Entity);
                                break;
                            case StrategyConstants.CustomSortStrategyId: {
                                var customSort_1 = actionTyped_36.Entity;
                                if (middlewareAPI
                                    .getState()
                                    .CustomSort.CustomSorts.find(function (x) { return x.ColumnId == customSort_1.ColumnId; })) {
                                    overwriteConfirmation = true;
                                    importAction = CustomSortRedux.CustomSortEdit(customSort_1);
                                }
                                else {
                                    importAction = CustomSortRedux.CustomSortAdd(customSort_1);
                                }
                                break;
                            }
                            case StrategyConstants.FormatColumnStrategyId: {
                                var formatColumn_1 = actionTyped_36.Entity;
                                if (middlewareAPI
                                    .getState()
                                    .FormatColumn.FormatColumns.find(function (x) { return x.ColumnId == formatColumn_1.ColumnId; })) {
                                    overwriteConfirmation = true;
                                    importAction = FormatColumnRedux.FormatColumnEdit(formatColumn_1);
                                }
                                else {
                                    importAction = FormatColumnRedux.FormatColumnAdd(formatColumn_1);
                                }
                                break;
                            }
                            case StrategyConstants.PlusMinusStrategyId: {
                                var plusMinus = actionTyped_36.Entity;
                                importAction = PlusMinusRedux.PlusMinusRuleAdd(plusMinus);
                                break;
                            }
                            case StrategyConstants.ShortcutStrategyId: {
                                var shortcut_1 = actionTyped_36.Entity;
                                var shortcuts = void 0;
                                shortcuts = middlewareAPI.getState().Shortcut.Shortcuts;
                                if (shortcuts) {
                                    if (shortcuts.find(function (x) { return x.ShortcutKey == shortcut_1.ShortcutKey; })) {
                                        middlewareAPI.dispatch(ShortcutRedux.ShortcutDelete(shortcut_1));
                                    }
                                    importAction = ShortcutRedux.ShortcutAdd(shortcut_1);
                                }
                                break;
                            }
                            case StrategyConstants.UserFilterStrategyId: {
                                var filter_1 = actionTyped_36.Entity;
                                //For now not too worry about that but I think we'll need to check ofr filter that have same name
                                //currently the reducer checks for UID
                                if (middlewareAPI.getState().UserFilter.UserFilters.find(function (x) { return x.Name == filter_1.Name; })) {
                                    overwriteConfirmation = true;
                                }
                                importAction = UserFilterRedux.UserFilterAdd(filter_1);
                                // }
                                break;
                            }
                            case StrategyConstants.AdvancedSearchStrategyId: {
                                var search_1 = actionTyped_36.Entity;
                                if (middlewareAPI
                                    .getState()
                                    .AdvancedSearch.AdvancedSearches.find(function (x) { return x.Name == search_1.Name; })) {
                                    overwriteConfirmation = true;
                                }
                                importAction = AdvancedSearchRedux.AdvancedSearchAdd(search_1);
                                break;
                            }
                            case StrategyConstants.LayoutStrategyId: {
                                var layout_2 = actionTyped_36.Entity;
                                var layoutIndex = middlewareAPI
                                    .getState()
                                    .Layout.Layouts.findIndex(function (x) { return x.Name == layout_2.Name; });
                                if (layoutIndex != -1) {
                                    overwriteConfirmation = true;
                                }
                                importAction = LayoutRedux.LayoutSave(layout_2);
                                break;
                            }
                            case StrategyConstants.ExportStrategyId: {
                                var report_1 = actionTyped_36.Entity;
                                var idx = middlewareAPI
                                    .getState()
                                    .Export.Reports.findIndex(function (x) { return x.Name == report_1.Name; });
                                if (idx > -1) {
                                    overwriteConfirmation = true;
                                }
                                importAction = ExportRedux.ReportAdd(report_1);
                                break;
                            }
                        }
                        if (overwriteConfirmation) {
                            var confirmation = {
                                CancelButtonText: 'Cancel Import',
                                Header: 'Overwrite Config',
                                Msg: 'This item will overwrite one of your config. Do you want to continue?',
                                ConfirmButtonText: 'Import',
                                CancelAction: null,
                                ConfirmAction: importAction,
                                ShowInputBox: false,
                                MessageType: Enums_1.MessageType.Warning,
                            };
                            middlewareAPI.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
                        }
                        else if (importAction) {
                            middlewareAPI.dispatch(importAction);
                            middlewareAPI.dispatch(PopupRedux.PopupShowAlert({
                                Header: 'Team Sharing',
                                Msg: 'Item Successfully Imported',
                                AlertDefinition: ObjectFactory_1.ObjectFactory.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Info),
                            }));
                        }
                        else {
                            LoggingHelper_1.LoggingHelper.LogAdaptableError('Unknown item type', actionTyped_36.Entity);
                            middlewareAPI.dispatch(PopupRedux.PopupShowAlert({
                                Header: 'Team Sharing Error:',
                                Msg: 'Item not recognized. Cannot import',
                                AlertDefinition: ObjectFactory_1.ObjectFactory.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                            }));
                        }
                        return returnAction;
                    }
                    case SystemRedux.SET_NEW_COLUMN_LIST_ORDER:
                        var actionTyped = action;
                        adaptable.setNewColumnListOrder(actionTyped.VisibleColumnList);
                        return next(action);
                    /*******************
                     * GRID (INTERNAL) ACTIONS
                     *******************/
                    case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
                        var actionTyped_37 = action;
                        adaptable.setValue(actionTyped_37.DataChangedInfo, true);
                        return next(action);
                    }
                    case GridRedux.GRID_SET_VALUE_LIKE_EDIT_BATCH: {
                        var actionTyped_38 = action;
                        actionTyped_38.DataChangedInfoBatch.forEach(function (dc) {
                            adaptable.setValue(dc, true);
                        });
                        return next(action);
                    }
                    case GridRedux.GRID_HIDE_COLUMN: {
                        var actionTyped_39 = action;
                        var columnList = [].concat(middlewareAPI.getState().Grid.Columns.filter(function (c) { return c.Visible; }));
                        var columnIndex = columnList.findIndex(function (x) { return x.ColumnId == actionTyped_39.ColumnId; });
                        columnList.splice(columnIndex, 1);
                        adaptable.setNewColumnListOrder(columnList);
                        return next(action);
                    }
                    case GridRedux.GRID_SELECT_COLUMN: {
                        var actionTyped_40 = action;
                        adaptable.selectColumn(actionTyped_40.ColumnId);
                        return next(action);
                    }
                    case GridRedux.GRID_CREATE_CELLS_SUMMARY: {
                        var SelectedCellsStrategy = (adaptable.strategies.get(StrategyConstants.CellSummaryStrategyId));
                        var returnAction = next(action);
                        var selectedCellInfo = middlewareAPI.getState().Grid.SelectedCellInfo;
                        var apiSummaryReturn = SelectedCellsStrategy.CreateCellSummary(selectedCellInfo);
                        middlewareAPI.dispatch(GridRedux.GridSetCellSummary(apiSummaryReturn));
                        return returnAction;
                    }
                    case GridRedux.GRID_REFRESH_CELLS: {
                        var actionTyped_41 = action;
                        var ret = next(action);
                        adaptable.refreshCells(actionTyped_41.rows, actionTyped_41.columnIds);
                        return ret;
                    }
                    /*******************
                     * POPUP (INTERNAL) ACTIONS
                     *******************/
                    case PopupRedux.POPUP_CONFIRM_PROMPT: {
                        var promptConfirmationAction = middlewareAPI.getState().Popup.PromptPopup.ConfirmAction;
                        if (promptConfirmationAction) {
                            var inputText = action.InputText;
                            promptConfirmationAction.InputText = inputText;
                            middlewareAPI.dispatch(promptConfirmationAction);
                        }
                        return next(action);
                    }
                    case PopupRedux.POPUP_CONFIRM_CONFIRMATION: {
                        var confirmationAction = middlewareAPI.getState().Popup.ConfirmationPopup.ConfirmAction;
                        if (confirmationAction) {
                            middlewareAPI.dispatch(confirmationAction);
                        }
                        return next(action);
                    }
                    case PopupRedux.POPUP_CANCEL_CONFIRMATION: {
                        var cancelAction = middlewareAPI.getState().Popup.ConfirmationPopup.CancelAction;
                        if (cancelAction) {
                            middlewareAPI.dispatch(cancelAction);
                        }
                        return next(action);
                    }
                    /*******************
                     * HOME (INTERNAL) ACTIONS (Filter Bar)
                     *******************/
                    case GridRedux.GRID_QUICK_FILTER_BAR_SHOW: {
                        adaptable.showQuickFilter();
                        return next(action);
                    }
                    case GridRedux.GRID_QUICK_FILTER_BAR_HIDE: {
                        adaptable.hideQuickFilter();
                        return next(action);
                    }
                    case GridRedux.FILTER_FORM_HIDE: {
                        adaptable.hideFilterForm();
                        return next(action);
                    }
                    /*******************
                     * MANAGING STATE ACTIONS
                     *******************/
                    //We rebuild the menu from scratch
                    //the difference between the two is that RESET_STATE is handled before and set the state to undefined
                    case exports.INIT_STATE:
                    case exports.RESET_STATE: {
                        var returnAction = next(action);
                        //we set the column list from the datasource
                        adaptable.setColumnIntoStore();
                        var gridState = middlewareAPI.getState().Grid;
                        var layoutState = middlewareAPI.getState().Layout;
                        //create the default layout (if not there) so we can revert to it if needed
                        var currentLayout = GeneralConstants_1.DEFAULT_LAYOUT;
                        var defaultLayout = ObjectFactory_1.ObjectFactory.CreateLayout(gridState.Columns, [], adaptable.getVendorGridDefaultLayoutInfo(), GeneralConstants_1.DEFAULT_LAYOUT);
                        middlewareAPI.dispatch(LayoutRedux.LayoutSave(defaultLayout));
                        if (layoutState.Layouts.length > 0) {
                            currentLayout = layoutState.CurrentLayout;
                        }
                        //Create all calculated columns before we load the layout
                        middlewareAPI
                            .getState()
                            .CalculatedColumn.CalculatedColumns.forEach(function (cc) {
                            adaptable.addCalculatedColumnToGrid(cc);
                        });
                        //Create all free text columns before we load the layout
                        middlewareAPI
                            .getState()
                            .FreeTextColumn.FreeTextColumns.forEach(function (ftc) {
                            adaptable.addFreeTextColumnToGrid(ftc);
                        });
                        //Create all action columns before we load the layout
                        middlewareAPI.getState().ActionColumn.ActionColumns.forEach(function (ac) {
                            adaptable.addActionColumnToGrid(ac);
                        });
                        //load the default layout if its current
                        if (currentLayout == GeneralConstants_1.DEFAULT_LAYOUT) {
                            middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));
                        }
                        // create the functions menu (for use in the home toolbar and the toolpanel)
                        adaptable.createFunctionMenu();
                        return returnAction;
                    }
                    default:
                        return next(action);
                }
            };
        };
    };
};
function getNonPersistedReduxActions() {
    return [
        exports.RESET_STATE,
        exports.INIT_STATE,
        exports.LOAD_STATE,
        SystemRedux.SYSTEM_ALERT_ADD,
        SystemRedux.SYSTEM_ALERT_DELETE,
        SystemRedux.SYSTEM_ALERT_DELETE_ALL,
        SystemRedux.SYSTEM_UPDATED_ROW_ADD,
        SystemRedux.SYSTEM_UPDATED_ROW_DELETE,
        SystemRedux.SYSTEM_UPDATED_ROW_DELETE_ALL,
        SystemRedux.REPORT_START_LIVE,
        SystemRedux.REPORT_STOP_LIVE,
        SystemRedux.REPORT_SET_ERROR_MESSAGE,
        IPushPullRedux.IPUSHPULL_LOGIN,
        IPushPullRedux.IPUSHPULL_SET_LOGIN_ERROR_MESSAGE,
        IPushPullRedux.SET_IPUSHPULL_AVAILABLE_ON,
        IPushPullRedux.SET_IPUSHPULL_AVAILABLE_OFF,
        IPushPullRedux.IPUSHPULL_DOMAIN_PAGES_SET,
        IPushPullRedux.IPUSHPULL_DOMAIN_PAGES_CLEAR,
        IPushPullRedux.IPUSHPULL_LIVE_REPORT_SET,
        IPushPullRedux.IPUSHPULL_LIVE_REPORT_CLEAR,
        SystemRedux.SMARTEDIT_CHECK_CELL_SELECTION,
        SystemRedux.SMARTEDIT_FETCH_PREVIEW,
        SystemRedux.SMARTEDIT_SET_VALID_SELECTION,
        SystemRedux.SMARTEDIT_SET_PREVIEW,
        SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION,
        SystemRedux.BULK_UPDATE_SET_VALID_SELECTION,
        SystemRedux.BULK_UPDATE_SET_PREVIEW,
        SystemRedux.CHART_SET_CHART_DATA,
        SystemRedux.CHART_SET_CHART_VISIBILITY,
        SystemRedux.CALCULATEDCOLUMN_SET_ERROR_MESSAGE,
        SystemRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID,
        SystemRedux.QUICK_SEARCH_SET_RANGE,
        SystemRedux.QUICK_SEARCH_CLEAR_RANGE,
        SystemRedux.QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS,
        SystemRedux.QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS,
        SystemRedux.SET_NEW_COLUMN_LIST_ORDER,
        GridRedux.GRID_SELECT_COLUMN,
        GridRedux.GRID_SET_COLUMNS,
        GridRedux.GRID_ADD_COLUMN,
        GridRedux.GRID_EDIT_COLUMN,
        GridRedux.GRID_HIDE_COLUMN,
        GridRedux.GRID_SET_VALUE_LIKE_EDIT,
        GridRedux.GRID_SET_SORT,
        GridRedux.GRID_SET_SELECTED_CELLS,
        GridRedux.GRID_SET_SELECTED_ROWS,
        GridRedux.GRID_CREATE_CELLS_SUMMARY,
        GridRedux.GRID_SET_CELLS_SUMMARY,
        GridRedux.GRID_REFRESH_CELLS,
        GridRedux.FILTER_FORM_HIDE,
        GridRedux.GRID_QUICK_FILTER_BAR_SHOW,
        GridRedux.GRID_QUICK_FILTER_BAR_HIDE,
        GridRedux.SET_MAIN_MENUITEMS,
        GridRedux.SET_LIVE_REPORT_RUNNING_ON,
        GridRedux.SET_LIVE_REPORT_RUNNING_OFF,
        GridRedux.SET_PIVOT_MODE_ON,
        GridRedux.SET_PIVOT_MODE_OFF,
        PopupRedux.POPUP_SHOW_SCREEN,
        PopupRedux.POPUP_HIDE_SCREEN,
        PopupRedux.POPUP_SHOW_LOADING,
        PopupRedux.POPUP_HIDE_LOADING,
        PopupRedux.POPUP_SHOW_GRID_INFO,
        PopupRedux.POPUP_HIDE_GRID_INFO,
        PopupRedux.POPUP_SHOW_ALERT,
        PopupRedux.POPUP_HIDE_ALERT,
        PopupRedux.POPUP_SHOW_PROMPT,
        PopupRedux.POPUP_HIDE_PROMPT,
        PopupRedux.POPUP_CONFIRM_PROMPT,
        PopupRedux.POPUP_SHOW_CONFIRMATION,
        PopupRedux.POPUP_CONFIRM_CONFIRMATION,
        PopupRedux.POPUP_CANCEL_CONFIRMATION,
        PopupRedux.POPUP_CLEAR_PARAM,
    ];
}
exports.getNonPersistedReduxActions = getNonPersistedReduxActions;
function getFunctionAppliedReduxActions() {
    // NOTE: We have an issue with how we have built Smart Edit and Bulk Update that we are not able to capture the Apply
    // Due to poor coding the Apply method only has warnings (though we mitigate by doing the same thing via the API)
    // As few users currently audit functions and few have editable grids its not an urgent problem but one that we should fix
    // We need to add:  Chart, Pie Chart, Custom Sort ???, Export, Layout
    return [
        AdvancedSearchRedux.ADVANCED_SEARCH_SELECT,
        CalendarRedux.CALENDAR_SELECT,
        ChartRedux.CHART_DEFINITION_SELECT,
        DataSourceRedux.DATA_SOURCE_SELECT,
        ExportRedux.EXPORT_APPLY,
        FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
        FlashingCellsRedux.FLASHING_CELL_SELECT,
        FlashingCellsRedux.FLASHING_CELL_SELECT_ALL,
        QuickSearchRedux.QUICK_SEARCH_APPLY,
        QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY,
        QuickSearchRedux.QUICK_SEARCH_SET_STYLE,
        PlusMinusRedux.PLUS_MINUS_APPLY,
        ThemeRedux.THEME_SELECT,
        ColumnFilterRedux.COLUMN_FILTER_ADD,
        ColumnFilterRedux.COLUMN_FILTER_EDIT,
        ColumnFilterRedux.COLUMN_FILTER_CLEAR,
    ];
}
exports.getFunctionAppliedReduxActions = getFunctionAppliedReduxActions;
function getPrimaryStateReduxActions() {
    return [exports.RESET_STATE, exports.INIT_STATE];
}
exports.getPrimaryStateReduxActions = getPrimaryStateReduxActions;
