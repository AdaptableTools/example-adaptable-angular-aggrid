"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardLegend_1 = require("./WizardLegend");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var Dialog_1 = require("../../components/Dialog");
var SimpleButton_1 = require("../../components/SimpleButton");
var Panel_1 = require("../../components/Panel");
var DummyActiveStep = /** @class */ (function () {
    function DummyActiveStep() {
    }
    DummyActiveStep.prototype.canNext = function () {
        return false;
    };
    DummyActiveStep.prototype.canBack = function () {
        return false;
    };
    DummyActiveStep.prototype.Next = function () {
        // no implementation for this
    };
    DummyActiveStep.prototype.Back = function () {
        // no implementation for this
    };
    DummyActiveStep.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    DummyActiveStep.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return DummyActiveStep;
}());
//Remark : the component doesnt handle the change of props once displayed... It's easy to do but not sure it's needed
//as in the top component we do the render with a ternary expression so we add/remove the element from the render instead of having a property
//Show/hide.
var AdaptableWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableWizard, _super);
    function AdaptableWizard(props) {
        var _this = _super.call(this, props) || this;
        //we need to init with a dummy one as Ref is a callback once the component is rendered. So once set we force Re render....
        //I have no idea so far how to do it differently
        _this.ActiveStep = new DummyActiveStep();
        var indexStart = 0;
        if (_this.props.StepStartIndex) {
            indexStart = _this.props.StepStartIndex;
        }
        var BodyElement = _this.props.Steps[indexStart].Element;
        _this.stepName = _this.props.Steps[indexStart].StepName;
        var newElement = _this.cloneWizardStep(BodyElement);
        _this.state = { ActiveState: newElement, IndexState: indexStart };
        return _this;
    }
    AdaptableWizard.prototype.render = function () {
        var _this = this;
        var wizardStepNames = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(this.props.Steps.map(function (x) {
            return x.StepName;
        }));
        return (React.createElement(Dialog_1.default, { modal: true, isOpen: true, showCloseButton: false, onDismiss: function () { return (_this.props.onHide ? _this.props.onHide() : null); } },
            React.createElement(rebass_1.Flex, { flexDirection: "column", style: { height: '100%', width: '70vw', maxWidth: 800, maxHeight: '80vh' } },
                React.createElement(Panel_1.default, { header: this.props.FriendlyName, border: "none", className: "ab-WizardDialog__steps", borderRadius: "none", variant: "primary", style: { flex: 'none' } },
                    React.createElement(WizardLegend_1.WizardLegend, { StepNames: wizardStepNames, ActiveStepName: this.stepName, FriendlyName: '', CanShowAllSteps: this.canFinishWizard(), onStepButtonClicked: function (s) { return _this.onStepButtonClicked(s); } })),
                React.createElement(rebass_1.Flex, { style: { flex: 1, overflow: 'auto' }, flexDirection: "column" }, this.state.ActiveState),
                React.createElement(rebass_1.Flex, { flexDirection: "row", padding: 2, backgroundColor: "primary", alignItems: "center", className: "ab-WizardDialog__footer" },
                    React.createElement(SimpleButton_1.default, { tone: "neutral", variant: "text", onClick: function () { return _this.props.onHide(); }, tooltip: "Close wizard", AccessLevel: Enums_1.AccessLevel.Full }, "CLOSE"),
                    React.createElement("div", { style: { flex: 1 } }),
                    React.createElement(SimpleButton_1.default, { variant: "outlined", disabled: !this.ActiveStep.canBack() || this.isFirstStep(), onClick: function () { return _this.handleClickBack(); }, icon: "arrow-left", AccessLevel: Enums_1.AccessLevel.Full }, "Back"),
                    React.createElement(SimpleButton_1.default, { variant: "outlined", disabled: !this.ActiveStep.canNext() || this.isLastStep(), onClick: function () { return _this.handleClickNext(); }, icon: "arrow-right", iconPosition: "end", AccessLevel: Enums_1.AccessLevel.Full, marginLeft: 2, marginRight: 2 }, "Next"),
                    React.createElement(SimpleButton_1.default, { tone: "accent", variant: "raised", disabled: !this.canFinishWizard(), onClick: function () { return _this.handleClickFinish(); }, icon: 'check', AccessLevel: Enums_1.AccessLevel.Full }, "Finish")))));
    };
    AdaptableWizard.prototype.onStepButtonClicked = function (stepName) {
        var wizardStepInfo = this.props.Steps.find(function (s) { return s.StepName == stepName; });
        var bodyElement = wizardStepInfo.Element;
        var newElement = this.cloneWizardStep(bodyElement);
        this.stepName = wizardStepInfo.StepName;
        this.setState({ ActiveState: newElement, IndexState: wizardStepInfo.Index });
    };
    AdaptableWizard.prototype.ForceUpdateGoBackState = function () {
        this.forceUpdate();
    };
    AdaptableWizard.prototype.isLastStep = function () {
        return this.state.IndexState == this.props.Steps.length - 1;
    };
    AdaptableWizard.prototype.isFirstStep = function () {
        return this.state.IndexState == 0;
    };
    AdaptableWizard.prototype.canFinishWizard = function () {
        return this.ActiveStep.canNext() && this.props.canFinishWizard();
    };
    AdaptableWizard.prototype.handleClickBack = function () {
        if (!this.isFirstStep()) {
            if (this.ActiveStep.canBack()) {
                var decrement = this.ActiveStep.GetIndexStepDecrement();
                this.ActiveStep.Back();
                var activeWizardInfo = this.props.Steps[this.state.IndexState - decrement];
                var bodyElement = activeWizardInfo.Element;
                var newElement = this.cloneWizardStep(bodyElement);
                this.stepName = activeWizardInfo.StepName;
                this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - decrement });
            }
        }
    };
    AdaptableWizard.prototype.handleClickNext = function () {
        if (this.ActiveStep.canNext()) {
            var increment = this.ActiveStep.GetIndexStepIncrement();
            this.ActiveStep.Next();
            var activeWizardInfo = this.props.Steps[this.state.IndexState + increment];
            var bodyElement = activeWizardInfo.Element;
            var newElement = this.cloneWizardStep(bodyElement);
            this.stepName = activeWizardInfo.StepName;
            this.setState({ ActiveState: newElement, IndexState: this.state.IndexState + increment });
        }
    };
    AdaptableWizard.prototype.handleClickFinish = function () {
        if (this.ActiveStep.canNext()) {
            this.ActiveStep.Next();
            if (this.props.onFinish) {
                this.props.onFinish();
            }
            this.props.onHide();
        }
    };
    //So we inject everything needed for the Wizard
    AdaptableWizard.prototype.cloneWizardStep = function (step) {
        var _this = this;
        return React.cloneElement(step, {
            ref: function (Element) {
                _this.ActiveStep = Element;
                _this.forceUpdate();
            },
            Data: this.props.Data,
            UpdateGoBackState: function () { return _this.ForceUpdateGoBackState(); },
            Adaptable: this.props.Adaptable,
            Columns: this.props.Columns,
        });
    };
    return AdaptableWizard;
}(React.Component));
exports.AdaptableWizard = AdaptableWizard;
