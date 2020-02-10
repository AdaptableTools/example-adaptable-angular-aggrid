"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var FreeTextColumnRedux = require("../../Redux/ActionsReducers/FreeTextColumnRedux");
var FreeTextColumnEntityRow_1 = require("./FreeTextColumnEntityRow");
var FreeTextColumnWizard_1 = require("./Wizard/FreeTextColumnWizard");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var FreeTextColumnPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnPopupComponent, _super);
    function FreeTextColumnPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        };
        return _this;
    }
    FreeTextColumnPopupComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                if (this.props.PopupParams.action == 'Edit') {
                    var editFreeTextColumn = this.props.FreeTextColumns.find(function (x) { return x.ColumnId == _this.props.PopupParams.columnId; });
                    var index = this.props.FreeTextColumns.indexOf(editFreeTextColumn);
                    this.onEdit(editFreeTextColumn);
                }
            }
        }
    };
    FreeTextColumnPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'A FreeText Column is one where you can insert any values you wish (e.g.comments).',
            React.createElement("br", null),
            React.createElement("br", null),
            'These values are stored with your settings and not with the rest of the data in the grid.',
        ];
        var colItems = [
            { Content: 'Column', Size: 3 },
            { Content: 'Default Value', Size: 4 },
            { Content: 'No. Stored Value', Size: 3 },
            { Content: '', Size: 2 },
        ];
        var freeTextColumns = this.props.FreeTextColumns.map(function (FreeTextColumn, index) {
            return (React.createElement(FreeTextColumnEntityRow_1.FreeTextColumnEntityRow, { key: FreeTextColumn.Uuid, colItems: colItems, AdaptableObject: FreeTextColumn, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function () { return _this.onEdit(FreeTextColumn); }, onShare: function () { return _this.props.onShare(FreeTextColumn); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: FreeTextColumnRedux.FreeTextColumnDelete(FreeTextColumn), AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create FreeText Column", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.FreeTextColumnStrategyFriendlyName, button: newButton, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.FreeTextColumnGlyph, infoBody: infoBody },
                this.props.FreeTextColumns.length == 0 ? (React.createElement(EmptyContent_1.default, null, "Click 'New' to create a new Free Text Column.")) : (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: freeTextColumns })),
                this.state.EditedAdaptableObject != null && (React.createElement(FreeTextColumnWizard_1.FreeTextColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Columns: this.props.Columns, Adaptable: this.props.Adaptable, ConfigEntities: this.props.FreeTextColumns, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    FreeTextColumnPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    FreeTextColumnPopupComponent.prototype.onEdit = function (FreeTextColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(FreeTextColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    FreeTextColumnPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    FreeTextColumnPopupComponent.prototype.onFinishWizard = function () {
        var freeTextColumn = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditFreeTextColumn(freeTextColumn);
        }
        else {
            this.props.onAddFreeTextColumn(freeTextColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    FreeTextColumnPopupComponent.prototype.canFinishWizard = function () {
        var freeTextColumn = this.state.EditedAdaptableObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(freeTextColumn.ColumnId);
    };
    return FreeTextColumnPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
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
exports.FreeTextColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FreeTextColumnPopupComponent);
