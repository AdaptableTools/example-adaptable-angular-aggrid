"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var CalculatedColumnRedux = require("../../Redux/ActionsReducers/CalculatedColumnRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var CalculatedColumnWizard_1 = require("./Wizard/CalculatedColumnWizard");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var CalculatedColumnEntityRow_1 = require("./CalculatedColumnEntityRow");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var EmptyContent_1 = require("../../components/EmptyContent");
var CalculatedColumnPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnPopupComponent, _super);
    function CalculatedColumnPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    CalculatedColumnPopupComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                if (this.props.PopupParams.action == 'Edit') {
                    // only editing is possible - you cannot create a new calc column from the column menu
                    var calculatedColumn = this.props.CalculatedColumns.find(function (x) { return x.ColumnId == _this.props.PopupParams.columnId; });
                    this.onEdit(calculatedColumn);
                }
            }
        }
    };
    CalculatedColumnPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Use Calculated Columns to create your own bespoke columns; the value of the column is an Expression which will update automatically in line with any columns it refers to.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Once created, Calculated Columns are treated like any other column in the Grid.',
        ];
        var colItems = [
            { Content: 'Column Name', Size: 3 },
            { Content: 'Column Expression', Size: 7 },
            { Content: '', Size: 2 },
        ];
        var propCalculatedColumns = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.CalculatedColumns, 'ColumnId');
        var calculatedColumns = propCalculatedColumns.map(function (calculatedColumn, index) {
            // let index = this.props.CalculatedColumns.indexOf(calculatedColumn)
            return (React.createElement(CalculatedColumnEntityRow_1.CalculatedColumnEntityRow, { colItems: colItems, Columns: _this.props.Columns, onShare: function () { return _this.props.onShare(calculatedColumn); }, TeamSharingActivated: _this.props.TeamSharingActivated, AdaptableObject: calculatedColumn, key: calculatedColumn.ColumnId, onEdit: function (calculatedColumn) { return _this.onEdit(calculatedColumn); }, onDeleteConfirm: CalculatedColumnRedux.CalculatedColumnDelete(calculatedColumn), AccessLevel: _this.props.AccessLevel, CalculatedColumnExpressionService: _this.props.Adaptable.CalculatedColumnExpressionService }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () {
                _this.onNew();
            }, tooltip: "Create Calculated Column", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.CalculatedColumnStrategyFriendlyName, className: "ab_main_popup", infoBody: infoBody, button: newButton, border: "none", bodyProps: { padding: 0 }, glyphicon: StrategyConstants.CalculatedColumnGlyph },
            this.props.CalculatedColumns.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: calculatedColumns })) : (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a new Calculated Column.")),
            this.state.EditedAdaptableObject && (React.createElement(CalculatedColumnWizard_1.CalculatedColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.CalculatedColumns, Columns: this.props.Columns, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, GetErrorMessage: function () { return _this.props.CalculatedColumnErrorMessage; }, IsExpressionValid: function (expression) { return _this.props.IsExpressionValid(expression); }, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    CalculatedColumnPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyCalculatedColumn(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    CalculatedColumnPopupComponent.prototype.onEdit = function (calculatedColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(calculatedColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    CalculatedColumnPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.props.IsExpressionValid('');
    };
    CalculatedColumnPopupComponent.prototype.onFinishWizard = function () {
        var calculatedColumn = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditCalculatedColumn(calculatedColumn);
        }
        else {
            this.props.onAddCalculatedColumn(calculatedColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    CalculatedColumnPopupComponent.prototype.canFinishWizard = function () {
        var calculatedColumn = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression));
    };
    return CalculatedColumnPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        CalculatedColumnErrorMessage: state.System.CalculatedColumnErrorMessage,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddCalculatedColumn: function (calculatedColumn) {
            return dispatch(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
        },
        onEditCalculatedColumn: function (calculatedColumn) {
            return dispatch(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn));
        },
        IsExpressionValid: function (expression) {
            return dispatch(SystemRedux.CalculatedColumnIsExpressionValid(expression));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CalculatedColumnStrategyId));
        },
    };
}
exports.CalculatedColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnPopupComponent);
