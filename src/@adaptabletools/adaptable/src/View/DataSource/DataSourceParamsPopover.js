"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Panel_1 = require("../../components/Panel");
var DataSourceParamsPopover = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceParamsPopover, _super);
    function DataSourceParamsPopover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourceParamsPopover.prototype.render = function () {
        return React.createElement(Panel_1.default, { header: '' }, "Going to put Data Source Params here");
    };
    return DataSourceParamsPopover;
}(React.Component));
exports.DataSourceParamsPopover = DataSourceParamsPopover;
