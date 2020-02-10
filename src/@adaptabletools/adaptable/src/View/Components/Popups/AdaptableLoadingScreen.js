"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Dialog_1 = require("../../../components/Dialog");
var rebass_1 = require("rebass");
var AdaptableLoadingScreen = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableLoadingScreen, _super);
    function AdaptableLoadingScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptableLoadingScreen.prototype.render = function () {
        return (React.createElement(Dialog_1.default, { modal: true, isOpen: this.props.showLoadingScreen, onDismiss: this.props.onClose, showCloseButton: false, style: {
                minHeight: 'auto',
            } },
            React.createElement(rebass_1.Box, { padding: 3 },
                React.createElement("h4", null, "Initialising Grid"),
                React.createElement("p", null, "Retrieving your settings and setting up the grid..."))));
    };
    return AdaptableLoadingScreen;
}(React.Component));
exports.AdaptableLoadingScreen = AdaptableLoadingScreen;
