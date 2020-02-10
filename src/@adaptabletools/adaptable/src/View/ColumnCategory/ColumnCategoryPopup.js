"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ColumnCategoryRedux = require("../../Redux/ActionsReducers/ColumnCategoryRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ColumnCategoryEntityRow_1 = require("./ColumnCategoryEntityRow");
var ColumnCategoryWizard_1 = require("./Wizard/ColumnCategoryWizard");
var EmptyContent_1 = require("../../components/EmptyContent");
var ColumnCategoryPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategoryPopupComponent, _super);
    function ColumnCategoryPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ColumnCategoryPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action == 'New') {
                this.onNew();
            }
        }
        this.shouldClosePopupOnFinishWizard =
            this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    };
    ColumnCategoryPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Column Categories allow you to link different columns, primarily for use in Conditional Styles.',
            React.createElement("br", null),
            React.createElement("br", null),
            'They are also used in Column Chooser to make it easier to find and manage large column sets.',
        ];
        var colItems = [
            { Content: 'Categry', Size: 2 },
            { Content: 'Columns', Size: 8 },
            { Content: '', Size: 2 },
        ];
        var ColumnCategoryRows = this.props.ColumnCategorys.map(function (item, index) {
            return (React.createElement(ColumnCategoryEntityRow_1.ColumnCategoryEntityRow, { key: index, colItems: colItems, AdaptableObject: item, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: ColumnCategoryRedux.ColumnCategoryDelete(item), AccessLevel: _this.props.AccessLevel }));
        });
        var newSearchButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tone: "accent", tooltip: "Create New Advanced Search", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ColumnCategoryStrategyFriendlyName, infoBody: infoBody, button: newSearchButton, glyphicon: StrategyConstants.ColumnCategoryGlyph, bodyProps: { padding: 0 } },
            ColumnCategoryRows.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: ColumnCategoryRows })) : (React.createElement(EmptyContent_1.default, null,
                React.createElement("p", null, "Click 'New' to start creating Column Categories."))),
            this.state.EditedAdaptableObject != null && (React.createElement(ColumnCategoryWizard_1.ColumnCategoryWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: this.props.ColumnCategorys, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ColumnCategorys: this.props.ColumnCategorys, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    ColumnCategoryPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyColumnCategory(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ColumnCategoryPopupComponent.prototype.onEdit = function (columnCategory) {
        var clonedObject = Helper_1.Helper.cloneObject(columnCategory);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ColumnCategoryPopupComponent.prototype.onCloseWizard = function () {
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
    ColumnCategoryPopupComponent.prototype.onFinishWizard = function () {
        var columnCategory = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditColumnCategory(columnCategory);
        }
        else {
            this.props.onAddColumnCategory(columnCategory);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    ColumnCategoryPopupComponent.prototype.canFinishWizard = function () {
        var ColumnCategory = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotEmpty(ColumnCategory.ColumnCategoryId) &&
            ArrayExtensions_1.ArrayExtensions.IsNotEmpty(ColumnCategory.ColumnIds));
    };
    return ColumnCategoryPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ColumnCategorys: state.ColumnCategory.ColumnCategories,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddColumnCategory: function (ColumnCategory) {
            return dispatch(ColumnCategoryRedux.ColumnCategoryAdd(ColumnCategory));
        },
        onEditColumnCategory: function (columnCategory) {
            return dispatch(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId));
        },
    };
}
exports.ColumnCategoryPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnCategoryPopupComponent);
