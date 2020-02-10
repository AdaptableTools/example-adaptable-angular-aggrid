"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var CalculatedColumnRedux = require("../../Redux/ActionsReducers/CalculatedColumnRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var CalculatedColumnWizard_1 = require("./Wizard/CalculatedColumnWizard");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var CalculatedColumnSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnSummaryComponent, _super);
    function CalculatedColumnSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    CalculatedColumnSummaryComponent.prototype.render = function () {
        var _this = this;
        var detailRow;
        var sharing = this.props.TeamSharingActivated;
        this.props.CalculatedColumns.map(function (item, index) {
            if (item.ColumnId == _this.props.SummarisedColumn.ColumnId) {
                detailRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: 'UF' + index, Item1: StrategyConstants.CalculatedColumnStrategyFriendlyName, Item2: item.ColumnExpression, ConfigEnity: item, showShare: _this.props.TeamSharingActivated, EntityType: StrategyConstants.CalculatedColumnStrategyFriendlyName, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, onDelete: CalculatedColumnRedux.CalculatedColumnDelete(item), showBold: true }));
            }
        });
        return (React.createElement("div", null,
            detailRow,
            this.state.EditedAdaptableObject && (React.createElement(CalculatedColumnWizard_1.CalculatedColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.CalculatedColumns, Columns: this.props.Columns, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, GetErrorMessage: function () { return _this.props.CalculatedColumnErrorMessage; }, IsExpressionValid: function (expression) { return _this.props.IsExpressionValid(expression); }, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    CalculatedColumnSummaryComponent.prototype.onEdit = function (calculatedColumn) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(calculatedColumn),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    CalculatedColumnSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CalculatedColumnSummaryComponent.prototype.onFinishWizard = function () {
        var calculatedColumn = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        this.props.onEdit(calculatedColumn);
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CalculatedColumnSummaryComponent.prototype.canFinishWizard = function () {
        var calculatedColumn = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression));
    };
    return CalculatedColumnSummaryComponent;
}(React.Component));
exports.CalculatedColumnSummaryComponent = CalculatedColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onEdit: function (calculatedColumn) {
            return dispatch(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn));
        },
        IsExpressionValid: function (expression) {
            return dispatch(SystemRedux.CalculatedColumnIsExpressionValid(expression));
        },
    };
}
exports.CalculatedColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnSummaryComponent);
