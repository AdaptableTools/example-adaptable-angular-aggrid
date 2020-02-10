"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../../components/Dropdown");
var Radio_1 = require("../../../components/Radio");
var CheckBox_1 = require("../../../components/CheckBox");
var Input_1 = require("../../../components/Input");
var HelpBlock_1 = require("../../../components/HelpBlock");
var Panel_1 = require("../../../components/Panel");
var ScheduleScheduleWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleScheduleWizard, _super);
    function ScheduleScheduleWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onOneOffDateChanged = function (event) {
            var e = event.target;
            _this.setState({ OneOffDate: e.value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.state = {
            IsRecurringDate: _this.props.Data.Schedule.OneOffDate == null ? true : false,
            Hour: _this.props.Data.Schedule.Hour,
            Minute: _this.props.Data.Schedule.Minute,
            DaysOfWeek: _this.props.Data.Schedule.DaysOfWeek,
            OneOffDate: _this.props.Data.Schedule.OneOffDate
                ? _this.props.Data.Schedule.OneOffDate
                : new Date(),
        };
        return _this;
    }
    ScheduleScheduleWizard.prototype.render = function () {
        var _this = this;
        var hours = [];
        var i;
        for (i = 0; i < 24; i++) {
            hours.push({
                label: i,
                value: i,
            });
        }
        var minutes = [];
        var j;
        for (j = 0; j < 60; j++) {
            minutes.push({
                label: j,
                value: j,
            });
        }
        return (React.createElement("div", null,
            React.createElement(WizardPanel_1.default, null,
                React.createElement(React.Fragment, null,
                    React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 1 },
                        React.createElement(Panel_1.default, { header: "Schedule Day / Date", marginTop: 2 },
                            React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 1 }, "Choose to run the Schedule on a One Off Date or on a series of Recurring Days"),
                            React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                                React.createElement(Radio_1.default, { marginRight: 3, marginLeft: 2, value: "recurring", checked: this.state.IsRecurringDate == true, onChange: function (checked) { return _this.onRecurringDateChanged(checked); } }, "Recurring Days"),
                                React.createElement(Radio_1.default, { value: "oneoff", checked: this.state.IsRecurringDate == false, onChange: function (checked) { return _this.onRecurringDateChanged(!checked); } }, "One Off Date")),
                            this.state.IsRecurringDate ? (React.createElement(rebass_1.Flex, { flex: 7, marginTop: 2, flexDirection: "row", alignItems: "center" },
                                React.createElement(CheckBox_1.default, { marginLeft: 2, value: Enums_1.DayOfWeek.Monday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Monday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Monday"),
                                React.createElement(CheckBox_1.default, { marginLeft: 3, value: Enums_1.DayOfWeek.Tuesday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Tuesday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Tuesday"),
                                React.createElement(CheckBox_1.default, { marginLeft: 3, value: Enums_1.DayOfWeek.Wednesday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Wednesday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Wednesday"),
                                React.createElement(CheckBox_1.default, { marginLeft: 3, value: Enums_1.DayOfWeek.Thursday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Thursday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Thursday"),
                                React.createElement(CheckBox_1.default, { marginLeft: 3, value: Enums_1.DayOfWeek.Friday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Friday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Friday"),
                                React.createElement(CheckBox_1.default, { marginLeft: 3, value: Enums_1.DayOfWeek.Saturday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Saturday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Saturday"),
                                React.createElement(CheckBox_1.default, { marginLeft: 3, value: Enums_1.DayOfWeek.Sunday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Sunday), onChange: function (checked, e) { return _this.onDayChecked(e); } }, "Sunday"))) : (React.createElement(rebass_1.Flex, { flexDirection: "column" },
                                React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 2 }, "Select Date"),
                                React.createElement(Input_1.default, { style: { maxWidth: 300 }, type: "date", placeholder: "Date", onChange: function (x) { return _this.onOneOffDateChanged(x); }, value: this.state.OneOffDate }))),
                            ' '),
                        React.createElement(Panel_1.default, { header: "Schedule Time", marginTop: 2 },
                            React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 2 }, "Select Hour of Day"),
                            React.createElement(Dropdown_1.default, { placeholder: "select", style: { minWidth: 300 }, value: this.state.Hour, onChange: function (value) { return _this.onHourChanged(value); }, options: hours }),
                            React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 2 }, "Select Minute"),
                            React.createElement(Dropdown_1.default, { placeholder: "select", style: { minWidth: 300 }, value: this.state.Minute, onChange: function (value) { return _this.onMinuteChanged(value); }, options: minutes })))))));
    };
    ScheduleScheduleWizard.prototype.onDayChecked = function (event) {
        var _this = this;
        var e = event.target;
        var dayOfWeek = Number(e.value);
        var daysOfWeek = this.state.DaysOfWeek;
        if (e.checked) {
            daysOfWeek.push(dayOfWeek);
        }
        else {
            var index = daysOfWeek.indexOf(dayOfWeek);
            daysOfWeek.splice(index, 1);
        }
        this.setState({ DaysOfWeek: daysOfWeek }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleScheduleWizard.prototype.onRecurringDateChanged = function (checked) {
        var _this = this;
        this.setState({ IsRecurringDate: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleScheduleWizard.prototype.onHourChanged = function (value) {
        var _this = this;
        this.setState({ Hour: Number(value) }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleScheduleWizard.prototype.onMinuteChanged = function (value) {
        var _this = this;
        this.setState({ Minute: Number(value) }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleScheduleWizard.prototype.canNext = function () {
        if (this.state.Hour == null || this.state.Minute == null) {
            return false;
        }
        if (this.state.IsRecurringDate && ArrayExtensions_1.ArrayExtensions.IsEmpty(this.state.DaysOfWeek)) {
            return false;
        }
        if (!this.state.IsRecurringDate && this.state.OneOffDate == null) {
            return false;
        }
        return true;
    };
    ScheduleScheduleWizard.prototype.canBack = function () {
        return true;
    };
    ScheduleScheduleWizard.prototype.Next = function () {
        var schedule = {
            Hour: this.state.Hour,
            Minute: this.state.Minute,
            OneOffDate: this.state.IsRecurringDate ? null : this.state.OneOffDate,
            DaysOfWeek: this.state.IsRecurringDate ? this.state.DaysOfWeek : [],
        };
        this.props.Data.Schedule = schedule;
    };
    ScheduleScheduleWizard.prototype.Back = function () {
        //todo
    };
    ScheduleScheduleWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ScheduleScheduleWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ScheduleScheduleWizard;
}(React.Component));
exports.ScheduleScheduleWizard = ScheduleScheduleWizard;
