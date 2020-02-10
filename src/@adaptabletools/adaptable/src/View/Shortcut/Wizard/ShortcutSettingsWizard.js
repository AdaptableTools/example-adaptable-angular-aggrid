"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var CalendarConstants = require("../../../Utilities/Constants/CalendarConstants");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Dropdown_1 = require("../../../components/Dropdown");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var Radio_1 = require("../../../components/Radio");
var ShortcutSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutSettingsWizard, _super);
    function ShortcutSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.changeContent = function (e) {
            _this.setState({ ShortcutResult: e.target.value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.state = {
            ShortcutKey: _this.props.Data.ShortcutKey,
            ShortcutResult: _this.props.Data.ShortcutResult == null ? '' : _this.props.Data.ShortcutResult,
            ShortcutOperation: _this.props.Data.ShortcutOperation,
            IsDynamic: _this.props.Data.IsDynamic,
        };
        return _this;
    }
    ShortcutSettingsWizard.prototype.onClickShortcutOperation = function (shortcutOperation) {
        var _this = this;
        this.setState({
            ShortcutOperation: shortcutOperation,
            ShortcutResult: this.state.ShortcutResult,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    ShortcutSettingsWizard.prototype.render = function () {
        var _this = this;
        // sort out keys
        var keyList = this.props.Data.ColumnType == Enums_1.DataType.Number
            ? this.props.NumericKeysAvailable
            : this.props.DateKeysAvailable;
        var optionKeys = keyList.map(function (x) {
            return {
                value: x,
                label: x,
            };
        });
        // sort out actions
        var optionActions = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation)
            .filter(function (name) { return name != Enums_1.MathOperation.Replace; })
            .map(function (enumName) {
            return {
                value: enumName,
                label: enumName,
            };
        });
        var currentActionValue = this.state.ShortcutOperation;
        var currentKeyValue = !this.state.ShortcutKey ? 'select' : this.state.ShortcutKey;
        var currentDynamicResult = this.state.ShortcutResult != '' ? this.state.ShortcutResult : 'select';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Key:"),
                React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                    React.createElement(Dropdown_1.default, { placeholder: "Select Key", style: { flex: 1, maxWidth: 'none' }, value: currentKeyValue, onChange: function (x) { return _this.onShortcutKeyChanged(x); }, marginRight: 3, options: optionKeys }),
                    React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Shortcut: Key', bodyText: ['The keyboard key that, when pressed, triggers the shortcut.'] }))),
            this.props.Data.ColumnType == Enums_1.DataType.Number ? (React.createElement(React.Fragment, null,
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Operation:"),
                    React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                        React.createElement(Dropdown_1.default, { style: { flex: 1, maxWidth: 'none' }, placeholder: "select", showEmptyItem: false, showClearButton: false, value: currentActionValue, marginRight: 3, onChange: function (x) { return _this.onShortcutOperationChanged(x); }, options: optionActions }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Shortcut: Operation', bodyText: [
                                "The mathematical operation that is peformed on the cell's current value - using the shortcut's 'value' - in order to calculate the new total for the cell.",
                            ] }))),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Value:"),
                    React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                        React.createElement(Input_1.default, { style: { flex: 1 }, type: "number", placeholder: "Enter Number", onChange: this.changeContent, value: this.state.ShortcutResult, marginRight: 3 }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Shortcut: Value', bodyText: [
                                "The number that is used - together with the shortcut's mathmetical 'operation' and the current cell value - in order to calculate the new total for the cell.",
                            ] }))))) : (React.createElement(React.Fragment, null,
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Date Type:"),
                    React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                        React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "row", alignItems: "center", marginRight: 3 },
                            React.createElement(Radio_1.default, { value: "custom", checked: this.state.IsDynamic == false, onChange: function (_, e) { return _this.onDynamicSelectChanged(e); }, marginRight: 2 }, "Custom"),
                            React.createElement(Radio_1.default, { value: "dynamic", checked: this.state.IsDynamic == true, onChange: function (_, e) { return _this.onDynamicSelectChanged(e); } }, "Dynamic")),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Shortcut: Date Type', bodyText: [
                                React.createElement("b", null, "Custom dates"),
                                " are 'real' dates chosen by the user.",
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("b", null, "Dynamic dates"),
                                " are predefined dates that come with Adaptable and are re-evaluated each day (e.g. 'Today').",
                                React.createElement("br", null),
                                React.createElement("br", null),
                                'Dynamic dates that use working days are based on the current holiday calendar.',
                            ] }))),
                this.state.IsDynamic == true ? (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Dynamic Date:"),
                    React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                        React.createElement(Dropdown_1.default, { placeholder: "Select Dynamic Date", style: { flex: 1, maxWidth: 'none' }, value: currentDynamicResult, onChange: function (x) { return _this.onDynamicResultChanged(x); }, options: [
                                { value: CalendarConstants.TODAY, label: 'Today' },
                                { value: CalendarConstants.YESTERDAY, label: 'Yesterday' },
                                { value: CalendarConstants.TOMORROW, label: 'Tomorrow' },
                                {
                                    value: CalendarConstants.PREVIOUS_WORK_DAY,
                                    label: 'Previous Work Day',
                                },
                                {
                                    value: CalendarConstants.NEXT_WORK_DAY,
                                    label: 'Next Work Day',
                                },
                            ], marginRight: 3 }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Shortcut: Dynamic Date', bodyText: [
                                "The dynamic date that becomes the cell's new value when the shortcut is triggered.",
                            ] })))) : (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Custom Date:"),
                    React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                        React.createElement(Input_1.default, { type: "date", style: { flex: 1 }, placeholder: "Shortcut Result", onChange: this.changeContent, value: this.state.ShortcutResult, marginRight: 3 }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Shortcut: Custom Date', bodyText: [
                                "The date that becomes the cell's new value when the shortcut is triggered.",
                            ] }))))))));
    };
    ShortcutSettingsWizard.prototype.onShortcutKeyChanged = function (value) {
        var _this = this;
        this.setState({ ShortcutKey: value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ShortcutSettingsWizard.prototype.onShortcutOperationChanged = function (value) {
        var _this = this;
        this.setState({ ShortcutOperation: value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ShortcutSettingsWizard.prototype.onDynamicResultChanged = function (value) {
        var _this = this;
        this.setState({ ShortcutResult: value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ShortcutSettingsWizard.prototype.onDynamicSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ IsDynamic: e.value == 'dynamic' }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ShortcutSettingsWizard.prototype.canNext = function () {
        if (this.state.IsDynamic && this.state.ShortcutResult == 'select') {
            return false;
        }
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ShortcutResult) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ShortcutKey) &&
            this.state.ShortcutKey != 'select');
    };
    ShortcutSettingsWizard.prototype.canBack = function () {
        return true;
    };
    ShortcutSettingsWizard.prototype.Next = function () {
        this.props.Data.ShortcutResult = this.state.ShortcutResult;
        this.props.Data.ShortcutOperation = this.state.ShortcutOperation;
        this.props.Data.ShortcutKey = this.state.ShortcutKey;
        this.props.Data.IsDynamic = this.state.IsDynamic;
    };
    ShortcutSettingsWizard.prototype.Back = function () {
        /* no implementation required   */
    };
    ShortcutSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ShortcutSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ShortcutSettingsWizard;
}(React.Component));
exports.ShortcutSettingsWizard = ShortcutSettingsWizard;
