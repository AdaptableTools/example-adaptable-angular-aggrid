"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ConditionalStyleRedux = require("../../Redux/ActionsReducers/ConditionalStyleRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ConditionalStyleEntityRow_1 = require("./ConditionalStyleEntityRow");
var ConditionalStyleWizard_1 = require("./Wizard/ConditionalStyleWizard");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var rebass_1 = require("rebass");
var EmptyContent_1 = require("../../components/EmptyContent");
var ConditionalStylePopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStylePopupComponent, _super);
    function ConditionalStylePopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ConditionalStylePopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                var columnId = this.props.PopupParams.columnId;
                if (this.props.PopupParams.action == 'New') {
                    var _editedConditionalStyle = ObjectFactory_1.ObjectFactory.CreateEmptyConditionalStyle();
                    _editedConditionalStyle.ColumnId = columnId;
                    _editedConditionalStyle.ConditionalStyleScope = 'Column';
                    this.setState({
                        EditedAdaptableObject: _editedConditionalStyle,
                        WizardStartIndex: 1,
                        WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
                    });
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    ConditionalStylePopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Conditional Styles enable columns and rows to be given distinct styles according to user rules.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Styles include selection of fore and back colours, and font properties.',
        ];
        var colItems = [
            { Content: 'Scope', Size: 2 },
            { Content: 'Style', Size: 2 },
            { Content: 'Query', Size: 6 },
            { Content: '', Size: 2 },
        ];
        var conditionalStyles = this.props.ConditionalStyles.map(function (conditionalStyle, index) {
            return (React.createElement(ConditionalStyleEntityRow_1.ConditionalStyleEntityRow, { AdaptableObject: conditionalStyle, colItems: colItems, key: 'CS' + (conditionalStyle.Uuid || index), onShare: function () { return _this.props.onShare(conditionalStyle); }, TeamSharingActivated: _this.props.TeamSharingActivated, UserFilters: _this.props.UserFilters, Columns: _this.props.Columns, onEdit: function () { return _this.onEdit(conditionalStyle); }, onDeleteConfirm: ConditionalStyleRedux.ConditionalStyleDelete(conditionalStyle), AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Conditional Style", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ConditionalStyleStrategyFriendlyName, button: newButton, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.ConditionalStyleGlyph, infoBody: infoBody },
                this.props.ConditionalStyles.length == 0 ? (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a new conditional style to be applied at row or column level when a rule set by you is met.")) : (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: conditionalStyles })),
                this.state.EditedAdaptableObject != null && (React.createElement(ConditionalStyleWizard_1.ConditionalStyleWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    ConditionalStylePopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyConditionalStyle(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ConditionalStylePopupComponent.prototype.onEdit = function (condition) {
        var clonedObject = Helper_1.Helper.cloneObject(condition);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ConditionalStylePopupComponent.prototype.onCloseWizard = function () {
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
    ConditionalStylePopupComponent.prototype.onFinishWizard = function () {
        var conditionalStyle = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.New) {
            this.props.onAddConditionalStyle(conditionalStyle);
        }
        else if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditConditionalStyle(conditionalStyle);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    ConditionalStylePopupComponent.prototype.canFinishWizard = function () {
        var conditionalStyle = this.state.EditedAdaptableObject;
        if (conditionalStyle.ConditionalStyleScope == 'Column' &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnId)) {
            return false;
        }
        if (conditionalStyle.ConditionalStyleScope == 'ColumnCategory' &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnCategoryId)) {
            return false;
        }
        return (ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(conditionalStyle.Style));
    };
    return ConditionalStylePopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        StyleClassNames: state.UserInterface.StyleClassNames,
        ColumnCategories: state.ColumnCategory.ColumnCategories,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddConditionalStyle: function (conditionalStyle) {
            return dispatch(ConditionalStyleRedux.ConditionalStyleAdd(conditionalStyle));
        },
        onEditConditionalStyle: function (conditionalStyle) {
            return dispatch(ConditionalStyleRedux.ConditionalStyleEdit(conditionalStyle));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId));
        },
    };
}
exports.ConditionalStylePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ConditionalStylePopupComponent);
