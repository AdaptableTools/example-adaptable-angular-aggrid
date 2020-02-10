"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ButtonApply_1 = require("../Components/Buttons/ButtonApply");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var AdaptablePopover_1 = require("../AdaptablePopover");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var UIHelper_1 = require("../UIHelper");
var rebass_1 = require("rebass");
var Input_1 = require("../../components/Input");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var Dropdown_1 = require("../../components/Dropdown");
var SmartEditToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SmartEditToolPanelComponent, _super);
    function SmartEditToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            SelectedColumnId: '',
            IsMinimised: true,
        };
        return _this;
    }
    SmartEditToolPanelComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable._on('CellsSelected', function () {
                _this.props.onSmartEditCheckSelectedCells();
            });
        }
    };
    SmartEditToolPanelComponent.prototype.render = function () {
        var _this = this;
        var statusColour = this.getStatusColour();
        var selectedColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)
            ? ColumnHelper_1.ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns)
            : null;
        var previewPanel = (React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: selectedColumn, ShowPanel: true, ShowHeader: false, ValidationService: this.props.Adaptable.ValidationService }));
        var operations = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation)
            .filter(function (e) { return e != Enums_1.MathOperation.Replace; })
            .map(function (operation, index) {
            return {
                label: operation,
                value: operation,
            };
        });
        var applyButtonStyle = {
            color: statusColour,
            fill: 'currentColor',
        };
        var shouldDisable = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ||
            !this.props.IsValidSelection ||
            this.props.Adaptable.api.internalApi.isGridInPivotMode();
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: "ab-ToolPanel__SmartEdit__wrap" },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__SmartEdit__wrap" },
                React.createElement(Dropdown_1.default, { style: { minWidth: 90 }, showEmptyItem: false, className: "ab-ToolPanel__SmartEdit__select", value: this.props.MathOperation, options: operations, showClearButton: false, onChange: function (mathOperation) { return _this.onchangeMathOperation(mathOperation); } }),
                React.createElement(Input_1.default, { style: {
                        width: '5rem',
                    }, className: "ab-ToolPanel__SmartEdit__select-value", value: this.props.SmartEditValue.toString(), type: "number", placeholder: "Enter a Number", step: "any", onChange: function (e) { return _this.onSmartEditValueChange(e); }, disabled: shouldDisable })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__SmartEdit_wrap" },
                !shouldDisable && (React.createElement(ButtonApply_1.ButtonApply, { marginLeft: 2, onClick: function () { return _this.onApplyClick(); }, style: applyButtonStyle, className: "ab-ToolPanel__SmartEdit__apply", tooltip: "Apply Smart Edit", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty("" + this.props.SmartEditValue) ||
                        (this.props.PreviewInfo != null &&
                            this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), AccessLevel: this.props.AccessLevel }, "Edit")),
                !shouldDisable && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "Preview Results", className: "ab-ToolPanel__SmartEdit__info", 
                    //  tooltipText="Preview Results"
                    bodyText: [previewPanel], MessageType: UIHelper_1.UIHelper.getMessageTypeByStatusColour(statusColour), useButton: true, showEvent: 'focus', hideEvent: "blur" })))));
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__SmartEdit", headerText: StrategyConstants.SmartEditStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('SmartEdit'); } }, this.state.IsMinimised ? null : content));
    };
    SmartEditToolPanelComponent.prototype.onSmartEditValueChange = function (event) {
        var e = event.target;
        this.props.onSmartEditValueChange(Number(e.value));
    };
    SmartEditToolPanelComponent.prototype.getStatusColour = function () {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty("" + this.props.SmartEditValue) &&
            this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return Enums_1.StatusColour.Red;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ||
                this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return Enums_1.StatusColour.Amber;
            }
        }
        return Enums_1.StatusColour.Green;
    };
    SmartEditToolPanelComponent.prototype.onApplyClick = function () {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
            ? this.onConfirmWarningCellValidation()
            : this.onApplySmartEdit();
    };
    SmartEditToolPanelComponent.prototype.onConfirmWarningCellValidation = function () {
        var confirmAction = SmartEditRedux.SmartEditApply(true);
        var cancelAction = SmartEditRedux.SmartEditApply(false);
        var confirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(confirmAction, cancelAction);
        this.props.onConfirmWarningCellValidation(confirmation);
    };
    SmartEditToolPanelComponent.prototype.onchangeMathOperation = function (mathOperation) {
        this.props.onSmartEditOperationChange(mathOperation);
    };
    SmartEditToolPanelComponent.prototype.onApplySmartEdit = function () {
        this.props.onApplySmartEdit();
    };
    return SmartEditToolPanelComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        MathOperation: state.SmartEdit.MathOperation,
        IsValidSelection: state.System.IsValidSmartEditSelection,
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
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.SmartEditStrategyId, ScreenPopups.SmartEditPopup));
        },
    };
}
exports.SmartEditToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SmartEditToolPanelComponent);
