"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var SimpleButton_1 = require("../../components/SimpleButton");
var Radio_1 = require("../../components/Radio");
var CalendarsEntryRow = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarsEntryRow, _super);
    function CalendarsEntryRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarsEntryRow.prototype.render = function () {
        var _this = this;
        var colItems = [];
        colItems.push({
            Size: 3,
            Content: (React.createElement(Radio_1.default, { name: "calendar", checked: this.props.Calendar.Name == this.props.CurrentCalendar })),
        });
        colItems.push({ Size: 5, Content: this.props.Calendar.Name });
        colItems.push({
            Size: 3,
            Content: (React.createElement(SimpleButton_1.default, { onClick: function (e) {
                    e.stopPropagation();
                    _this.props.onShowInformation(_this.props.Calendar);
                }, tooltip: "Show Calendar Dates", iconPosition: "end", icon: "info", tone: "accent", variant: "raised" }, 'Calendar Details ')),
        });
        return (React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems, style: { width: '100%', cursor: 'pointer' }, onClick: function () { return _this.props.onSelect(_this.props.Calendar); } }));
    };
    return CalendarsEntryRow;
}(React.Component));
exports.CalendarsEntryRow = CalendarsEntryRow;
