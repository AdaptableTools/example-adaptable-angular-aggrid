"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var react_1 = require("react");
var Dialog_1 = require("../../../components/Dialog");
var Panel_1 = require("../../../components/Panel");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ColumnsList_1 = require("./ColumnsList");
var FormLayout_1 = require("../../../components/FormLayout");
var Input_1 = require("../../../components/Input");
var ConfigurationForm_1 = require("./ConfigurationForm");
var Helper_1 = require("../../../Utilities/Helpers/Helper");
var ConfigurationDialog = function (props) {
    var _a = tslib_1.__read(react_1.useState(props.adaptableOptions), 2), abOptions = _a[0], setABOptions = _a[1];
    var _b = tslib_1.__read(react_1.useState(true), 2), finishEnabled = _b[0], setFinishEnabled = _b[1];
    var _c = tslib_1.__read(react_1.useState(0), 2), currentStep = _c[0], setCurrentStep = _c[1];
    var canFinish = finishEnabled;
    if (!abOptions.adaptableId) {
        canFinish = false;
    }
    var canNext = canFinish && currentStep === 0;
    var columnsHandle = React.useRef();
    var onadaptableIdChange = function (event) {
        var newABOptions = tslib_1.__assign({}, abOptions);
        newABOptions.adaptableId = event.target.value;
        setABOptions(newABOptions);
    };
    var onFinish = function () {
        var newABOptions = tslib_1.__assign({}, abOptions);
        newABOptions.vendorGrid = tslib_1.__assign({}, abOptions.vendorGrid);
        // do the auto size??
        newABOptions.vendorGrid.columnDefs = columnsHandle.current.getColumns().map(function (c) {
            var col = tslib_1.__assign(tslib_1.__assign({}, c), { headerName: c.caption || Helper_1.humanize(c.field) });
            delete col.caption;
            return col;
        });
        newABOptions.primaryKey = columnsHandle.current.getPrimaryKey();
        setABOptions(newABOptions);
        props.onFinish(newABOptions);
    };
    var onNext = function () {
        setCurrentStep(1);
    };
    var stepOne = (React.createElement(React.Fragment, null,
        React.createElement(Panel_1.default, { header: 'Configure adaptable', border: "none", bodyScroll: true, bodyProps: { padding: 0 }, borderRadius: "none", style: { flex: 1, overflow: 'auto' } },
            React.createElement(ColumnsList_1.default, { handle: columnsHandle, onValidityChange: function (valid) {
                    setFinishEnabled(valid);
                }, columns: abOptions.vendorGrid.columnDefs })),
        React.createElement(Panel_1.default, { border: "none" },
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: "adaptable ID" },
                    React.createElement(Input_1.default, { value: abOptions.adaptableId, onChange: onadaptableIdChange }))))));
    var stepTwo = (React.createElement(React.Fragment, null,
        React.createElement(Panel_1.default, { header: 'Configure adaptable', border: "none", style: { flex: 1, overflow: 'auto' } },
            React.createElement(ConfigurationForm_1.default, { adaptableOptions: abOptions, onChangeadaptableOptions: function (abOptions) {
                    setABOptions(abOptions);
                } }))));
    return (React.createElement(Dialog_1.default, { modal: true, isOpen: true, showCloseButton: false },
        React.createElement(rebass_1.Flex, { flexDirection: "column", style: {
                height: '100%',
                width: '80vw',
                maxWidth: 900,
                maxHeight: '80vh',
            } },
            currentStep === 0 ? stepOne : stepTwo,
            React.createElement(rebass_1.Flex, { flexDirection: "row", padding: 2, backgroundColor: "primary", alignItems: "center" },
                React.createElement(SimpleButton_1.default, { tone: "neutral", variant: "text", tooltip: "Cancel configuration ", onClick: props.onCancel }, "Cancel"),
                React.createElement("div", { style: { flex: 1 } }),
                React.createElement(SimpleButton_1.default, { variant: "outlined", onClick: function () { return setCurrentStep(0); }, disabled: currentStep === 0, marginRight: 2, tone: "neutral" }, "Back"),
                React.createElement(SimpleButton_1.default, { variant: "outlined", onClick: onNext, disabled: !canNext, marginRight: 2, tone: "neutral" }, "Next"),
                React.createElement(SimpleButton_1.default, { tone: "accent", variant: "raised", icon: 'check', onClick: onFinish, disabled: !canFinish }, "Finish")))));
};
exports.default = ConfigurationDialog;
