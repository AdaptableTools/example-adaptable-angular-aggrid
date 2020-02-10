"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../../components/HelpBlock");
var CheckBox_1 = require("../../../components/CheckBox");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var LayoutSetPivotingWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutSetPivotingWizard, _super);
    function LayoutSetPivotingWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            IsPivotLayout: _this.props.Adaptable.LayoutService.isPivotedLayout(_this.props.Data.PivotDetails),
        };
        return _this;
    }
    LayoutSetPivotingWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "Check the box to create a ",
                React.createElement("b", null, "Pivoted Layout"),
                " (one which uses Aggregation)."),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(CheckBox_1.default, { marginLeft: 2, marginRight: 2, onChange: function (checked) { return _this.onCreatePivotLayoutChanged(checked); }, checked: this.state.IsPivotLayout }, "Create Pivot Layout"),
                ' '),
            this.state.IsPivotLayout && (React.createElement(HelpBlock_1.default, { marginTop: 2 },
                "There are 2 sets of columns that make up a Pivot Layout: ",
                React.createElement("br", null),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Pivot Columns"),
                        ": These are the colums which will form the pivot header.",
                        React.createElement("br", null),
                        " ",
                        React.createElement("br", null)),
                    React.createElement("li", null,
                        React.createElement("b", null, "Aggregation Columns"),
                        ": These are (typically numeric) columns which will be aggregated in the pivot.",
                        React.createElement("br", null),
                        " ",
                        React.createElement("br", null))),
                "These 2 column sets can be created in the next wizard steps.",
                React.createElement("br", null),
                React.createElement("br", null),
                "At least one of these column sets must be provided for the Layout to open in Pivot View.",
                React.createElement("br", null)))));
    };
    LayoutSetPivotingWizard.prototype.onCreatePivotLayoutChanged = function (checked) {
        var _this = this;
        this.setState({ IsPivotLayout: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutSetPivotingWizard.prototype.canNext = function () {
        return true;
    };
    LayoutSetPivotingWizard.prototype.canBack = function () {
        return true;
    };
    LayoutSetPivotingWizard.prototype.Next = function () {
        if (this.state.IsPivotLayout) {
            if (!this.props.Data.PivotDetails) {
                this.props.Data.PivotDetails = ObjectFactory_1.ObjectFactory.CreateEmptyPivotDetails();
            }
        }
        else {
            this.props.Data.PivotDetails = null;
        }
    };
    LayoutSetPivotingWizard.prototype.Back = function () {
        /* no implementation */
    };
    LayoutSetPivotingWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.IsPivotLayout ? 1 : 3;
    };
    LayoutSetPivotingWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutSetPivotingWizard;
}(React.Component));
exports.LayoutSetPivotingWizard = LayoutSetPivotingWizard;
