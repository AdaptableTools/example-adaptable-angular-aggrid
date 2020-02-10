"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableObjectRow_1 = require("./AdaptableObjectRow");
var WizardSummaryRow = /** @class */ (function (_super) {
    tslib_1.__extends(WizardSummaryRow, _super);
    function WizardSummaryRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardSummaryRow.prototype.render = function () {
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = this.props.propertyName;
        colItems[1].Content = this.props.propertyValue;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems, fontSize: 'medium' });
    };
    return WizardSummaryRow;
}(React.Component));
exports.WizardSummaryRow = WizardSummaryRow;
