"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var icons_1 = require("../../components/icons");
var StrategyProfile = /** @class */ (function (_super) {
    tslib_1.__extends(StrategyProfile, _super);
    function StrategyProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StrategyProfile.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(icons_1.Icon, { name: StrategyConstants.getGhyphiconForStrategyId(this.props.FunctionName), style: {
                    fill: 'var(--ab-color-text-on-primary)',
                } }),
            ' ',
            StrategyConstants.getFriendlyNameForStrategyId(this.props.FunctionName)));
    };
    return StrategyProfile;
}(React.Component));
exports.StrategyProfile = StrategyProfile;
