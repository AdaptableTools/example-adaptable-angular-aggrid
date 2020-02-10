"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var _ = require("lodash");
var react_redux_1 = require("react-redux");
var QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var ColorPicker_1 = require("../ColorPicker");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var CheckBox_1 = require("../../components/CheckBox");
var rebass_1 = require("rebass");
var Panel_1 = require("../../components/Panel");
var FormLayout_1 = require("../../components/FormLayout");
var HelpBlock_1 = require("../../components/HelpBlock");
var Radio_1 = require("../../components/Radio");
var AdaptableFormControlTextClear_1 = require("../Components/Forms/AdaptableFormControlTextClear");
var QuickSearchPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearchPopupComponent, _super);
    function QuickSearchPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.debouncedRunQuickSearch = _.debounce(function () { return _this.props.onRunQuickSearch(_this.state.EditedQuickSearchText); }, 250);
        _this.state = { EditedQuickSearchText: '', EditedStyle: null };
        return _this;
    }
    QuickSearchPopupComponent.prototype.componentDidMount = function () {
        this.setState({
            EditedQuickSearchText: this.props.QuickSearchText,
            EditedStyle: this.props.QuickSearchStyle,
        });
    };
    QuickSearchPopupComponent.prototype.handleQuickSearchTextChange = function (text) {
        this.setState({ EditedQuickSearchText: text });
        this.debouncedRunQuickSearch();
    };
    QuickSearchPopupComponent.prototype.onDisplayTypeChange = function (value) {
        this.props.onSetSearchDisplayType(value);
    };
    QuickSearchPopupComponent.prototype.onUseBackColorCheckChange = function (checked) {
        var style = this.state.EditedStyle;
        style.BackColor = checked
            ? this.props.QuickSearchStyle.BackColor
                ? this.props.QuickSearchStyle.BackColor
                : GeneralConstants_1.QUICK_SEARCH_DEFAULT_BACK_COLOR
            : null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    };
    QuickSearchPopupComponent.prototype.onUseForeColorCheckChange = function (checked) {
        var style = this.state.EditedStyle;
        style.ForeColor = checked
            ? this.props.QuickSearchStyle.ForeColor
                ? this.props.QuickSearchStyle.ForeColor
                : GeneralConstants_1.QUICK_SEARCH_DEFAULT_FORE_COLOR
            : null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    };
    QuickSearchPopupComponent.prototype.onBackColorSelectChange = function (event) {
        var e = event.target;
        var style = this.state.EditedStyle;
        style.BackColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    };
    QuickSearchPopupComponent.prototype.onForeColorSelectChange = function (event) {
        var e = event.target;
        var style = this.state.EditedStyle;
        style.ForeColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    };
    QuickSearchPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Run a simple text search across all visible cells in Adaptable.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).',
            React.createElement("br", null),
            React.createElement("br", null),
            'For a more powerful, multi-column, saveable search with a wide range of options, use ',
            React.createElement("i", null, "Advanced Search"),
            '.',
        ];
        var DisplayActions = EnumExtensions_1.EnumExtensions.getNames(Enums_1.DisplayAction).map(function (enumName) {
            return {
                label: _this.getTextForDisplayAction(enumName),
                value: enumName,
            };
        });
        return (React.createElement(PanelWithImage_1.PanelWithImage, { variant: "primary", header: StrategyConstants.QuickSearchStrategyFriendlyName, glyphicon: StrategyConstants.QuickSearchGlyph, infoBody: infoBody, bodyProps: { padding: 2 } },
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: 'Search For:' },
                    React.createElement(AdaptableFormControlTextClear_1.AdaptableFormControlTextClear, { type: "text", placeholder: "Quick Search Text", value: this.state.EditedQuickSearchText, OnTextChange: function (x) { return _this.handleQuickSearchTextChange(x); } }))),
            React.createElement(Panel_1.default, { header: "Quick Search Behaviour", style: { height: 'auto' }, variant: "default", borderRadius: "none", marginTop: 3 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Choose what happens to those cells that match the Quick Search text:"),
                React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                    React.createElement(Radio_1.default, { value: "HighlightCell", checked: this.props.DisplayAction == Enums_1.DisplayAction.HighlightCell, onChange: function () { return _this.onDisplayTypeChange(Enums_1.DisplayAction.HighlightCell); } }, "Highlight any matching cells in the Grid"),
                    React.createElement(Radio_1.default, { value: "ShowRow", checked: this.props.DisplayAction == Enums_1.DisplayAction.ShowRow, onChange: function () { return _this.onDisplayTypeChange(Enums_1.DisplayAction.ShowRow); } }, "Only display rows which contain matching cells"),
                    React.createElement(Radio_1.default, { value: "ShowRowAndHighlightCell", checked: this.props.DisplayAction == Enums_1.DisplayAction.ShowRowAndHighlightCell, onChange: function () { return _this.onDisplayTypeChange(Enums_1.DisplayAction.ShowRowAndHighlightCell); } }, "Highlight any matching cells and only display rows that contain them"))),
            React.createElement(Panel_1.default, { header: "Quick Search Options", style: { height: 'auto' }, variant: "default", borderRadius: "none", marginTop: 3 },
                React.createElement(FormLayout_1.default, { columns: ['label', 2, 3] },
                    React.createElement(FormLayout_1.FormRow, { label: "Set Back Colour:" },
                        React.createElement(rebass_1.Flex, { alignItems: "center" },
                            React.createElement(CheckBox_1.default, { value: "existing", checked: this.props.QuickSearchStyle.BackColor ? true : false, onChange: function (checked) { return _this.onUseBackColorCheckChange(checked); }, marginRight: 3, marginLeft: 2 }),
                            this.props.QuickSearchStyle.BackColor != null && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.props.QuickSearchStyle.BackColor, onChange: function (x) { return _this.onBackColorSelectChange(x); } })))),
                    React.createElement(FormLayout_1.FormRow, { label: "Set Fore Colour:" },
                        React.createElement(rebass_1.Flex, { alignItems: "center" },
                            React.createElement(CheckBox_1.default, { marginRight: 3, marginLeft: 2, value: "existing", checked: this.props.QuickSearchStyle.ForeColor ? true : false, onChange: function (checked) { return _this.onUseForeColorCheckChange(checked); } }),
                            this.props.QuickSearchStyle.ForeColor != null && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.props.QuickSearchStyle.ForeColor, onChange: function (x) { return _this.onForeColorSelectChange(x); } }))))))));
    };
    QuickSearchPopupComponent.prototype.getTextForDisplayAction = function (displayAction) {
        switch (displayAction) {
            case Enums_1.DisplayAction.HighlightCell:
                return 'Highlight Cells Only';
            case Enums_1.DisplayAction.ShowRow:
                return 'Show Matching Rows Only';
            case Enums_1.DisplayAction.ShowRowAndHighlightCell:
                return 'Highlight Cells & Show Matching Rows';
        }
    };
    return QuickSearchPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        DisplayAction: state.QuickSearch.DisplayAction,
        QuickSearchStyle: state.QuickSearch.Style,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onRunQuickSearch: function (quickSearchText) {
            return dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText));
        },
        onSetSearchDisplayType: function (searchDisplayType) {
            return dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType));
        },
        onSetStyle: function (style) { return dispatch(QuickSearchRedux.QuickSearchSetStyle(style)); },
    };
}
exports.QuickSearchPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QuickSearchPopupComponent);
