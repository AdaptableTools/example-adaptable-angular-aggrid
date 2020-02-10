"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var refresh_1 = require("../../../components/icons/refresh");
var Waiting = /** @class */ (function (_super) {
    tslib_1.__extends(Waiting, _super);
    function Waiting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Waiting.prototype.render = function () {
        var _a = this.props, WaitingMessage = _a.WaitingMessage, props = tslib_1.__rest(_a, ["WaitingMessage"]);
        return (React.createElement(rebass_1.Flex, tslib_1.__assign({ flexDirection: "column", marginTop: 2, marginBottom: 2 }, props),
            React.createElement(rebass_1.Flex, { flexDirection: "row", justifyContent: "center" },
                React.createElement(refresh_1.default, null)),
            React.createElement(rebass_1.Flex, { flexDirection: "row", justifyContent: "center" },
                React.createElement("h5", null, WaitingMessage))));
    };
    return Waiting;
}(React.Component));
exports.Waiting = Waiting;
