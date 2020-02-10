"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var SimpleButton_1 = require("../../components/SimpleButton");
var AdaptableHelper_1 = require("../../Utilities/Helpers/AdaptableHelper");
var CustomToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomToolbarControlComponent, _super);
    function CustomToolbarControlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var showGlyphicon = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.CustomToolbar.Glyph);
        var contentsDivId = 'ab-CustomToolbar__' + this.props.CustomToolbar.Name + '__contents';
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-CustomToolbar ab-DashboardToolbar__Custom", headerText: this.props.CustomToolbar.Title, showConfigureButton: false, showGlyphIcon: showGlyphicon, glyphicon: this.props.CustomToolbar.Glyph, onClose: function () { return _this.props.onClose(_this.props.CustomToolbar.Name); } },
            React.createElement("div", { id: contentsDivId, className: "CustomToolBarContents ab-CustomToolbar__contents ab-CustomToolbar__contents--render", style: { minHeight: 22 } }),
            React.createElement("div", { id: "ab-CustomToolbar__buttons", className: "ab-CustomToolbar__buttons", style: { minHeight: 22 } }, this.props.CustomToolbar.ToolbarButtons &&
                this.props.CustomToolbar.ToolbarButtons.map(function (button, index) {
                    var toolbarButtonClickedInfo = {
                        toolbarButton: button,
                    };
                    var toolbarButtonClickedEventArgs = AdaptableHelper_1.default.createFDC3Message('Toolbar Button Clicked Args', toolbarButtonClickedInfo);
                    var buttonVariant = button.ButtonStyle && button.ButtonStyle.Variant
                        ? button.ButtonStyle.Variant
                        : 'outlined';
                    var buttonTone = button.ButtonStyle && button.ButtonStyle.Tone ? button.ButtonStyle.Tone : 'neutral';
                    return (React.createElement(SimpleButton_1.default, { style: { marginLeft: index ? 'var(--ab-space-1)' : 0 }, key: button.Name, variant: buttonVariant, tone: buttonTone, onClick: function () {
                            _this.props.Adaptable.api.eventApi.emit('ToolbarButtonClicked', toolbarButtonClickedEventArgs);
                        } }, button.Caption));
                }))));
    };
    return CustomToolbarControlComponent;
}(React.Component));
function mapStateToProps() {
    return {
    // CustomToolbars: state.Dashboard.CustomToolbars,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClose: function (customToolbarName) {
            return dispatch(DashboardRedux.DashboardHideToolbar(customToolbarName));
        },
    };
}
exports.CustomToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CustomToolbarControlComponent);
