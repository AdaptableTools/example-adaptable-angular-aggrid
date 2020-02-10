"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
var ApiBase_1 = require("./ApiBase");
var DataSourceApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceApiImpl, _super);
    function DataSourceApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourceApiImpl.prototype.getDataSourceState = function () {
        return this.getAdaptableState().DataSource;
    };
    DataSourceApiImpl.prototype.getAllDataSource = function () {
        return this.getDataSourceState().DataSources;
    };
    DataSourceApiImpl.prototype.getCurrentDataSource = function () {
        var currentDataSourceName = this.getDataSourceState().CurrentDataSource;
        return this.getDataSourceByName(currentDataSourceName);
    };
    DataSourceApiImpl.prototype.getDataSourceByName = function (dataSourceName) {
        return this.getAllDataSource().find(function (a) { return a.Name == dataSourceName; });
    };
    DataSourceApiImpl.prototype.setDataSource = function (dataSourceName) {
        var dataSource = this.getAdaptableState().DataSource.DataSources.find(function (a) { return a.Name == dataSourceName; });
        if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyFriendlyName)) {
            this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name));
        }
    };
    DataSourceApiImpl.prototype.createDataSource = function (dataSourceName, dataSourceDescription) {
        var dataSource = {
            Name: dataSourceName,
            Description: dataSourceDescription,
        };
        this.addDataSource(dataSource);
    };
    DataSourceApiImpl.prototype.addDataSource = function (dataSource) {
        this.dispatchAction(DataSourceRedux.DataSourceAdd(dataSource));
    };
    DataSourceApiImpl.prototype.clearDataSource = function () {
        this.dispatchAction(DataSourceRedux.DataSourceSelect(''));
    };
    DataSourceApiImpl.prototype.showDataSourcePopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.DataSourceStrategyId, ScreenPopups.DataSourcePopup);
    };
    return DataSourceApiImpl;
}(ApiBase_1.ApiBase));
exports.DataSourceApiImpl = DataSourceApiImpl;
