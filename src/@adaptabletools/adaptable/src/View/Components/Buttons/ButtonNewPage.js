"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonNewPage = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonNewPage, _super);
    function ButtonNewPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonNewPage.prototype.render = function () {
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "New Page", iconSize: 20, icon: "newpage" // arrow-up
            , variant: "text" }, this.props)));
    };
    return ButtonNewPage;
}(React.Component));
exports.ButtonNewPage = ButtonNewPage;
