"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var UpdatedRowRedux = require("../../Redux/ActionsReducers/UpdatedRowRedux");
var CheckBox_1 = require("../../components/CheckBox");
var rebass_1 = require("rebass");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var HelpBlock_1 = require("../../components/HelpBlock");
var ColorPicker_1 = require("../ColorPicker");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var UpdatedRowPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UpdatedRowPopupComponent, _super);
    function UpdatedRowPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            EnableUpdatedRow: _this.props.UpdatedRowState.EnableUpdatedRow,
            JumpToRow: _this.props.UpdatedRowState.JumpToRow,
            UpColor: _this.props.UpdatedRowState.UpColor,
            DownColor: _this.props.UpdatedRowState.DownColor,
            NeutralColor: _this.props.UpdatedRowState.NeutralColor,
            MaxItems: _this.props.UpdatedRowState.MaxUpdatedRowsInStore,
        };
        return _this;
    }
    UpdatedRowPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Highlight updated rows by selecting the back color (depending on direction)',
            React.createElement("br", null),
            React.createElement("br", null),
            "Choose whether the grid should 'jump' to the row that has changed.",
            React.createElement("br", null),
            React.createElement("br", null),
            'Clear any updated rows through the Context Menu.',
        ];
        var enableUpdatedRowOption = (React.createElement(rebass_1.Box, null,
            React.createElement(CheckBox_1.default, { marginLeft: 2, onChange: function () { return _this.onenableUpdatedRowChanged(); }, checked: this.state.EnableUpdatedRow }, "Enable Updated Row")));
        var enableJumpToRowOption = (React.createElement(rebass_1.Box, null,
            React.createElement(CheckBox_1.default, { marginLeft: 2, onChange: function () { return _this.onEnableJumpToRowChanged(); }, checked: this.state.JumpToRow }, "Jump to Updated Row in Grid (after update)")));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithImage_1.PanelWithImage, { variant: "primary", header: StrategyConstants.UpdatedRowStrategyFriendlyName, glyphicon: StrategyConstants.UpdatedRowGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                enableUpdatedRowOption,
                enableJumpToRowOption,
                React.createElement(rebass_1.Flex, { flexDirection: "column", margin: 1 },
                    React.createElement(HelpBlock_1.default, null,
                        "Select the back colour for an updated row. Select colours for when the change in value is ",
                        React.createElement("b", null, "Up"),
                        ", ",
                        React.createElement("b", null, "Down"),
                        " and ",
                        React.createElement("b", null, "non-directional"),
                        "."),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", margin: 2 },
                        React.createElement(rebass_1.Text, { marginRight: 4 }, "Up Direction Change Color:"),
                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.UpColor, onChange: function (x) { return _this.onUpColorSelectChange(x); } })),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", margin: 2 },
                        React.createElement(rebass_1.Text, { marginRight: 3 }, "Down Direction Change Color:"),
                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.DownColor, onChange: function (x) { return _this.onDownColorSelectChange(x); } })),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", margin: 2 },
                        React.createElement(rebass_1.Text, { marginRight: 4 }, "No Direction Change Color:"),
                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.NeutralColor, onChange: function (x) { return _this.onNeutralColorSelectChange(x); } }))))));
    };
    UpdatedRowPopupComponent.prototype.onenableUpdatedRowChanged = function () {
        var newEnabledValue = !this.state.EnableUpdatedRow;
        this.setState({ EnableUpdatedRow: newEnabledValue });
        this.props.onEnableDisableUpdatedRow(newEnabledValue);
    };
    UpdatedRowPopupComponent.prototype.onEnableJumpToRowChanged = function () {
        var newEnabledValue = !this.state.JumpToRow;
        this.setState({ JumpToRow: newEnabledValue });
        this.props.onEnableDisableJumpToRow(newEnabledValue);
    };
    UpdatedRowPopupComponent.prototype.onUpColorSelectChange = function (event) {
        var e = event.target;
        var upColor = e.value;
        this.setState({ UpColor: upColor });
        this.props.onSetUpColor(upColor);
    };
    UpdatedRowPopupComponent.prototype.onDownColorSelectChange = function (event) {
        var e = event.target;
        var downColor = e.value;
        this.setState({ DownColor: downColor });
        this.props.onSetDownColor(downColor);
    };
    UpdatedRowPopupComponent.prototype.onNeutralColorSelectChange = function (event) {
        var e = event.target;
        var neutralColor = e.value;
        this.setState({ NeutralColor: neutralColor });
        this.props.onSetNeutralColor(neutralColor);
    };
    UpdatedRowPopupComponent.prototype.onMaxItemsChanged = function (event) {
        var e = event.target;
        var maxItems = StringExtensions_1.default.IsNullOrEmpty(e.value) ? Infinity : parseInt(e.value);
        this.setState({ MaxItems: maxItems });
        this.props.onSetMaxItems(maxItems);
    };
    return UpdatedRowPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        UpdatedRowState: state.UpdatedRow,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onEnableDisableUpdatedRow: function (shouldEnable) {
            return dispatch(UpdatedRowRedux.UpdatedRowEnableDisable(shouldEnable));
        },
        onEnableDisableJumpToRow: function (shouldEnable) {
            return dispatch(UpdatedRowRedux.JumpToRowEnableDisable(shouldEnable));
        },
        onSetUpColor: function (upColor) { return dispatch(UpdatedRowRedux.UpColorSet(upColor)); },
        onSetDownColor: function (downColor) { return dispatch(UpdatedRowRedux.DownColorSet(downColor)); },
        onSetNeutralColor: function (neutralColor) {
            return dispatch(UpdatedRowRedux.NeutralColorSet(neutralColor));
        },
        onSetMaxItems: function (maxItems) { return dispatch(UpdatedRowRedux.MaxItemsSet(maxItems)); },
    };
}
exports.UpdatedRowPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(UpdatedRowPopupComponent);
/*
took out as not working properly

 <HelpBlock>
              Set the maximum number of updated rows that can be displayed at any time. Leave empty
              to be infinite.
            </HelpBlock>
<Flex flexDirection="row" alignItems="center" margin={2}>
              <Text style={{ flex: 2 }} marginRight={2}>
                Max Updated Rows:
              </Text>

              <Flex flex={7} flexDirection="row" alignItems="center">
                <Input
                  style={{ flex: 1 }}
                  type="number"
                  placeholder="Enter Number"
                  onChange={(x: any) => this.onMaxItemsChanged(x)}
                  value={this.state.MaxItems}
                  marginRight={3}
                />
              </Flex>
            </Flex>

            */
