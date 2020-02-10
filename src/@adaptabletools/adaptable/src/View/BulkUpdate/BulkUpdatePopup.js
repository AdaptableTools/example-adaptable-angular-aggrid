"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var BulkUpdateRedux = require("../../Redux/ActionsReducers/BulkUpdateRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var AdaptablePopover_1 = require("../AdaptablePopover");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var UIHelper_1 = require("../UIHelper");
var PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
var PreviewHelper_1 = require("../../Utilities/Helpers/PreviewHelper");
var ColumnValueSelector_1 = require("../Components/Selectors/ColumnValueSelector");
var CheckBox_1 = require("../../components/CheckBox");
var rebass_1 = require("rebass");
var Input_1 = require("../../components/Input");
var SimpleButton_1 = require("../../components/SimpleButton");
var HelpBlock_1 = require("../../components/HelpBlock");
var BulkUpdatePopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BulkUpdatePopupComponent, _super);
    function BulkUpdatePopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isShowingError: false, errorText: '', useSelector: false };
        return _this;
    }
    BulkUpdatePopupComponent.prototype.componentDidMount = function () {
        this.props.onBulkUpdateValueChange('');
        this.props.onBulkUpdateCheckSelectedCells();
    };
    BulkUpdatePopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Click ',
            React.createElement("i", null,
                React.createElement("b", null, "Apply to Grid")),
            ' button to update all selected cells with the value that you specify',
            React.createElement("br", null),
            React.createElement("br", null),
            'Edits that break Cell Validation Rules will be flagged and prevented.',
        ];
        var col = this.props.BulkUpdateValidationResult.Column;
        var hasDataTypeError = false;
        var dataTypeErrorMessage = '';
        if (col && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
            // check that the update value is a number for a numeric column.  not issue for dates as we dont allow free text
            if (col.DataType == Enums_1.DataType.Number) {
                if (isNaN(Number(this.props.BulkUpdateValue))) {
                    hasDataTypeError = true;
                    dataTypeErrorMessage = 'This column only accepts numbers';
                }
            }
        }
        var globalValidationMessage = PreviewHelper_1.PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.BulkUpdateValue);
        var showPanel = this.props.PreviewInfo &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(globalValidationMessage);
        var previewPanel = showPanel ? (React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: col, ShowPanel: showPanel, ShowHeader: true, ValidationService: this.props.Adaptable.ValidationService })) : null;
        if (!col) {
            return null;
        }
        return (React.createElement(PanelWithImage_1.PanelWithImage, { header: StrategyConstants.BulkUpdateStrategyFriendlyName, glyphicon: StrategyConstants.BulkUpdateGlyph, infoBody: infoBody, variant: "primary", bodyProps: { padding: 2 }, style: { height: '100%' } },
            col.DataType == Enums_1.DataType.Date ? (React.createElement(React.Fragment, null,
                React.createElement(HelpBlock_1.default, { marginTop: 2, marginBottom: 2 }, "Enter a date value. Alternatively, tick the checkbox and select from an existing column value."),
                React.createElement(rebass_1.Box, null,
                    React.createElement(CheckBox_1.default, { marginLeft: 2, onChange: function (checked) { return _this.onUseColumnValuesSelectorChanged(checked); }, checked: this.state.useSelector },
                        ' ',
                        "Select from existing column values")),
                React.createElement(rebass_1.Flex, { padding: 2, flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", flex: 1, marginRight: 2 }, this.state.useSelector ? (React.createElement(ColumnValueSelector_1.ColumnValueSelector, { SelectedColumnValue: this.props.BulkUpdateValue, SelectedColumn: col, Adaptable: this.props.Adaptable, onColumnValueChange: function (columns) { return _this.onColumnValueSelectedChanged(columns); }, AllowNew: false, style: { width: '100%', maxWidth: 'inherit' } })) : (React.createElement(Input_1.default, { style: { width: '100%' }, value: String(this.props.BulkUpdateValue), type: UIHelper_1.UIHelper.getDescriptionForDataType(col.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(col.DataType), onChange: function (e) { return _this.onBulkUpdateValueChange(e); } }))),
                    React.createElement(SimpleButton_1.default, { disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                            this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent, onClick: function () {
                            _this.onApplyClick();
                        }, variant: "raised", tone: "accent" }, "Apply to Grid")))) : (React.createElement(React.Fragment, null,
                React.createElement(HelpBlock_1.default, { marginTop: 2, marginBottom: 2 }, "Select an existing column value from the dropdown, or enter a new value"),
                React.createElement(rebass_1.Flex, { marginTop: 2, flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", flex: 1, marginRight: 2 },
                        React.createElement(ColumnValueSelector_1.ColumnValueSelector, { SelectedColumnValue: this.props.BulkUpdateValue, SelectedColumn: col, Adaptable: this.props.Adaptable, onColumnValueChange: function (columns) { return _this.onColumnValueSelectedChanged(columns); }, style: { width: '100%', maxWidth: 'inherit' } })),
                    React.createElement(SimpleButton_1.default, { disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                            this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent ||
                            hasDataTypeError, variant: "raised", tone: "accent", marginRight: 2, onClick: function () {
                            _this.onApplyClick();
                        } }, "Apply to Grid"),
                    ' ',
                    hasDataTypeError && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Update Error', bodyText: [dataTypeErrorMessage], MessageType: Enums_1.MessageType.Error })),
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
                        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Error', bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Warning })),
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
                        !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning &&
                        this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Error', bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Error }))))),
            previewPanel));
    };
    BulkUpdatePopupComponent.prototype.onColumnValueSelectedChanged = function (selectedColumnValue) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    };
    BulkUpdatePopupComponent.prototype.onUseColumnValuesSelectorChanged = function (checked) {
        this.setState({ useSelector: checked });
        this.props.onBulkUpdateValueChange('');
    };
    BulkUpdatePopupComponent.prototype.onBulkUpdateValueChange = function (event) {
        var e = event.target;
        this.props.onBulkUpdateValueChange(e.value);
    };
    BulkUpdatePopupComponent.prototype.onApplyClick = function () {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
            ? this.onConfirmWarningCellValidation()
            : this.onApplyBulkUpdate();
    };
    BulkUpdatePopupComponent.prototype.onApplyBulkUpdate = function () {
        this.props.onApplyBulkUpdate();
    };
    BulkUpdatePopupComponent.prototype.onConfirmWarningCellValidation = function () {
        var confirmAction = BulkUpdateRedux.BulkUpdateApply(true);
        var cancelAction = BulkUpdateRedux.BulkUpdateApply(false);
        var confirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(confirmAction, cancelAction);
        this.props.onConfirmWarningCellValidation(confirmation);
    };
    return BulkUpdatePopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.System.BulkUpdatePreviewInfo,
        BulkUpdateValidationResult: state.System.BulkUpdateValidationResult,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onBulkUpdateValueChange: function (value) {
            return dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value));
        },
        onBulkUpdateCheckSelectedCells: function () { return dispatch(SystemRedux.BulkUpdateCheckCellSelection()); },
        onApplyBulkUpdate: function () { return dispatch(BulkUpdateRedux.BulkUpdateApply(false)); },
        onConfirmWarningCellValidation: function (confirmation) {
            return dispatch(PopupRedux.PopupShowConfirmation(confirmation));
        },
    };
}
exports.BulkUpdatePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BulkUpdatePopupComponent);
