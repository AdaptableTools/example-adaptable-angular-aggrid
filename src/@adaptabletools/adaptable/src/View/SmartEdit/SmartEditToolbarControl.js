"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ButtonApply_1 = require("../Components/Buttons/ButtonApply");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var AdaptablePopover_1 = require("../AdaptablePopover");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var UIHelper_1 = require("../UIHelper");
var DropdownButton_1 = require("../../components/DropdownButton");
var rebass_1 = require("rebass");
var Input_1 = require("../../components/Input");
var SmartEditToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SmartEditToolbarControlComponent, _super);
    function SmartEditToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            SelectedColumnId: '',
        };
        return _this;
    }
    SmartEditToolbarControlComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable._on('CellsSelected', function () {
                _this.props.onSmartEditCheckSelectedCells();
            });
        }
    };
    SmartEditToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var statusColour = this.getStatusColour();
        var selectedColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)
            ? ColumnHelper_1.ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns)
            : null;
        var previewPanel = (React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: selectedColumn, ShowPanel: true, ShowHeader: false, ValidationService: this.props.Adaptable.ValidationService }));
        var operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation)
            .filter(function (e) { return e != Enums_1.MathOperation.Replace; })
            .map(function (mathOperation, index) {
            return {
                onClick: function () { return _this.props.onSmartEditOperationChange(mathOperation); },
                label: mathOperation,
            };
        });
        var applyButtonStyle = {
            color: statusColour,
            fill: 'currentColor',
        };
        var shouldDisable = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ||
            !this.props.IsValidSelection ||
            this.props.Adaptable.api.internalApi.isGridInPivotMode();
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: shouldDisable ? GeneralConstants.READ_ONLY_STYLE : '' },
            React.createElement(DropdownButton_1.default, { className: "ab-DashboardToolbar__SmartEdit__select", marginRight: 2, items: operationMenuItems, columns: ['label'], disabled: shouldDisable }, this.props.MathOperation),
            React.createElement(Input_1.default, { style: {
                    width: '5rem',
                }, className: "ab-DashboardToolbar__SmartEdit__select-value", value: this.props.SmartEditValue.toString(), type: "number", placeholder: "Enter a Number", step: "any", onChange: function (e) { return _this.onSmartEditValueChange(e); }, disabled: shouldDisable }),
            !shouldDisable && (React.createElement(ButtonApply_1.ButtonApply, { marginLeft: 2, onClick: function () { return _this.onApplyClick(); }, style: applyButtonStyle, className: "ab-DashboardToolbar__SmartEdit__apply", tooltip: "Apply Smart Edit", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty("" + this.props.SmartEditValue) ||
                    (this.props.PreviewInfo != null &&
                        this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), AccessLevel: this.props.AccessLevel })),
            !shouldDisable && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "Preview Results", className: "ab-DashboardToolbar__SmartEdit__info", 
                //  tooltipText="Preview Results"
                bodyText: [previewPanel], MessageType: UIHelper_1.UIHelper.getMessageTypeByStatusColour(statusColour), useButton: true, showEvent: 'focus', hideEvent: "blur" }))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__SmartEdit", headerText: StrategyConstants.SmartEditStrategyFriendlyName, glyphicon: StrategyConstants.SmartEditGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.SmartEditStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    SmartEditToolbarControlComponent.prototype.onSmartEditValueChange = function (event) {
        var e = event.target;
        this.props.onSmartEditValueChange(Number(e.value));
    };
    SmartEditToolbarControlComponent.prototype.getStatusColour = function () {
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
    SmartEditToolbarControlComponent.prototype.onApplyClick = function () {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
            ? this.onConfirmWarningCellValidation()
            : this.onApplySmartEdit();
    };
    SmartEditToolbarControlComponent.prototype.onConfirmWarningCellValidation = function () {
        var confirmAction = SmartEditRedux.SmartEditApply(true);
        var cancelAction = SmartEditRedux.SmartEditApply(false);
        var confirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(confirmAction, cancelAction);
        this.props.onConfirmWarningCellValidation(confirmation);
    };
    SmartEditToolbarControlComponent.prototype.onApplySmartEdit = function () {
        this.props.onApplySmartEdit();
    };
    return SmartEditToolbarControlComponent;
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
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.SmartEditStrategyId, ScreenPopups.SmartEditPopup));
        },
    };
}
exports.SmartEditToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SmartEditToolbarControlComponent);
