"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var AdaptablePopover_1 = require("../AdaptablePopover");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
var PreviewHelper_1 = require("../../Utilities/Helpers/PreviewHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var Input_1 = require("../../components/Input");
var rebass_1 = require("rebass");
var DropdownButton_1 = require("../../components/DropdownButton");
var SimpleButton_1 = require("../../components/SimpleButton");
var preventDefault = function (e) { return e.preventDefault(); };
var SmartEditPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SmartEditPopupComponent, _super);
    function SmartEditPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isShowingError: false, errorText: '' };
        return _this;
    }
    SmartEditPopupComponent.prototype.componentDidMount = function () {
        this.props.onSmartEditCheckSelectedCells();
    };
    SmartEditPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Click ',
            React.createElement("i", null,
                React.createElement("b", null, "Apply to Grid")),
            ' button to update all selected cells with the values showing in the Preview Results grid.',
            React.createElement("br", null),
            React.createElement("br", null),
            'This value will be calculated based on the Maths operation selected in the dropdown',
            React.createElement("br", null),
            React.createElement("br", null),
            'Smart Edits that break Cell Validation Rules will be flagged and prevented.',
        ];
        var col;
        if (this.props.PreviewInfo) {
            col = ColumnHelper_1.ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns);
        }
        var globalValidationMessage = PreviewHelper_1.PreviewHelper.GetValidationMessage(this.props.PreviewInfo, "" + this.props.SmartEditValue);
        var showPanel = this.props.PreviewInfo && StringExtensions_1.StringExtensions.IsNotNullOrEmpty("" + this.props.SmartEditValue);
        var previewPanel = showPanel ? (React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { style: { flex: '1 1 100%', overflow: 'initial' }, PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: col, ShowPanel: showPanel, ShowHeader: true, ValidationService: this.props.Adaptable.ValidationService })) : null;
        var operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation)
            .filter(function (e) { return e != Enums_1.MathOperation.Replace; })
            .map(function (mathOperation, index) {
            return {
                label: mathOperation,
                onClick: function () {
                    _this.props.onSmartEditOperationChange(mathOperation);
                },
            };
        });
        return (React.createElement(PanelWithImage_1.PanelWithImage, { variant: "primary", header: StrategyConstants.SmartEditStrategyFriendlyName, glyphicon: StrategyConstants.SmartEditGlyph, infoBody: infoBody, bodyScroll: true, onKeyDown: function (e) {
                if (e.key === 'Enter') {
                    _this.submit();
                }
            } },
            React.createElement(rebass_1.Flex, { flexDirection: "row", padding: 2 },
                React.createElement(DropdownButton_1.default, { items: operationMenuItems, columns: ['label'], onMouseDown: preventDefault }, Enums_1.MathOperation[this.props.MathOperation]),
                React.createElement(Input_1.default, { value: this.props.SmartEditValue.toString(), marginLeft: 2, marginRight: 2, type: "number", placeholder: "Enter a Number", onChange: function (e) { return _this.onSmartEditValueChange(e); } }),
                React.createElement(SimpleButton_1.default, { tone: this.getButtonStyle(), variant: "raised", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty("" + this.props.SmartEditValue) ||
                        (this.props.PreviewInfo &&
                            this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), onClick: function () {
                        _this.submit();
                    }, marginRight: 2 }, "Apply to Grid"),
                ' ',
                this.props.PreviewInfo &&
                    this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Error', bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Warning })),
                this.props.PreviewInfo &&
                    !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning &&
                    this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Error', bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Error }))),
            previewPanel));
    };
    SmartEditPopupComponent.prototype.submit = function () {
        this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
            ? this.onConfirmWarningCellValidation()
            : this.onApplySmartEdit();
    };
    SmartEditPopupComponent.prototype.onSmartEditValueChange = function (event) {
        var e = event.target;
        this.props.onSmartEditValueChange(Number(e.value));
    };
    SmartEditPopupComponent.prototype.onApplySmartEdit = function () {
        this.props.onApplySmartEdit();
    };
    SmartEditPopupComponent.prototype.onConfirmWarningCellValidation = function () {
        var confirmAction = SmartEditRedux.SmartEditApply(true);
        var cancelAction = SmartEditRedux.SmartEditApply(false);
        var confirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(confirmAction, cancelAction);
        this.props.onConfirmWarningCellValidation(confirmation);
    };
    SmartEditPopupComponent.prototype.getButtonStyle = function () {
        if (this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return 'neutral';
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ||
                this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return 'error';
            }
        }
        return 'success';
    };
    return SmartEditPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        MathOperation: state.SmartEdit.MathOperation,
        PreviewInfo: state.System.SmartEditPreviewInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSmartEditValueChange: function (value) { return dispatch(SmartEditRedux.SmartEditChangeValue(value)); },
        onSmartEditOperationChange: function (SmartEditOperation) {
            return dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation));
        },
        onSmartEditCheckSelectedCells: function () { return dispatch(SystemRedux.SmartEditCheckCellSelection()); },
        onApplySmartEdit: function () { return dispatch(SmartEditRedux.SmartEditApply(false)); },
        onConfirmWarningCellValidation: function (confirmation) {
            return dispatch(PopupRedux.PopupShowConfirmation(confirmation));
        },
    };
}
exports.SmartEditPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SmartEditPopupComponent);
