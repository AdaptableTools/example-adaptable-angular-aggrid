"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var ColorPicker_1 = require("../ColorPicker");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Input_1 = require("../../components/Input");
var GradientColumnEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnEntityRow, _super);
    function GradientColumnEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GradientColumnEntityRow.prototype.render = function () {
        var _this = this;
        var GradientColumn = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(GradientColumn.ColumnId, this.props.Column) }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Positive Value", onChange: function (e) { return _this.onPositiveValueChanged(e); }, value: GradientColumn.PositiveValue }) }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Negative Value", onChange: function (e) { return _this.onNegativeValueChanged(e); }, value: GradientColumn.NegativeValue }) }));
        colItems[3].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Base Value", onChange: function (e) { return _this.onBaseValueChanged(e); }, value: GradientColumn.BaseValue }) }));
        colItems[4].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { style: { width: '100%' }, ColorPalette: this.props.ColorPalette, value: GradientColumn.PositiveColor, onChange: function (x) { return _this.onPositiveColorChanged(x); } }) }));
        colItems[5].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { style: { width: '100%' }, ColorPalette: this.props.ColorPalette, value: GradientColumn.NegativeColor, onChange: function (x) { return _this.onNegativeColorChanged(x); } }) }));
        colItems[6].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(GradientColumn); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: !this.props.Column, EntityType: StrategyConstants.GradientColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    GradientColumnEntityRow.prototype.onNegativeValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var minValue = Number(e.value);
            this.props.onNegativeValueChanged(this.props.AdaptableObject, minValue);
        }
    };
    GradientColumnEntityRow.prototype.onPositiveValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var maxValue = Number(e.value);
            this.props.onPositiveValueChanged(this.props.AdaptableObject, maxValue);
        }
    };
    GradientColumnEntityRow.prototype.onBaseValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var maxValue = Number(e.value);
            this.props.onBaseValueChanged(this.props.AdaptableObject, maxValue);
        }
    };
    GradientColumnEntityRow.prototype.onPositiveColorChanged = function (event) {
        var e = event.target;
        this.props.onPositiveColorChanged(this.props.AdaptableObject, e.value);
    };
    GradientColumnEntityRow.prototype.onNegativeColorChanged = function (event) {
        var e = event.target;
        this.props.onNegativeColorChanged(this.props.AdaptableObject, e.value);
    };
    return GradientColumnEntityRow;
}(React.Component));
exports.GradientColumnEntityRow = GradientColumnEntityRow;
