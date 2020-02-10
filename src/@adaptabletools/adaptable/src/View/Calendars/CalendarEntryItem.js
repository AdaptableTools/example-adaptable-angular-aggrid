"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var CalendarEntryItem = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarEntryItem, _super);
    function CalendarEntryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarEntryItem.prototype.render = function () {
        var colItems = [];
        colItems.push({ Size: 6, Content: this.props.CalendarEntry.HolidayName });
        colItems.push({
            Size: 6,
            Content: new Date(this.props.CalendarEntry.HolidayDate).toDateString(),
        });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return CalendarEntryItem;
}(React.Component));
exports.CalendarEntryItem = CalendarEntryItem;
