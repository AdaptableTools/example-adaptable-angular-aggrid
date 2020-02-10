"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityRowItem = /** @class */ (function (_super) {
    tslib_1.__extends(EntityRowItem, _super);
    function EntityRowItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityRowItem.prototype.render = function () {
        return React.createElement("span", null,
            " ",
            this.props.Content);
    };
    return EntityRowItem;
}(React.Component));
exports.EntityRowItem = EntityRowItem;
