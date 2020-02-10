"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PlusMinusRedux = require("../../Redux/ActionsReducers/PlusMinusRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PlusMinusWizard_1 = require("./Wizard/PlusMinusWizard");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var PlusMinusEntityRow_1 = require("./PlusMinusEntityRow");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var UIHelper_1 = require("../UIHelper");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var PlusMinusPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusPopupComponent, _super);
    function PlusMinusPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    PlusMinusPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                if (this.props.PopupParams.action == 'New') {
                    var plusMinus = ObjectFactory_1.ObjectFactory.CreateEmptyPlusMinusRule();
                    plusMinus.ColumnId = this.props.PopupParams.columnId;
                    this.setState({
                        EditedAdaptableObject: plusMinus,
                        WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
                        WizardStartIndex: 1,
                    });
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    PlusMinusPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            "Enables the creation of Plus/Minus 'Nudge' Rules (i.e. how much to increment numeric cells when ",
            React.createElement("i", null, "'+'"),
            ' or ',
            React.createElement("i", null, "'-'"),
            ' keys are pressed on the keyboard).',
            React.createElement("br", null),
            React.createElement("br", null),
            "Plus/Minus 'Nudge' Rules can be set for any numeric column, with option to specify whether a nudge is always applied or only when a particular condition is met.",
        ];
        var colItems = [
            { Content: 'Column', Size: 3 },
            { Content: 'Nudge Value', Size: 2 },
            { Content: 'Row Condition', Size: 5 },
            { Content: '', Size: 2 },
        ];
        var PlusMinusRules = this.props.PlusMinusRules.map(function (x, index) {
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(x.ColumnId, _this.props.Columns);
            return (React.createElement(PlusMinusEntityRow_1.PlusMinusEntityRow, { colItems: colItems, AdaptableObject: x, key: index, UserFilters: _this.props.UserFilters, Columns: _this.props.Columns, onEdit: function () { return _this.onEdit(x); }, TeamSharingActivated: _this.props.TeamSharingActivated, onShare: function () { return _this.props.onShare(x); }, onDeleteConfirm: PlusMinusRedux.PlusMinusRuleDelete(x), Column: column, onColumnDefaultNudgeValueChange: function (plusMinusRule, event) {
                    return _this.onColumnDefaultNudgeValueChange(plusMinusRule, event);
                }, AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Plus / Minus Rule", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.PlusMinusStrategyFriendlyName, bodyProps: { padding: 0 }, button: newButton, glyphicon: StrategyConstants.PlusMinusGlyph, infoBody: infoBody },
                PlusMinusRules.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: PlusMinusRules })) : (React.createElement(EmptyContent_1.default, null, "Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked while in a numeric cell.")),
                this.state.EditedAdaptableObject != null && (React.createElement(PlusMinusWizard_1.PlusMinusWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, SelectedColumnId: null, Adaptable: this.props.Adaptable, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    PlusMinusPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyPlusMinusRule(),
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 0,
        });
    };
    PlusMinusPopupComponent.prototype.onEdit = function (plusMinusRule) {
        var clonedObject = Helper_1.Helper.cloneObject(plusMinusRule);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
            WizardStartIndex: 1,
        });
    };
    PlusMinusPopupComponent.prototype.onCloseWizard = function () {
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
    PlusMinusPopupComponent.prototype.onFinishWizard = function () {
        var plusMinus = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditPlusMinusRule(plusMinus);
        }
        else {
            this.props.onAddPlusMinusRule(plusMinus);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    PlusMinusPopupComponent.prototype.canFinishWizard = function () {
        var plusMinus = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
            (plusMinus.IsDefaultNudge ||
                ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyOrValidExpression(plusMinus.Expression)));
    };
    PlusMinusPopupComponent.prototype.onColumnDefaultNudgeValueChange = function (plusMinusRule, event) {
        var clonedObject = Helper_1.Helper.cloneObject(plusMinusRule);
        var e = event.target;
        clonedObject.NudgeValue = parseFloat(e.value);
        this.props.onEditPlusMinusRule(clonedObject);
    };
    PlusMinusPopupComponent.prototype.onAddPlusMinusRule = function (index, plusMinusRule) {
        // check if its a default nudge value that there is not one already set for that column
        if (plusMinusRule.IsDefaultNudge) {
            var existingIndex = this.props.PlusMinusRules.findIndex(function (p) { return p.ColumnId == plusMinusRule.ColumnId && p.IsDefaultNudge; });
            if (existingIndex > -1) {
                if (existingIndex == index) {
                    // editing the existing default nudge so just do an edit
                    this.props.onEditPlusMinusRule(plusMinusRule);
                }
                else {
                    // its a new one so need warning that will update
                    this.onConfirmWarningCellValidation(existingIndex, plusMinusRule);
                }
            }
            else {
                this.props.onAddPlusMinusRule(plusMinusRule);
            }
        }
        else {
            // not quite sure that this is right... need to test:
            if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
                this.props.onEditPlusMinusRule(plusMinusRule);
            }
            else {
                this.props.onAddPlusMinusRule(plusMinusRule);
            }
        }
    };
    PlusMinusPopupComponent.prototype.onConfirmWarningCellValidation = function (index, plusMinusRule) {
        var confirmation = {
            CancelButtonText: 'Cancel',
            Header: 'Existing Default Column Nudge Value for: ' + plusMinusRule.ColumnId,
            Msg: 'Do you want to override it with new value: ?',
            ConfirmButtonText: 'Confirm',
            CancelAction: null,
            ConfirmAction: PlusMinusRedux.PlusMinusRuleEdit(plusMinusRule),
            ShowInputBox: false,
            MessageType: Enums_1.MessageType.Warning,
        };
        this.props.onConfirmWarningCellValidation(confirmation);
    };
    return PlusMinusPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        PlusMinusRules: state.PlusMinus.PlusMinusRules,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPlusMinusRule: function (plusMinusRule) {
            return dispatch(PlusMinusRedux.PlusMinusRuleAdd(plusMinusRule));
        },
        onEditPlusMinusRule: function (plusMinusRule) {
            return dispatch(PlusMinusRedux.PlusMinusRuleEdit(plusMinusRule));
        },
        onConfirmWarningCellValidation: function (confirmation) {
            return dispatch(PopupRedux.PopupShowConfirmation(confirmation));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PlusMinusStrategyId));
        },
    };
}
exports.PlusMinusPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PlusMinusPopupComponent);
