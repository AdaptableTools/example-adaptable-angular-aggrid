"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ShortcutRedux = require("../../Redux/ActionsReducers/ShortcutRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var Enums_2 = require("../../PredefinedConfig/Common/Enums");
var ShortcutEntityRow_1 = require("./ShortcutEntityRow");
var ShortcutWizard_1 = require("./Wizard/ShortcutWizard");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var ShortcutPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutPopupComponent, _super);
    function ShortcutPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ShortcutPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.',
            React.createElement("br", null),
            React.createElement("br", null),
            "Numeric shortcuts update the existing cell value based on a 'calculation'.",
            React.createElement("br", null),
            React.createElement("br", null),
            'Date shortcuts replace the contents of the cell with a new date value.',
        ];
        var colItems = [
            { Content: 'Columns', Size: 2 },
            { Content: 'Key', Size: 2 },
            { Content: 'Operation', Size: 3 },
            { Content: 'Value', Size: 4 },
            { Content: '', Size: 2 },
        ];
        var shortcutOperationList = [
            Enums_2.MathOperation.Add,
            Enums_2.MathOperation.Subtract,
            Enums_2.MathOperation.Multiply,
            Enums_2.MathOperation.Divide,
        ];
        var shortcuts = this.props.Shortcuts.map(function (shortcut, index) {
            return (React.createElement(ShortcutEntityRow_1.ShortcutEntityRow, { AdaptableObject: shortcut, key: 'ns' + index, onEdit: null, colItems: colItems, AvailableActions: shortcutOperationList, AvailableKeys: _this.getAvailableKeys(shortcut), onShare: function () { return _this.props.onShare(shortcut); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: ShortcutRedux.ShortcutDelete(shortcut), onChangeKey: function (shortcut, newKey) { return _this.onChangeKeyShortcut(shortcut, newKey); }, onChangeOperation: function (shortcut, newOperation) {
                    return _this.onChangeOperationShortcut(shortcut, newOperation);
                }, onChangeResult: function (shortcut, newResult) { return _this.onChangeResultShortcut(shortcut, newResult); }, AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create New Shortcut", AccessLevel: this.props.AccessLevel }));
        var shortcut = this.state.EditedAdaptableObject;
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ShortcutStrategyFriendlyName, className: "ab_main_popup", button: newButton, glyphicon: StrategyConstants.ShortcutGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                shortcuts.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: shortcuts })) : (React.createElement(EmptyContent_1.default, null, "Click 'New' to add a new Shortcut.")),
                this.state.EditedAdaptableObject != null && (React.createElement(ShortcutWizard_1.ShortcutWizard, { EditedAdaptableObject: shortcut, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, DateKeysAvailable: shortcut.ShortcutKey
                        ? keys
                            .filter(function (x) {
                            return _this.props.Shortcuts.filter(function (s) { return s.ColumnType == Enums_1.DataType.Date; }).findIndex(function (y) { return y.ShortcutKey == x; }) == -1;
                        })
                            .concat(shortcut.ShortcutKey)
                            .sort()
                        : keys.filter(function (x) {
                            return _this.props.Shortcuts.filter(function (s) { return s.ColumnType == Enums_1.DataType.Date; }).findIndex(function (y) { return y.ShortcutKey == x; }) == -1;
                        }), NumericKeysAvailable: shortcut.ShortcutKey
                        ? keys
                            .filter(function (x) {
                            return _this.props.Shortcuts.filter(function (s) { return s.ColumnType == Enums_1.DataType.Number; }).findIndex(function (y) { return y.ShortcutKey == x; }) == -1;
                        })
                            .concat(shortcut.ShortcutKey)
                            .sort()
                        : keys.filter(function (x) {
                            return _this.props.Shortcuts.filter(function (s) { return s.ColumnType == Enums_1.DataType.Number; }).findIndex(function (y) { return y.ShortcutKey == x; }) == -1;
                        }), WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    ShortcutPopupComponent.prototype.onChangeKeyShortcut = function (shortcut, newKey) {
        var clonedShortcut = Helper_1.default.cloneObject(shortcut);
        clonedShortcut.ShortcutKey = newKey;
        this.props.onEditShortcut(clonedShortcut);
    };
    ShortcutPopupComponent.prototype.onChangeOperationShortcut = function (shortcut, newMathOperation) {
        var clonedShortcut = Helper_1.default.cloneObject(shortcut);
        clonedShortcut.ShortcutOperation = newMathOperation;
        this.props.onEditShortcut(clonedShortcut);
    };
    ShortcutPopupComponent.prototype.onChangeResultShortcut = function (shortcut, newResult) {
        var clonedShortcut = Helper_1.default.cloneObject(shortcut);
        clonedShortcut.ShortcutResult = newResult;
        this.props.onEditShortcut(clonedShortcut);
    };
    ShortcutPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ShortcutPopupComponent.prototype.onFinishWizard = function () {
        var shortcut = this.state.EditedAdaptableObject;
        this.props.onAddShortcut(shortcut);
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ShortcutPopupComponent.prototype.canFinishWizard = function () {
        var shortcut = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutResult) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutKey));
    };
    ShortcutPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyShortcut(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ShortcutPopupComponent.prototype.getAvailableKeys = function (shortcut) {
        var _this = this;
        return shortcut.ColumnType == Enums_1.DataType.Number
            ? keys
                .filter(function (x) {
                return _this.props.Shortcuts.filter(function (s) { return s.ColumnType == Enums_1.DataType.Number; }).findIndex(function (y) { return y.ShortcutKey == x; }) == -1;
            })
                .concat(shortcut.ShortcutKey)
                .sort()
            : keys
                .filter(function (x) {
                return _this.props.Shortcuts.filter(function (s) { return s.ColumnType == Enums_1.DataType.Date; }).findIndex(function (y) { return y.ShortcutKey == x; }) == -1;
            })
                .concat(shortcut.ShortcutKey)
                .sort();
    };
    return ShortcutPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        Shortcuts: state.Shortcut.Shortcuts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddShortcut: function (shortcut) { return dispatch(ShortcutRedux.ShortcutAdd(shortcut)); },
        onEditShortcut: function (shortcut) { return dispatch(ShortcutRedux.ShortcutEdit(shortcut)); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ShortcutStrategyId));
        },
    };
}
exports.ShortcutPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ShortcutPopupComponent);
var keys = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];
