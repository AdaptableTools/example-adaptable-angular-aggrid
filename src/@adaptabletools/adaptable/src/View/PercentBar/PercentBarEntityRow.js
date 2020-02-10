"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var ColorPicker_1 = require("../ColorPicker");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Input_1 = require("../../components/Input");
var PercentBarEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarEntityRow, _super);
    function PercentBarEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PercentBarEntityRow.prototype.render = function () {
        var _this = this;
        var PercentBar = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(PercentBar.ColumnId, this.props.Column) }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: StringExtensions_1.StringExtensions.IsNullOrEmpty(PercentBar.NegativeValueColumnId) ? (React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Min Value", onChange: function (e) { return _this.onMinimumValueChanged(e); }, value: PercentBar.NegativeValue })) : ('[' +
                ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(PercentBar.NegativeValueColumnId, this.props.Columns) +
                ']') }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: StringExtensions_1.StringExtensions.IsNullOrEmpty(PercentBar.PositiveValueColumnId) ? (React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Max Value", onChange: function (e) { return _this.onMaximumValueChanged(e); }, value: PercentBar.PositiveValue })) : ('[' +
                ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(PercentBar.PositiveValueColumnId, this.props.Columns) +
                ']') }));
        colItems[3].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { style: { width: '100%' }, ColorPalette: this.props.ColorPalette, value: PercentBar.PositiveColor, onChange: function (x) { return _this.onPositiveColorChanged(x); } }) }));
        colItems[4].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { style: { width: '100%' }, ColorPalette: this.props.ColorPalette, value: PercentBar.NegativeColor, onChange: function (x) { return _this.onNegativeColorChanged(x); } }) }));
        colItems[5].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(PercentBar); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: !this.props.Column, EntityType: StrategyConstants.PercentBarStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    PercentBarEntityRow.prototype.onMinimumValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var minValue = Number(e.value);
            this.props.onMinimumValueChanged(this.props.AdaptableObject, minValue);
        }
    };
    PercentBarEntityRow.prototype.onMaximumValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var maxValue = Number(e.value);
            this.props.onMaximumValueChanged(this.props.AdaptableObject, maxValue);
        }
    };
    PercentBarEntityRow.prototype.onPositiveColorChanged = function (event) {
        var e = event.target;
        this.props.onPositiveColorChanged(this.props.AdaptableObject, e.value);
    };
    PercentBarEntityRow.prototype.onNegativeColorChanged = function (event) {
        var e = event.target;
        this.props.onNegativeColorChanged(this.props.AdaptableObject, e.value);
    };
    return PercentBarEntityRow;
}(React.Component));
exports.PercentBarEntityRow = PercentBarEntityRow;
