"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PercentBarWizard_1 = require("./Wizard/PercentBarWizard");
var PercentBarRedux = require("../../Redux/ActionsReducers/PercentBarRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var PercentBarSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarSummaryComponent, _super);
    function PercentBarSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    PercentBarSummaryComponent.prototype.render = function () {
        var _this = this;
        var percentBar = this.props.PercentBars.find(function (c) { return c.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var noPercentBar = percentBar == null;
        var percentBarRow;
        if (noPercentBar) {
            percentBarRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.PercentBarStrategyFriendlyName, FunctionName: StrategyConstants.PercentBarStrategyId, StrategySummary: 'No Percent Bar', onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.PercentBarStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        }
        else {
            percentBarRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.PercentBarStrategyFriendlyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.PercentBarStrategyId }), Item2: 'Percent Bar set', ConfigEnity: percentBar, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.PercentBarStrategyFriendlyName, onEdit: function () { return _this.onEdit(percentBar); }, onShare: function () { return _this.props.onShare(percentBar); }, onDelete: PercentBarRedux.PercentBarDelete(percentBar), showBold: true }));
        }
        return (React.createElement("div", null,
            percentBarRow,
            this.state.EditedAdaptableObject && (React.createElement(PercentBarWizard_1.PercentBarWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.PercentBars, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ColorPalette: this.props.ColorPalette, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); }, Adaptable: this.props.Adaptable }))));
    };
    PercentBarSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        var distinctColumnsValues = this.props.Adaptable.StrategyService.getDistinctColumnValues(this.props.SummarisedColumn.ColumnId);
        configEntity.NegativeValue = Math.min.apply(Math, tslib_1.__spread(distinctColumnsValues));
        configEntity.PositiveValue = Math.max.apply(Math, tslib_1.__spread(distinctColumnsValues));
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    PercentBarSummaryComponent.prototype.onEdit = function (renderedColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(renderedColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    PercentBarSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    PercentBarSummaryComponent.prototype.onFinishWizard = function () {
        var percentBar = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditPercentBar(percentBar);
        }
        else {
            this.props.onAddPercentBar(percentBar);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    PercentBarSummaryComponent.prototype.canFinishWizard = function () {
        var percentBar = this.state.EditedAdaptableObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId);
    };
    return PercentBarSummaryComponent;
}(React.Component));
exports.PercentBarSummaryComponent = PercentBarSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        PercentBars: state.PercentBar.PercentBars,
        ColorPalette: state.UserInterface.ColorPalette,
        Entitlements: state.Entitlements.FunctionEntitlements,
        StyleClassNames: state.UserInterface.StyleClassNames,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPercentBar: function (percentBar) {
            return dispatch(PercentBarRedux.PercentBarAdd(percentBar));
        },
        onEditPercentBar: function (percentBar) {
            return dispatch(PercentBarRedux.PercentBarEdit(percentBar));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId));
        },
    };
}
exports.PercentBarSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PercentBarSummaryComponent);
