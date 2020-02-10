"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var FormatColumnWizard_1 = require("./Wizard/FormatColumnWizard");
var FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var StyleVisualItem_1 = require("../Components/StyleVisualItem");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var FormatColumnSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnSummaryComponent, _super);
    function FormatColumnSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    FormatColumnSummaryComponent.prototype.render = function () {
        var _this = this;
        var formatColumn = this.props.FormatColumns.find(function (c) { return c.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var noFormatColumn = formatColumn == null;
        var formatColumnRow;
        if (noFormatColumn) {
            formatColumnRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.FormatColumnStrategyFriendlyName, FunctionName: StrategyConstants.FormatColumnStrategyId, StrategySummary: 'No Format Column Set', onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.FormatColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        }
        else {
            formatColumnRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.FormatColumnStrategyFriendlyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.FormatColumnStrategyId }), Item2: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: formatColumn.Style }), ConfigEnity: formatColumn, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.FormatColumnStrategyFriendlyName, onEdit: function () { return _this.onEdit(formatColumn); }, onShare: function () { return _this.props.onShare(formatColumn); }, onDelete: FormatColumnRedux.FormatColumnDelete(formatColumn), showBold: true }));
        }
        return (React.createElement("div", null,
            formatColumnRow,
            this.state.EditedAdaptableObject && (React.createElement(FormatColumnWizard_1.FormatColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.FormatColumns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); }, Adaptable: this.props.Adaptable }))));
    };
    FormatColumnSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyFormatColumn();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    FormatColumnSummaryComponent.prototype.onEdit = function (formatColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(formatColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    FormatColumnSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    FormatColumnSummaryComponent.prototype.onFinishWizard = function () {
        var formatColumn = this.state.EditedAdaptableObject;
        if (this.props.FormatColumns.find(function (x) { return x.ColumnId == formatColumn.ColumnId; })) {
            this.props.onEditFormatColumn(formatColumn);
        }
        else {
            this.props.onAddFormatColumn(formatColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    FormatColumnSummaryComponent.prototype.canFinishWizard = function () {
        var formatColumn = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(formatColumn.Style));
    };
    return FormatColumnSummaryComponent;
}(React.Component));
exports.FormatColumnSummaryComponent = FormatColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        FormatColumns: state.FormatColumn.FormatColumns,
        ColorPalette: state.UserInterface.ColorPalette,
        Entitlements: state.Entitlements.FunctionEntitlements,
        StyleClassNames: state.UserInterface.StyleClassNames,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFormatColumn: function (FormatColumn) {
            return dispatch(FormatColumnRedux.FormatColumnAdd(FormatColumn));
        },
        onEditFormatColumn: function (FormatColumn) {
            return dispatch(FormatColumnRedux.FormatColumnEdit(FormatColumn));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FormatColumnStrategyId));
        },
    };
}
exports.FormatColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormatColumnSummaryComponent);
