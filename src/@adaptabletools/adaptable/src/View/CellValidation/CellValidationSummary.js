"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var CellValidationWizard_1 = require("./Wizard/CellValidationWizard");
var CellValidationRedux = require("../../Redux/ActionsReducers/CellValidationRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var CellValidationSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationSummaryComponent, _super);
    function CellValidationSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    CellValidationSummaryComponent.prototype.render = function () {
        var _this = this;
        var strategySummaries = [];
        // title row
        var titleRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.CellValidationStrategyFriendlyName, FunctionName: StrategyConstants.CellValidationStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.CellValidations.filter(function (item) { return item.ColumnId == _this.props.SummarisedColumn.ColumnId; }), StrategyConstants.CellValidationStrategyFriendlyName), onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.CellValidationStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        strategySummaries.push(titleRow);
        // existing items
        this.props.CellValidations.map(function (item, index) {
            if (item.ColumnId == _this.props.SummarisedColumn.ColumnId) {
                var detailRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: 'CV' + index, Item1: StringExtensions_1.StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.ActionMode), Item2: _this.props.Adaptable.ValidationService.createCellValidationDescription(item, _this.props.Columns), ConfigEnity: item, EntityType: StrategyConstants.CellValidationStrategyFriendlyName, showShare: _this.props.TeamSharingActivated, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, onDelete: CellValidationRedux.CellValidationDelete(item) }));
                strategySummaries.push(detailRow);
            }
        });
        return (React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableObject && (React.createElement(CellValidationWizard_1.CellValidationWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    CellValidationSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyCellValidation();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    CellValidationSummaryComponent.prototype.onEdit = function (CellValidation) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(CellValidation),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    CellValidationSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CellValidationSummaryComponent.prototype.onFinishWizard = function () {
        var cellValidationRule = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New) {
            this.props.onAddCellValidation(cellValidationRule);
        }
        else {
            this.props.onEditCellValidation(cellValidationRule);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CellValidationSummaryComponent.prototype.canFinishWizard = function () {
        var cellValidatinRule = this.state.EditedAdaptableObject;
        return true;
    };
    return CellValidationSummaryComponent;
}(React.Component));
exports.CellValidationSummaryComponent = CellValidationSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        CellValidations: state.CellValidation.CellValidations,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddCellValidation: function (cellValidationRule) {
            return dispatch(CellValidationRedux.CellValidationAdd(cellValidationRule));
        },
        onEditCellValidation: function (cellValidationRule) {
            return dispatch(CellValidationRedux.CellValidationEdit(cellValidationRule));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellValidationStrategyId));
        },
    };
}
exports.CellValidationSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellValidationSummaryComponent);
