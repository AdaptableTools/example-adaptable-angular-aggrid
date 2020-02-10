"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var Glue42Redux = require("../../Redux/ActionsReducers/Glue42Redux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var FormLayout_1 = require("../../components/FormLayout");
var Input_1 = require("../../components/Input");
var SimpleButton_1 = require("../../components/SimpleButton");
var FlexWithFooter_1 = require("../../components/FlexWithFooter");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var PopupContext_1 = require("../Components/Popups/PopupContext");
var ErrorBox_1 = require("../../components/ErrorBox");
var HelpBlock_1 = require("../../components/HelpBlock");
var rebass_1 = require("rebass");
var Glue42LoginComponent = function (props) {
    var _a = tslib_1.__read(React.useState({
        Login: props.glue42Login || '',
        Password: props.glue42Password || '',
    }), 2), state = _a[0], setState = _a[1];
    var hidePopup = PopupContext_1.usePopupContext().hidePopup;
    var onSubmit = function () {
        props.onLogin(state.Login || '', state.Password || '');
    };
    var onLoginChange = function (event) {
        var e = event.target;
        setState(tslib_1.__assign(tslib_1.__assign({}, state), { Login: e.value }));
    };
    var onPasswordChange = function (event) {
        var e = event.target;
        setState(tslib_1.__assign(tslib_1.__assign({}, state), { Password: e.value }));
    };
    return (React.createElement(PanelWithImage_1.PanelWithImage, { header: "Glue42 Login Details", glyphicon: "login", variant: "primary", style: { height: '100%' } },
        React.createElement(FlexWithFooter_1.default, { as: "form", onSubmit: function (e) {
                e.preventDefault();
                onSubmit();
            }, footerProps: {
                fontSize: 'var(--ab-font-size-4)',
            }, footer: React.createElement(React.Fragment, null,
                React.createElement(SimpleButton_1.default, { tone: "neutral", variant: "text", tooltip: "Close", onClick: function (e) {
                        e.stopPropagation();
                        hidePopup();
                    } }, "CLOSE"),
                React.createElement("div", { style: { flex: 1 } }),
                React.createElement(SimpleButton_1.default, { tone: "accent", variant: "raised", type: "submit", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(state.Password), icon: 'check' }, "Login")) },
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2, margin: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Login to Glue42 using your login and password."),
                React.createElement(FormLayout_1.default, { margin: 3 },
                    React.createElement(FormLayout_1.FormRow, { label: "Glue42 login:" },
                        React.createElement(Input_1.default, { width: "100%", type: "text", placeholder: "Username", value: state.Login, onChange: onLoginChange })),
                    React.createElement(FormLayout_1.FormRow, { label: "Glue42 password:" },
                        React.createElement(Input_1.default, { width: "100%", type: "password", placeholder: "Password", value: state.Password, onChange: onPasswordChange })),
                    props.glue42LoginErrorMessage ? (React.createElement(FormLayout_1.FormRow, { label: "" },
                        React.createElement(ErrorBox_1.default, null, props.glue42LoginErrorMessage))) : null)))));
};
function mapStateToProps(state) {
    return {
        glue42Login: state.Glue42 ? state.Glue42.Username : undefined,
        glue42Password: state.Glue42 ? state.Glue42.Password : undefined,
        glue42LoginErrorMessage: state.Glue42.Glue42LoginErrorMessage,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onLogin: function (login, password) {
            return dispatch(Glue42Redux.Glue42Login(login, password));
        },
        onCancel: function () {
            dispatch(PopupRedux.PopupHideScreen());
            dispatch(Glue42Redux.Glue42SetLoginErrorMessage(''));
        },
    };
}
exports.Glue42LoginPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Glue42LoginComponent);
