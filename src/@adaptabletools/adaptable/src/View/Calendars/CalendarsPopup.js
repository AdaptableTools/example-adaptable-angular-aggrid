"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var CalendarsRedux = require("../../Redux/ActionsReducers/CalendarRedux");
var CalendarsEntryRow_1 = require("./CalendarsEntryRow");
var CalendarEntryItem_1 = require("./CalendarEntryItem");
var PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var ListGroup_1 = require("../../components/List/ListGroup");
var SimpleButton_1 = require("../../components/SimpleButton");
var rebass_1 = require("rebass");
var Panel_1 = require("../../components/Panel");
var Dialog_1 = require("../../components/Dialog");
var CalendarsPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarsPopupComponent, _super);
    function CalendarsPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { DisplayedCalendar: null, DisplayedYear: 2017 };
        return _this;
    }
    CalendarsPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Choose which region Holiday Calendars you wish to use.',
            React.createElement("br", null),
            React.createElement("br", null),
            'These are used primarily when calculating Working Days.',
        ];
        var allCalenderColItems = [
            { Content: 'Current', Size: 3 },
            { Content: 'Calendar', Size: 5 },
            { Content: 'Details', Size: 3 },
        ];
        var allCalendars = this.props.AvailableCalendars.map(function (calendar) {
            return (React.createElement(CalendarsEntryRow_1.CalendarsEntryRow, { Calendar: calendar, key: calendar.Name, onSelect: function (calendar) { return _this.props.onSelectCalendar(calendar); }, onShowInformation: function (calendar) { return _this.onShowInformation(calendar); }, CurrentCalendar: _this.props.CurrentCalendar }));
        });
        var calenderEntryColItems = [
            { Content: 'Holiday Name', Size: 6 },
            { Content: 'Date', Size: 6 },
        ];
        var displayedCalendarModalBody = this.state.DisplayedCalendar == null
            ? null
            : this.state.DisplayedCalendar.CalendarEntries.map(function (calendarEntry) {
                return (React.createElement(CalendarEntryItem_1.CalendarEntryItem, { CalendarEntry: calendarEntry, key: calendarEntry.HolidayName + calendarEntry.HolidayDate }));
            });
        return (React.createElement(PanelWithImage_1.PanelWithImage, { header: StrategyConstants.CalendarStrategyFriendlyName, variant: "primary", glyphicon: StrategyConstants.CalendarGlyph, infoBody: infoBody },
            React.createElement(PanelWithRow_1.PanelWithRow, { colItems: allCalenderColItems, borderRadius: "none", border: "none", className: "ab_preview_panel" }),
            React.createElement(ListGroup_1.default, null, allCalendars),
            this.state.DisplayedCalendar && (React.createElement(Dialog_1.default, { modal: true, isOpen: this.state.DisplayedCalendar != null, onDismiss: function () { return _this.closeInformationModal(); } },
                React.createElement(Panel_1.default, { bodyProps: { padding: 0 }, bodyScroll: true, border: "none", borderRadius: "none", header: React.createElement("div", null,
                        "Calendar Details: ",
                        this.state.DisplayedCalendar.Name) },
                    React.createElement(rebass_1.Flex, { flexDirection: "column", flex: 1, style: { overflow: 'auto', maxHeight: '60vh', minWidth: '300px' } },
                        React.createElement(PanelWithRow_1.PanelWithRow, { style: { flex: 1 }, bodyProps: { padding: 0 }, bodyScroll: true, border: "none", borderRadius: "none", colItems: calenderEntryColItems, variant: "primary" }),
                        displayedCalendarModalBody),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", padding: 2 },
                        React.createElement("div", { style: { flex: 1 } }),
                        React.createElement(SimpleButton_1.default, { className: "ab_right_modal_button", onClick: function () { return _this.closeInformationModal(); } }, "Close")))))));
    };
    CalendarsPopupComponent.prototype.closeInformationModal = function () {
        this.setState({ DisplayedCalendar: null });
    };
    CalendarsPopupComponent.prototype.onShowInformation = function (calendar) {
        this.setState({ DisplayedCalendar: calendar });
    };
    CalendarsPopupComponent.prototype.onClickCalendarYear = function (calendarYear) {
        if (this.state.DisplayedYear == calendarYear) {
            this.setState({ DisplayedYear: 0 });
        }
        else {
            this.setState({ DisplayedYear: calendarYear });
        }
    };
    return CalendarsPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CurrentCalendar: state.Calendar.CurrentCalendar,
        AvailableCalendars: state.System.AvailableCalendars,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectCalendar: function (calendar) {
            return dispatch(CalendarsRedux.CalendarSelect(calendar.Name));
        },
    };
}
exports.CalendarsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CalendarsPopupComponent);
