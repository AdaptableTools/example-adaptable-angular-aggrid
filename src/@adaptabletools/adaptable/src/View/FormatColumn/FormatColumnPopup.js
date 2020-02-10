"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
var FormatColumnEntityRow_1 = require("./FormatColumnEntityRow");
var FormatColumnWizard_1 = require("./Wizard/FormatColumnWizard");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var UIHelper_1 = require("../UIHelper");
var rebass_1 = require("rebass");
var EmptyContent_1 = require("../../components/EmptyContent");
var FormatColumnPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnPopupComponent, _super);
    function FormatColumnPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = {
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        };
        return _this;
    }
    FormatColumnPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                var columnId_1 = this.props.PopupParams.columnId;
                if (this.props.PopupParams.action == 'New') {
                    var newFormatColumn = ObjectFactory_1.ObjectFactory.CreateEmptyFormatColumn();
                    newFormatColumn.ColumnId = columnId_1;
                    this.onNewFromColumn(newFormatColumn);
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var editFormatColumn = this.props.FormatColumns.find(function (x) { return x.ColumnId == columnId_1; });
                    this.onEdit(editFormatColumn);
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    FormatColumnPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Format a column so it styles with the colours and font properties that you provide.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Unlike Conditional Styles the column is ',
            React.createElement("b", null, "always"),
            ' formatted as set and is not dependent on a rule being met.',
        ];
        var colItems = [
            { Content: 'Column', Size: 4 },
            { Content: 'Format Style', Size: 6 },
            { Content: '', Size: 2 },
        ];
        var FormatColumns = this.props.FormatColumns.map(function (formatColumn, index) {
            return (React.createElement(FormatColumnEntityRow_1.FormatColumnEntityRow, { key: formatColumn.Uuid, colItems: colItems, AdaptableObject: formatColumn, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function () { return _this.onEdit(formatColumn); }, onShare: function () { return _this.props.onShare(formatColumn); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: FormatColumnRedux.FormatColumnDelete(formatColumn), AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Format Column", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.FormatColumnStrategyFriendlyName, button: newButton, glyphicon: StrategyConstants.FormatColumnGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                this.props.FormatColumns.length == 0 ? (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a new column format.")) : (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: FormatColumns })),
                this.state.EditedAdaptableObject != null && (React.createElement(FormatColumnWizard_1.FormatColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Columns: this.props.Columns, Adaptable: this.props.Adaptable, ConfigEntities: this.props.FormatColumns, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    FormatColumnPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyFormatColumn(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    FormatColumnPopupComponent.prototype.onNewFromColumn = function (formatColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(formatColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 1,
        });
    };
    FormatColumnPopupComponent.prototype.onEdit = function (formatColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(formatColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    FormatColumnPopupComponent.prototype.onCloseWizard = function () {
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
    FormatColumnPopupComponent.prototype.onFinishWizard = function () {
        var formatColumn = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditFormatColumn(formatColumn);
        }
        else {
            this.props.onAddFormatColumn(formatColumn);
        }
        this.setState({ EditedAdaptableObject: null, WizardStartIndex: 0 });
        this.shouldClosePopupOnFinishWizard = false;
    };
    FormatColumnPopupComponent.prototype.canFinishWizard = function () {
        var formatColumn = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(formatColumn.Style));
    };
    return FormatColumnPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        FormatColumns: state.FormatColumn.FormatColumns,
        StyleClassNames: state.UserInterface.StyleClassNames,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFormatColumn: function (formatColumn) {
            return dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn));
        },
        onEditFormatColumn: function (formatColumn) {
            return dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FormatColumnStrategyId));
        },
    };
}
exports.FormatColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormatColumnPopupComponent);
