"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var CellValidationRedux = require("../../Redux/ActionsReducers/CellValidationRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var CellValidationWizard_1 = require("./Wizard/CellValidationWizard");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var CellValidationEntityRow_1 = require("./CellValidationEntityRow");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var SimpleButton_1 = require("../../components/SimpleButton");
var EmptyContent_1 = require("../../components/EmptyContent");
var CellValidationPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationPopupComponent, _super);
    function CellValidationPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    CellValidationPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                if (this.props.PopupParams.action == 'New') {
                    var cellValitdation = ObjectFactory_1.ObjectFactory.CreateEmptyCellValidation();
                    cellValitdation.ColumnId = this.props.PopupParams.columnId;
                    this.setState({
                        EditedAdaptableObject: cellValitdation,
                        WizardStartIndex: 1,
                        WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
                    });
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    CellValidationPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Cell Validation Rules determine whether an edit is valid.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Rules can disallow all edits for a specified column, or only those that fail to meet specified criteria.',
            React.createElement("br", null),
            React.createElement("br", null),
            'When a rule is broken, you can choose whether to prevent the edit outright, or allow it after a warning is displayed.',
        ];
        var colItems = [
            { Content: 'Validation Rule', Size: 4 },
            { Content: 'Expression', Size: 4 },
            { Content: 'Action', Size: 2 },
            { Content: '', Size: 2 },
        ];
        var CellValidationItems = this.props.CellValidations.map(function (cellValidationRule, index) {
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(cellValidationRule.ColumnId, _this.props.Columns);
            return (React.createElement(CellValidationEntityRow_1.CellValidationEntityRow, { key: index, colItems: colItems, AdaptableObject: cellValidationRule, Column: column, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function () { return _this.onEdit(cellValidationRule); }, onShare: function () { return _this.props.onShare(cellValidationRule); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: CellValidationRedux.CellValidationDelete(cellValidationRule), onChangeActionMode: function (x, actionMode) { return _this.onActionModeChanged(x, actionMode); }, AccessLevel: _this.props.AccessLevel, ValidationService: _this.props.Adaptable.ValidationService }));
        });
        var newButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onNew(); }, tone: "accent", tooltip: "Create Cell Validation Rule", icon: "plus", variant: "raised", AccessLevel: this.props.AccessLevel }, "NEW"));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.CellValidationStrategyFriendlyName, button: newButton, glyphicon: StrategyConstants.CellValidationGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
            CellValidationItems.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: CellValidationItems })) : (React.createElement(EmptyContent_1.default, null,
                React.createElement("p", null, "Click 'New' to start creating rules for valid cell edits."),
                React.createElement("p", null, "Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason)."))),
            this.state.EditedAdaptableObject != null && (React.createElement(CellValidationWizard_1.CellValidationWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, Adaptable: this.props.Adaptable, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    CellValidationPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyCellValidation(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    CellValidationPopupComponent.prototype.onEdit = function (CellValidation) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(CellValidation),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    CellValidationPopupComponent.prototype.onActionModeChanged = function (cellValidationRule, actionMode) {
        cellValidationRule.ActionMode = actionMode;
        this.props.onEditCellValidation(cellValidationRule);
    };
    CellValidationPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (this.shouldClosePopupOnFinishWizard) {
            this.props.onClosePopup();
        }
    };
    CellValidationPopupComponent.prototype.onFinishWizard = function () {
        var cellValidationRule = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New) {
            this.props.onAddCellValidation(cellValidationRule);
        }
        else {
            this.props.onEditCellValidation(cellValidationRule);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 5,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    CellValidationPopupComponent.prototype.canFinishWizard = function () {
        var cellValidationRule = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(cellValidationRule.ColumnId) &&
            ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyOrValidExpression(cellValidationRule.Expression) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Adaptable.ValidationService.createCellValidationDescription(cellValidationRule, this.props.Columns)));
    };
    return CellValidationPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CellValidations: state.CellValidation.CellValidations,
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
exports.CellValidationPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellValidationPopupComponent);
