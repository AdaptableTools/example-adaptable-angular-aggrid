"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PopupContext = React.createContext({
    hidePopup: function () { },
});
exports.usePopupContext = function () {
    return React.useContext(PopupContext);
};
exports.default = PopupContext;
