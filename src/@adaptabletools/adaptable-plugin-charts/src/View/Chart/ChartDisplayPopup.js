"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var ButtonClose_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonClose");
var ButtonEdit_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonEdit");
var ButtonMaximise_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMaximise");
var ButtonMinimise_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMinimise");
var PanelWithIImageThreeButtons_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithIImageThreeButtons");
var CategoryChartWizard_1 = require("./CategoryChart/Wizard/CategoryChartWizard");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ChartRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux");
var SystemRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var CategoryChartComponent_1 = require("./CategoryChart/CategoryChartComponent");
var PieChartComponent_1 = require("./PieChart/PieChartComponent");
var PieChartWizard_1 = require("./PieChart/Wizard/PieChartWizard");
var SparklinesChartComponent_1 = require("./SparklinesChart/SparklinesChartComponent");
var SparklinesChartWizard_1 = require("./SparklinesChart/Wizard/SparklinesChartWizard");
var ChartDisplayPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChartDisplayPopupComponent, _super);
    function ChartDisplayPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { EditedChartDefinition: null };
        return _this;
    }
    ChartDisplayPopupComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        if (this.props.CurrentChartDefinition == null ||
            nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
            this.setState({ EditedChartDefinition: null });
        }
    };
    ChartDisplayPopupComponent.prototype.render = function () {
        var _this = this;
        // temp till do properly
        var currentChartType = this.props.CurrentChartDefinition
            ? this.props.CurrentChartDefinition.ChartType
            : null;
        var closeButton = this.props.ShowModal ? null : (React.createElement(ButtonClose_1.ButtonClose, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.props.onClose(); }, tooltip: null, tone: "none" }));
        var editButton = this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Minimised ? null : (React.createElement(ButtonEdit_1.ButtonEdit, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onEditChart(); }, tooltip: null }));
        var minmaxButton = this.props.ShowModal ? null : this.props.ChartVisibility ==
            ChartEnums_1.ChartVisibility.Minimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onChartMaximised(); }, tooltip: null })) : (React.createElement(ButtonMinimise_1.ButtonMinimise, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onChartMinimised(); } }));
        return (React.createElement(PanelWithIImageThreeButtons_1.PanelWithImageThreeButtons, { header: StrategyConstants.ChartStrategyFriendlyName, firstButton: editButton, secondButton: minmaxButton, thirdButton: closeButton, bodyProps: {
                padding: this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Minimised ? 0 : 2,
            } },
            this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised &&
                this.props.ChartData != null &&
                this.props.CurrentChartDefinition != null && (React.createElement("div", null,
                currentChartType == ChartEnums_1.ChartType.CategoryChart ? (React.createElement(CategoryChartComponent_1.CategoryChartComponent, { CurrentChartDefinition: this.props.CurrentChartDefinition, ChartData: this.props.ChartData, ColorPalette: this.props.ColorPalette, Columns: this.props.Columns, onUpdateChartProperties: function (chartUuid, chartProperties) {
                        return _this.props.onUpdateChartProperties(chartUuid, chartProperties);
                    } })) : null,
                currentChartType == ChartEnums_1.ChartType.PieChart ? (React.createElement(PieChartComponent_1.PieChartComponent, { CurrentChartDefinition: this.props.CurrentChartDefinition, ChartData: this.props.ChartData, 
                    //   ColorPalette={this.props.ColorPalette}
                    //   Columns={this.props.Columns}
                    onUpdateChartProperties: function (chartUuid, chartProperties) {
                        return _this.props.onUpdateChartProperties(chartUuid, chartProperties);
                    } })) : null,
                currentChartType == ChartEnums_1.ChartType.SparklinesChart ? (React.createElement(SparklinesChartComponent_1.SparklinesChartComponent, { CurrentChartDefinition: this.props.CurrentChartDefinition, ChartData: this.props.ChartData, onUpdateChartProperties: function (chartUuid, chartProperties) {
                        return _this.props.onUpdateChartProperties(chartUuid, chartProperties);
                    } })) : null)),
            this.state.EditedChartDefinition && (React.createElement("div", null,
                this.state.EditedChartDefinition.ChartType == ChartEnums_1.ChartType.CategoryChart ? (React.createElement(CategoryChartWizard_1.CategoryChartWizard, { EditedAdaptableObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: 0, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })) : null,
                this.state.EditedChartDefinition.ChartType == ChartEnums_1.ChartType.PieChart ? (React.createElement(PieChartWizard_1.PieChartWizard, { EditedAdaptableObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: 0, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })) : null,
                this.state.EditedChartDefinition.ChartType == ChartEnums_1.ChartType.SparklinesChart ? (React.createElement(SparklinesChartWizard_1.SparklinesChartWizard, { EditedAdaptableObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: 0, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })) : null))));
    };
    ChartDisplayPopupComponent.prototype.onEditChart = function () {
        this.setState({ EditedChartDefinition: Helper_1.Helper.cloneObject(this.props.CurrentChartDefinition) });
    };
    ChartDisplayPopupComponent.prototype.onChartMinimised = function () {
        this.props.onSetChartVisibility(ChartEnums_1.ChartVisibility.Minimised);
    };
    ChartDisplayPopupComponent.prototype.onChartMaximised = function () {
        this.props.onSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised);
    };
    ChartDisplayPopupComponent.prototype.onCloseWizard = function () {
        this.setState({ EditedChartDefinition: null });
    };
    ChartDisplayPopupComponent.prototype.onFinishWizard = function () {
        var _this = this;
        var clonedObject = Helper_1.Helper.cloneObject(this.state.EditedChartDefinition);
        var isNew = this.props.ChartDefinitions.find(function (cd) { return cd.Uuid == _this.state.EditedChartDefinition.Uuid; }) ==
            null;
        if (isNew) {
            this.props.onAddChartDefinition(clonedObject);
        }
        else {
            this.props.onEditChartDefinition(clonedObject);
        }
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject.Name);
    };
    ChartDisplayPopupComponent.prototype.canFinishWizard = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Name);
    };
    return ChartDisplayPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(function (c) { return c.Name == state.Chart.CurrentChartName; }),
        ChartData: state.System.ChartData,
        ChartVisibility: state.System.ChartVisibility,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddChartDefinition: function (chartDefinition) {
            return dispatch(ChartRedux.ChartDefinitionAdd(chartDefinition));
        },
        onEditChartDefinition: function (chartDefinition) {
            return dispatch(ChartRedux.ChartDefinitionEdit(chartDefinition));
        },
        onSelectChartDefinition: function (chartDefinition) {
            return dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition));
        },
        onSetChartVisibility: function (chartVisibility) {
            return dispatch(SystemRedux.ChartSetChartVisibility(chartVisibility));
        },
        onUpdateChartProperties: function (chartUuid, chartProperties) {
            return dispatch(ChartRedux.ChartPropertiesUpdate(chartUuid, chartProperties));
        },
    };
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
