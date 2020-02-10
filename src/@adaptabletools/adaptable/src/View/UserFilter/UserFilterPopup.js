"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var UserFilterWizard_1 = require("./Wizard/UserFilterWizard");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var UserFilterEntityRow_1 = require("./UserFilterEntityRow");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var UIHelper_1 = require("../UIHelper");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var UserFilterPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterPopupComponent, _super);
    function UserFilterPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    UserFilterPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                if (this.props.PopupParams.action == 'New') {
                    var userFilter = ObjectFactory_1.ObjectFactory.CreateEmptyUserFilter();
                    userFilter.ColumnId = this.props.PopupParams.columnId;
                    this.setState({
                        EditedAdaptableObject: userFilter,
                        WizardStartIndex: 1,
                        WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
                    });
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    UserFilterPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'User Filters are named, reusable Column Queries.',
            React.createElement("br", null),
            React.createElement("br", null),
            "Once created, User Filters are available in the column's filter dropdown as if a single colum value.",
            React.createElement("br", null),
            React.createElement("br", null),
            'Additionally they are available when creating other Queries (e.g. for Advanced Search)',
            React.createElement("br", null),
            React.createElement("br", null),
            'A User Filter Query can contain only one Column Condition; but that condition may contain as many column values, filter or ranges as required.',
        ];
        var selectedColumnId = '';
        if (this.state.EditedAdaptableObject != null) {
            var filter = this.state.EditedAdaptableObject;
            var editedColumn = filter.ColumnId;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(editedColumn)) {
                selectedColumnId = editedColumn;
            }
            else if (this.props.PopupParams) {
                if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                    selectedColumnId = this.props.PopupParams.columnId;
                }
            }
        }
        var colItems = [
            { Content: 'Name', Size: 2 },
            { Content: 'Column', Size: 2 },
            { Content: 'Description', Size: 6 },
            { Content: '', Size: 2 },
        ];
        var UserFilterItems = this.props.UserFilters.map(function (userFilter, index) {
            return (React.createElement(UserFilterEntityRow_1.UserFilterEntityRow, { AdaptableObject: userFilter, colItems: colItems, key: 'CS' + index, onShare: function () { return _this.props.onShare(userFilter); }, TeamSharingActivated: _this.props.TeamSharingActivated, UserFilters: _this.props.UserFilters, Columns: _this.props.Columns, onEdit: function () { return _this.onEdit(userFilter); }, onDeleteConfirm: UserFilterRedux.UserFilterDelete(userFilter), AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create User Filter", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.UserFilterStrategyFriendlyName, infoBody: infoBody, button: newButton, glyphicon: StrategyConstants.UserFilterGlyph, bodyProps: { padding: 0 } },
                UserFilterItems.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: UserFilterItems })) : (React.createElement(EmptyContent_1.default, null,
                    React.createElement("p", null, "Click 'New' to start creating user filters."),
                    React.createElement("p", null),
                    React.createElement("p", null, "Once created, user filters are accessible both when filtering columns and creating queries (e.g. Advanced Search, Plus / Minus, Conditional Style etc.)."))),
                this.state.EditedAdaptableObject != null && (React.createElement(UserFilterWizard_1.UserFilterWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, Columns: this.props.Columns, ConfigEntities: null, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, SelectedColumnId: selectedColumnId, Adaptable: this.props.Adaptable, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    UserFilterPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyUserFilter(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    UserFilterPopupComponent.prototype.onEdit = function (userFilter) {
        var clonedObject = Helper_1.Helper.cloneObject(userFilter);
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(clonedObject),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    UserFilterPopupComponent.prototype.onCloseWizard = function () {
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
    UserFilterPopupComponent.prototype.onFinishWizard = function () {
        var userFilter = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditUserFilter(userFilter);
        }
        else {
            this.props.onAddUserFilter(userFilter);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    UserFilterPopupComponent.prototype.canFinishWizard = function () {
        var userFilter = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(userFilter.Name) &&
            StringExtensions_1.StringExtensions.IsNotEmpty(userFilter.ColumnId) &&
            ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(userFilter.Expression));
    };
    return UserFilterPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUserFilter: function (userFilter) {
            return dispatch(UserFilterRedux.UserFilterAdd(userFilter));
        },
        onEditUserFilter: function (userFilter) {
            return dispatch(UserFilterRedux.UserFilterEdit(userFilter));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId));
        },
    };
}
exports.UserFilterPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(UserFilterPopupComponent);
