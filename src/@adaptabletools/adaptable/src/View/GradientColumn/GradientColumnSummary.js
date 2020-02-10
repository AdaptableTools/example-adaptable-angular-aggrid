"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var GradientColumnWizard_1 = require("./Wizard/GradientColumnWizard");
var GradientColumnRedux = require("../../Redux/ActionsReducers/GradientColumnRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var GradientColumnSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnSummaryComponent, _super);
    function GradientColumnSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    GradientColumnSummaryComponent.prototype.render = function () {
        var _this = this;
        var GradientColumn = this.props.GradientColumns.find(function (c) { return c.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var noGradientColumn = GradientColumn == null;
        var GradientColumnRow;
        if (noGradientColumn) {
            GradientColumnRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.GradientColumnStrategyFriendlyName, FunctionName: StrategyConstants.GradientColumnStrategyId, StrategySummary: 'No Percent Bar', onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.GradientColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        }
        else {
            GradientColumnRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.GradientColumnStrategyFriendlyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.GradientColumnStrategyId }), Item2: 'Percent Bar set', ConfigEnity: GradientColumn, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.GradientColumnStrategyFriendlyName, onEdit: function () { return _this.onEdit(GradientColumn); }, onShare: function () { return _this.props.onShare(GradientColumn); }, onDelete: GradientColumnRedux.GradientColumnDelete(GradientColumn), showBold: true }));
        }
        return (React.createElement("div", null,
            GradientColumnRow,
            this.state.EditedAdaptableObject && (React.createElement(GradientColumnWizard_1.GradientColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.GradientColumns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ColorPalette: this.props.ColorPalette, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); }, Adaptable: this.props.Adaptable }))));
    };
    GradientColumnSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyGradientColumn();
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
    GradientColumnSummaryComponent.prototype.onEdit = function (renderedColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(renderedColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    GradientColumnSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    GradientColumnSummaryComponent.prototype.onFinishWizard = function () {
        var GradientColumn = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditGradientColumn(GradientColumn);
        }
        else {
            this.props.onAddGradientColumn(GradientColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    GradientColumnSummaryComponent.prototype.canFinishWizard = function () {
        var GradientColumn = this.state.EditedAdaptableObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(GradientColumn.ColumnId);
    };
    return GradientColumnSummaryComponent;
}(React.Component));
exports.GradientColumnSummaryComponent = GradientColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        GradientColumns: state.GradientColumn.GradientColumns,
        ColorPalette: state.UserInterface.ColorPalette,
        Entitlements: state.Entitlements.FunctionEntitlements,
        StyleClassNames: state.UserInterface.StyleClassNames,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddGradientColumn: function (GradientColumn) {
            return dispatch(GradientColumnRedux.GradientColumnAdd(GradientColumn));
        },
        onEditGradientColumn: function (GradientColumn) {
            return dispatch(GradientColumnRedux.GradientColumnEdit(GradientColumn));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.GradientColumnStrategyId));
        },
    };
}
exports.GradientColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GradientColumnSummaryComponent);
