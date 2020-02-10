"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ColorPicker_1 = require("../ColorPicker");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var CheckBox_1 = require("../../components/CheckBox");
var Dropdown_1 = require("../../components/Dropdown");
var FlashingCellEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(FlashingCellEntityRow, _super);
    function FlashingCellEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlashingCellEntityRow.prototype.render = function () {
        var _this = this;
        var flashingCell = this.props.AdaptableObject;
        var durations = this.props.FlashingCellDurations.map(function (flashingCellDuration) {
            return {
                label: _this.getFriendlyFlashingDuration(flashingCellDuration),
                value: flashingCellDuration,
            };
        });
        if (!this.props.FlashingCellDurations.find(function (x) { return x == flashingCell.FlashingCellDuration; })) {
            durations.push({
                value: flashingCell.FlashingCellDuration,
                label: this.getFriendlyFlashingDuration(flashingCell.FlashingCellDuration),
            });
        }
        var isDisabled = false; // TODO:  need to get from Entitlements !  flashingCell.IsReadOnly
        var column = ColumnHelper_1.ColumnHelper.getColumnFromId(flashingCell.ColumnId, this.props.Columns);
        if (!column) {
            return null;
        }
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(CheckBox_1.default, { disabled: isDisabled, onChange: function () { return _this.props.onSelect(flashingCell); }, checked: flashingCell.IsLive }) }));
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: column.FriendlyName });
        colItems[2].Content = (React.createElement(Dropdown_1.default, { disabled: isDisabled, showEmptyItem: false, showClearButton: false, value: flashingCell.FlashingCellDuration, onChange: function (x) { return _this.onActionChange(x); }, options: durations }));
        colItems[3].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, disabled: isDisabled, value: flashingCell.UpColor, onChange: function (x) { return _this.onUpColorChange(x); } }) }));
        colItems[4].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, disabled: isDisabled, value: flashingCell.DownColor, onChange: function (x) { return _this.onDownColorChange(x); } }) }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    FlashingCellEntityRow.prototype.onActionChange = function (value) {
        this.props.onChangeFlashingDuration(this.props.AdaptableObject, Number.parseInt(value));
    };
    FlashingCellEntityRow.prototype.onDownColorChange = function (event) {
        var e = event.target;
        this.props.onChangeDownColorFlashingCell(this.props.AdaptableObject, e.value);
    };
    FlashingCellEntityRow.prototype.onUpColorChange = function (event) {
        var e = event.target;
        this.props.onChangeUpColorFlashingCell(this.props.AdaptableObject, e.value);
    };
    FlashingCellEntityRow.prototype.getFriendlyFlashingDuration = function (duration) {
        switch (duration) {
            case 250:
                return '1/4 Second';
            case 500:
                return '1/2 Second';
            case 750:
                return '3/4 Second';
            case 1000:
                return '1 Second';
            default:
                return String(typeof duration === 'number' ? duration : 'unknown') + ' ms';
        }
    };
    return FlashingCellEntityRow;
}(React.Component));
exports.FlashingCellEntityRow = FlashingCellEntityRow;
