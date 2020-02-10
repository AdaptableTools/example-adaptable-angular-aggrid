"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var DataSourceSettingsWizard_1 = require("./DataSourceSettingsWizard");
var DataSourceSummaryWizard_1 = require("./DataSourceSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var DataSourceWizard = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceWizard, _super);
    function DataSourceWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourceWizard.prototype.render = function () {
        var _this = this;
        var dataSources = this.props.ConfigEntities;
        var dataSourceNames = dataSources.map(function (s) { return s.Name; });
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.DataSourceStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Settings',
                        Index: 0,
                        Element: React.createElement(DataSourceSettingsWizard_1.DataSourceSettingsWizard, { DataSourceNames: dataSourceNames }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 1,
                        Element: React.createElement(DataSourceSummaryWizard_1.DataSourceSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return DataSourceWizard;
}(React.Component));
exports.DataSourceWizard = DataSourceWizard;
