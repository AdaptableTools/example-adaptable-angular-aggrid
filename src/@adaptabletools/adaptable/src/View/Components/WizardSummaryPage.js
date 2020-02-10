"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryRow_1 = require("./WizardSummaryRow");
var AdaptableObjectCollection_1 = require("./AdaptableObjectCollection");
var WizardPanel_1 = require("../../components/WizardPanel");
var WizardSummaryPage = /** @class */ (function (_super) {
    tslib_1.__extends(WizardSummaryPage, _super);
    function WizardSummaryPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardSummaryPage.prototype.render = function () {
        var colItems = [
            { Content: 'Property', Size: 3 },
            { Content: 'Value', Size: 9 },
        ];
        var summaryRows = [];
        this.props.KeyValuePairs.forEach(function (kvp, index) {
            summaryRows.push(React.createElement(WizardSummaryRow_1.WizardSummaryRow, { key: index, colItems: colItems, propertyName: kvp.Key, propertyValue: kvp.Value }));
        });
        return (React.createElement(WizardPanel_1.default, { bodyProps: { padding: 0 } },
            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: summaryRows })));
    };
    return WizardSummaryPage;
}(React.Component));
exports.WizardSummaryPage = WizardSummaryPage;
