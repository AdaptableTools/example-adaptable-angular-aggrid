"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var Enums_2 = require("../../PredefinedConfig/Common/Enums");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Dropdown_1 = require("../../components/Dropdown");
var Input_1 = require("../../components/Input");
var ShortcutEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutEntityRow, _super);
    function ShortcutEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortcutEntityRow.prototype.render = function () {
        var _this = this;
        var shortcut = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: shortcut.ColumnType == Enums_1.DataType.Date ? 'Date' : 'Numeric' }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(Dropdown_1.default, { style: { minWidth: 'auto', width: '100%' }, showClearButton: false, showEmptyItem: false, options: this.props.AvailableKeys.map(function (x) {
                    return {
                        value: x,
                        label: x,
                    };
                }), value: shortcut.ShortcutKey, onChange: function (x) { return _this.onKeySelectChange(x); } }) }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: shortcut.ColumnType == Enums_1.DataType.Date ? ('Replace Cell') : (React.createElement(Dropdown_1.default, { style: { minWidth: 'auto', width: '100%' }, showEmptyItem: false, showClearButton: false, value: shortcut.ShortcutOperation, onChange: function (x) { return _this.onActionChange(x); }, options: this.props.AvailableActions.map(function (shortcutOperation) {
                    return { value: shortcutOperation, label: Enums_2.MathOperation[shortcutOperation] };
                }) })) }));
        colItems[3].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: shortcut.IsDynamic ? (shortcut.ShortcutResult) : (React.createElement(Input_1.default, { width: "100%", type: shortcut.ColumnType == Enums_1.DataType.Date ? 'date' : 'number', placeholder: "Shortcut Result", onChange: function (e) { return _this.onResultChange(e); }, value: shortcut.ShortcutResult })) }));
        colItems[4].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { showEdit: false, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.ShortcutStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    ShortcutEntityRow.prototype.onResultChange = function (event) {
        var e = event.target;
        this.props.onChangeResult(this.props.AdaptableObject, e.value);
    };
    ShortcutEntityRow.prototype.onKeySelectChange = function (value) {
        this.props.onChangeKey(this.props.AdaptableObject, value);
    };
    ShortcutEntityRow.prototype.onActionChange = function (value) {
        this.props.onChangeOperation(this.props.AdaptableObject, value);
    };
    return ShortcutEntityRow;
}(React.Component));
exports.ShortcutEntityRow = ShortcutEntityRow;
