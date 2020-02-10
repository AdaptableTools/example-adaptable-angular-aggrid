"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Dialog_1 = require("./Dialog");
var FlexWithFooter_1 = require("./FlexWithFooter");
var PopupWithFooter = /** @class */ (function (_super) {
    tslib_1.__extends(PopupWithFooter, _super);
    function PopupWithFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupWithFooter.prototype.render = function () {
        var _a = this.props, showModal = _a.showModal, onHide = _a.onHide, footer = _a.footer, dialogProps = tslib_1.__rest(_a, ["showModal", "onHide", "footer"]);
        return (React.createElement(Dialog_1.default, tslib_1.__assign({}, dialogProps, { isOpen: showModal, onDismiss: onHide, showCloseButton: false, padding: 0 }),
            React.createElement(FlexWithFooter_1.default, { flexDirection: "column", style: {
                    height: '100%',
                    maxHeight: '90vh',
                    width: '70vw',
                    maxWidth: 800,
                }, footer: footer, footerProps: {
                    padding: 2,
                    backgroundColor: 'primary',
                    className: 'ab-Popup__footer',
                }, children: this.props.children })));
    };
    return PopupWithFooter;
}(React.Component));
exports.PopupWithFooter = PopupWithFooter;
