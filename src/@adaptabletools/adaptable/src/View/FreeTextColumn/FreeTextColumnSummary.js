"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var FreeTextColumnWizard_1 = require("./Wizard/FreeTextColumnWizard");
var FreeTextColumnRedux = require("../../Redux/ActionsReducers/FreeTextColumnRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var FreeTextColumnSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnSummaryComponent, _super);
    function FreeTextColumnSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    FreeTextColumnSummaryComponent.prototype.render = function () {
        var _this = this;
        var freeTextColumn = this.props.FreeTextColumns.find(function (c) { return c.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var noFreeTextColumn = freeTextColumn == null;
        var FreeTextColumnRow;
        if (!noFreeTextColumn) {
            var description = ArrayExtensions_1.ArrayExtensions.IsNotEmpty(freeTextColumn.FreeTextStoredValues)
                ? ' Stored values: ' + freeTextColumn.FreeTextStoredValues.length
                : 'No stored values';
            var index = this.props.FreeTextColumns.findIndex(function (ftc) { return ftc.ColumnId == _this.props.SummarisedColumn.ColumnId; });
            FreeTextColumnRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.FreeTextColumnStrategyFriendlyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: StrategyConstants.FreeTextColumnStrategyId }), Item2: description, ConfigEnity: freeTextColumn, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.FreeTextColumnStrategyFriendlyName, onEdit: function () { return _this.onEdit(freeTextColumn); }, onShare: function () { return _this.props.onShare(freeTextColumn); }, onDelete: FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn), showBold: true }));
        }
        return (React.createElement("div", null,
            FreeTextColumnRow,
            this.state.EditedAdaptableObject && (React.createElement(FreeTextColumnWizard_1.FreeTextColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.FreeTextColumns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); }, Adaptable: this.props.Adaptable }))));
    };
    FreeTextColumnSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    FreeTextColumnSummaryComponent.prototype.onEdit = function (FreeTextColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(FreeTextColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    FreeTextColumnSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    FreeTextColumnSummaryComponent.prototype.onFinishWizard = function () {
        var FreeTextColumn = this.state.EditedAdaptableObject;
        if (this.props.FreeTextColumns.find(function (x) { return x.ColumnId == FreeTextColumn.ColumnId; })) {
            this.props.onEditFreeTextColumn(FreeTextColumn);
        }
        else {
            this.props.onAddFreeTextColumn(FreeTextColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    FreeTextColumnSummaryComponent.prototype.canFinishWizard = function () {
        var FreeTextColumn = this.state.EditedAdaptableObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(FreeTextColumn.ColumnId);
    };
    return FreeTextColumnSummaryComponent;
}(React.Component));
exports.FreeTextColumnSummaryComponent = FreeTextColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFreeTextColumn: function (FreeTextColumn) {
            return dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn));
        },
        onEditFreeTextColumn: function (FreeTextColumn) {
            return dispatch(FreeTextColumnRedux.FreeTextColumnEdit(FreeTextColumn));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FreeTextColumnStrategyId));
        },
    };
}
exports.FreeTextColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FreeTextColumnSummaryComponent);
