"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ChartRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux");
var PopupRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux");
var SystemRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux");
var TeamSharingRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var ObjectFactory_1 = require("@adaptabletools/adaptable/src/Utilities/ObjectFactory");
var ChartEntityRow_1 = require("./ChartEntityRow");
var PanelWithButton_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var AdaptableObjectCollection_1 = require("@adaptabletools/adaptable/src/View/Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("@adaptabletools/adaptable/src/View/UIHelper");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var CategoryChartWizard_1 = require("./CategoryChart/Wizard/CategoryChartWizard");
var PieChartWizard_1 = require("./PieChart/Wizard/PieChartWizard");
var SparklinesChartWizard_1 = require("./SparklinesChart/Wizard/SparklinesChartWizard");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var EmptyContent_1 = require("@adaptabletools/adaptable/src/components/EmptyContent");
var DropdownButton_1 = require("@adaptabletools/adaptable/src/components/DropdownButton");
var plus_1 = require("@adaptabletools/adaptable/src/components/icons/plus");
var ChartPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChartPopupComponent, _super);
    function ChartPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ChartPopupComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.value) {
                var chartType = this.props.PopupParams.value.trim(); // todo: use the enum...
                if (this.props.PopupParams.action == 'New') {
                    this.onNew(chartType);
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var index = this.props.ChartDefinitions.findIndex(function (cd) { return cd.Name == _this.props.CurrentChartDefinition.Name; });
                    this.onEdit(this.props.CurrentChartDefinition);
                }
            }
        }
    };
    ChartPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = ['Create Charts to view your grid data visually.'];
        var colItems = [
            { Content: 'Name', Size: 3 },
            { Content: 'Description', Size: 3 },
            { Content: 'Type', Size: 3 },
            { Content: 'Show', Size: 1 },
            { Content: '', Size: 2 },
        ];
        var Charts = this.props.ChartDefinitions.map(function (Chart, index) {
            return (React.createElement(ChartEntityRow_1.ChartEntityRow, { colItems: colItems, AdaptableObject: Chart, key: Chart.Name, onEdit: function () { return _this.onEdit(Chart); }, TeamSharingActivated: _this.props.TeamSharingActivated, onShare: function () { return _this.props.onShare(Chart); }, onDeleteConfirm: ChartRedux.ChartDefinitionDelete(Chart), onShowChart: function (chartName) { return _this.onShowChart(chartName); }, AccessLevel: _this.props.AccessLevel }));
        });
        var categoryChartMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onNew(ChartEnums_1.ChartType.CategoryChart); },
            label: 'Category Chart',
        };
        var pieChartMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onNew(ChartEnums_1.ChartType.PieChart); },
            label: 'Pie Chart',
        };
        var sparklinesChartMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () { return _this.onNew(ChartEnums_1.ChartType.SparklinesChart); },
            label: 'Sparklines Chart',
        };
        // we need to make this a button type...
        var dropdownButton = (React.createElement(DropdownButton_1.default, { tooltip: "Create New Chart Definition", variant: "raised", tone: "accent", columns: ['label'], items: [categoryChartMenuItem, pieChartMenuItem, sparklinesChartMenuItem], style: { zIndex: 100 } },
            React.createElement(plus_1.default, null),
            " New"));
        var editedChartDefinition = this.state.EditedAdaptableObject;
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ChartStrategyFriendlyName, infoBody: infoBody, button: dropdownButton, bodyProps: { padding: 0 }, bodyScroll: true, glyphicon: StrategyConstants.ChartGlyph },
            Charts.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: Charts })) : (React.createElement(EmptyContent_1.default, null,
                React.createElement("p", null, "Click 'New' to create a new Chart."),
                React.createElement("p", null, "Choose between Category, Pie or Sparklines Chart."))),
            this.state.EditedAdaptableObject && (React.createElement("div", null,
                editedChartDefinition.ChartType == ChartEnums_1.ChartType.CategoryChart ? (React.createElement(CategoryChartWizard_1.CategoryChartWizard, { EditedAdaptableObject: editedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })) : null,
                editedChartDefinition.ChartType === ChartEnums_1.ChartType.PieChart ? (React.createElement(PieChartWizard_1.PieChartWizard, { EditedAdaptableObject: editedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: 0, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })) : null,
                editedChartDefinition.ChartType === ChartEnums_1.ChartType.SparklinesChart ? (React.createElement(SparklinesChartWizard_1.SparklinesChartWizard, { EditedAdaptableObject: editedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: 0, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })) : null))));
    };
    ChartPopupComponent.prototype.onShowChart = function (chartName) {
        this.props.onSelectChartDefinition(chartName);
        this.props.onShowChart();
    };
    ChartPopupComponent.prototype.onEdit = function (Chart) {
        //so we dont mutate original object
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(Chart),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ChartPopupComponent.prototype.onNew = function (chartType) {
        var emptyChartDefinition;
        switch (chartType) {
            case ChartEnums_1.ChartType.CategoryChart: {
                emptyChartDefinition = ObjectFactory_1.ObjectFactory.CreateEmptyCategoryChartDefinition();
                break;
            }
            case ChartEnums_1.ChartType.PieChart: {
                emptyChartDefinition = ObjectFactory_1.ObjectFactory.CreateEmptyPieChartDefinition();
                break;
            }
            case ChartEnums_1.ChartType.SparklinesChart: {
                emptyChartDefinition = ObjectFactory_1.ObjectFactory.CreateEmptySparklinesChartDefinition();
                break;
            }
        }
        this.setState({
            EditedAdaptableObject: emptyChartDefinition,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ChartPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        // if we've come from the Toolbar and the Searches are identical then close the main popup
        if (this.props.PopupParams &&
            this.props.PopupParams.source &&
            this.props.PopupParams.source == 'Toolbar') {
            if (this.props.ChartDefinitions === this.props.Adaptable.api.chartApi.getAllChartDefinitions()) {
                this.props.onClosePopup();
            }
        }
    };
    ChartPopupComponent.prototype.onFinishWizard = function () {
        var clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditChartDefinition(clonedObject);
        }
        else {
            this.props.onAddChartDefinition(clonedObject);
        }
        var shouldSelectChart = this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New ||
            this.props.CurrentChartDefinition.Uuid == clonedObject.Uuid;
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (shouldSelectChart) {
            // its new so make it the new chart or we are editing the current chart
            this.props.onSelectChartDefinition(clonedObject.Name);
        }
    };
    ChartPopupComponent.prototype.canFinishWizard = function () {
        var Chart = this.state.EditedAdaptableObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(Chart.Name);
    };
    return ChartPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(function (c) { return c.Name == state.Chart.CurrentChartName; }),
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
        onShowChart: function () { return dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised)); },
        onClearPopupParams: function () { return dispatch(PopupRedux.PopupClearParam()); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId));
        },
    };
}
exports.ChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
