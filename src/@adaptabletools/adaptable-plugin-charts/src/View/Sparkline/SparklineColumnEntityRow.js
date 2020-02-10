"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("@adaptabletools/adaptable/src/View/Components/AdaptableObjectRow");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("@adaptabletools/adaptable/src/View/Components/EntityRowItem");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var SparklineColumnSettingsWizard_1 = require("./Wizard/SparklineColumnSettingsWizard");
var ColorPicker_1 = require("@adaptabletools/adaptable/src/View/ColorPicker");
var SparklineColumnEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnEntityRow, _super);
    function SparklineColumnEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparklineColumnEntityRow.prototype.render = function () {
        var _this = this;
        var sparklineColumn = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(sparklineColumn.ColumnId, this.props.Column) }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(SparklineColumnSettingsWizard_1.SparklineTypeDropdown, { value: sparklineColumn.SparklineType, onChange: function (sparklineType) {
                    _this.props.onSparklineTypeChange(_this.props.AdaptableObject, sparklineType);
                } }) }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: sparklineColumn.MinimumValue != null ? (React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Min Value", onChange: function (e) { return _this.onMinimumValueChanged(e); }, value: sparklineColumn.MinimumValue })) : ('Cell min value') }));
        colItems[3].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: sparklineColumn.MaximumValue != null ? (React.createElement(Input_1.default, { type: 'number', style: { width: '100%' }, placeholder: "Max Value", onChange: function (e) { return _this.onMaximumValueChanged(e); }, value: sparklineColumn.MaximumValue })) : ('Cell max value') }));
        colItems[4].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { style: { width: '100%' }, ColorPalette: this.props.ColorPalette, value: sparklineColumn.LineColor, onChange: function (x) { return _this.onLineColorChanged(x); } }) }));
        colItems[5].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(sparklineColumn); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: !this.props.Column, showDelete: false, EntityType: StrategyConstants.SparklineColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    SparklineColumnEntityRow.prototype.onMinimumValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var minValue = Number(e.value);
            this.props.onMinimumValueChanged(this.props.AdaptableObject, minValue);
        }
    };
    SparklineColumnEntityRow.prototype.onMaximumValueChanged = function (event) {
        var e = event.target;
        if (!isNaN(Number(e.value))) {
            var maxValue = Number(e.value);
            this.props.onMaximumValueChanged(this.props.AdaptableObject, maxValue);
        }
    };
    SparklineColumnEntityRow.prototype.onLineColorChanged = function (event) {
        var e = event.target;
        this.props.onLineColorChanged(this.props.AdaptableObject, e.value);
    };
    return SparklineColumnEntityRow;
}(React.Component));
exports.SparklineColumnEntityRow = SparklineColumnEntityRow;
