"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var IPushPullRedux = require("../../Redux/ActionsReducers/IPushPullRedux");
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
var Dropdown_1 = require("../../components/Dropdown");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var IPushPullAddPageComponent = function (props) {
    var _a = tslib_1.__read(React.useState({
        Folder: '',
        Page: '',
        AvailablePages: GeneralConstants_1.EMPTY_ARRAY,
        ErrorMessage: '',
    }), 2), state = _a[0], setState = _a[1];
    var hidePopup = PopupContext_1.usePopupContext().hidePopup;
    var onSubmit = function () {
        if (ArrayExtensions_1.default.ContainsItem(state.AvailablePages, state.Page)) {
            setState(tslib_1.__assign(tslib_1.__assign({}, state), { ErrorMessage: 'A page with that name already exists in the folder' }));
        }
        else {
            props.onAddPage(state.Folder, state.Page);
        }
    };
    var onPageNameChange = function (event) {
        var e = event.target;
        setState(tslib_1.__assign(tslib_1.__assign({}, state), { Page: e.value }));
    };
    var onFolderChanged = function (folderName) {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(folderName) && folderName !== 'Select Folder') {
            var avaialablePages = props.IPushPullDomainsPages.find(function (f) { return f.Name == folderName; }).Pages;
            setState({
                Folder: folderName,
                AvailablePages: avaialablePages,
                Page: GeneralConstants_1.EMPTY_STRING,
                ErrorMessage: GeneralConstants_1.EMPTY_STRING,
            });
        }
        else {
            setState({
                Folder: GeneralConstants_1.EMPTY_STRING,
                AvailablePages: [],
                Page: GeneralConstants_1.EMPTY_STRING,
                ErrorMessage: GeneralConstants_1.EMPTY_STRING,
            });
        }
    };
    var availableFolders = props.IPushPullDomainsPages.map(function (iPushPullDomain) {
        return {
            label: iPushPullDomain.Name,
            value: iPushPullDomain.Name,
        };
    });
    return (React.createElement(PanelWithImage_1.PanelWithImage, { header: "Add ipushpull Page", glyphicon: "newpage", variant: "primary", style: { height: '100%' } },
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
                React.createElement(SimpleButton_1.default, { tone: "accent", variant: "raised", type: "submit", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(state.Folder) ||
                        StringExtensions_1.StringExtensions.IsNullOrEmpty(state.Page), icon: 'check' }, "Add Page")) },
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2, margin: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Select a folder and then choose the name of the new ipushpull page it should contain."),
                React.createElement(FormLayout_1.default, { margin: 3 },
                    React.createElement(FormLayout_1.FormRow, { label: "Folder:" },
                        React.createElement(Dropdown_1.default, { disabled: availableFolders.length == 0, style: { minWidth: '50%' }, options: availableFolders, className: "ab-Popup__IPushPull__select", onChange: function (folder) { return onFolderChanged(folder); }, value: state.Folder ? state.Folder : null, placeholder: "Select Folder", marginRight: 2 })),
                    React.createElement(FormLayout_1.FormRow, { label: "Page" },
                        React.createElement(Input_1.default, { width: "50%", type: "text", placeholder: "Page Name", value: state.Page, onChange: onPageNameChange })),
                    state.ErrorMessage ? (React.createElement(FormLayout_1.FormRow, { label: "" },
                        React.createElement(ErrorBox_1.default, null, state.ErrorMessage))) : null)))));
};
function mapStateToProps(state) {
    return {
        IPushPullDomainsPages: state.IPushPull.IPushPullDomainsPages,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPage: function (folder, page) {
            return dispatch(IPushPullRedux.IPushPullAddPage(folder, page));
        },
        onCancel: function () {
            dispatch(PopupRedux.PopupHideScreen());
        },
    };
}
exports.IPushPullAddPagePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(IPushPullAddPageComponent);
