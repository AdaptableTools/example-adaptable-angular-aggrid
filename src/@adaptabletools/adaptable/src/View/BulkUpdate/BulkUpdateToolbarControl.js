"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var BulkUpdateRedux = require("../../Redux/ActionsReducers/BulkUpdateRedux");
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
var PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
var UIHelper_1 = require("../UIHelper");
var ColumnValueSelector_1 = require("../Components/Selectors/ColumnValueSelector");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var join_1 = require("../../components/utils/join");
var BulkUpdateToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BulkUpdateToolbarControlComponent, _super);
    function BulkUpdateToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Disabled: true,
        };
        return _this;
    }
    BulkUpdateToolbarControlComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable._on('CellsSelected', function () {
                _this.checkSelectedCells();
            });
        }
    };
    BulkUpdateToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var statusColour = this.getStatusColour();
        var selectedColumn = this.props.BulkUpdateValidationResult.Column;
        var previewPanel = (React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: selectedColumn, ShowPanel: true, ShowHeader: false, ValidationService: this.props.Adaptable.ValidationService }));
        var shouldDisable = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ||
            !this.props.BulkUpdateValidationResult.IsValid ||
            this.props.Adaptable.api.internalApi.isGridInPivotMode();
        var applyStyle = {
            color: statusColour,
            fill: 'currentColor',
        };
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: join_1.default(shouldDisable ? GeneralConstants.READ_ONLY_STYLE : '', 'ab-DashboardToolbar__BulkUpdate__wrap') },
            React.createElement(ColumnValueSelector_1.ColumnValueSelector, { newLabel: "New", existingLabel: "Existing", dropdownButtonProps: {
                    listMinWidth: 150,
                }, className: "ab-DashboardToolbar__BulkUpdate__select", disabled: shouldDisable, SelectedColumnValue: this.props.BulkUpdateValue, SelectedColumn: selectedColumn, Adaptable: this.props.Adaptable, onColumnValueChange: function (columns) { return _this.onColumnValueSelectedChanged(columns); } }),
            !shouldDisable && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (React.createElement(ButtonApply_1.ButtonApply, { marginLeft: 2, className: "ab-DashboardToolbar__BulkUpdate__apply", onClick: function () { return _this.onApplyClick(); }, style: applyStyle, tooltip: "Apply Bulk Update", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                    (this.props.PreviewInfo != null &&
                        this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), AccessLevel: this.props.AccessLevel })),
            !shouldDisable && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (React.createElement(AdaptablePopover_1.AdaptablePopover, { className: "ab-DashboardToolbar__BulkUpdate__info", headerText: "Preview Results", bodyText: [previewPanel], MessageType: UIHelper_1.UIHelper.getMessageTypeByStatusColour(statusColour), useButton: true, showEvent: 'focus', hideEvent: "blur" }))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__BulkUpdate", headerText: StrategyConstants.BulkUpdateStrategyFriendlyName, glyphicon: StrategyConstants.BulkUpdateGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.BulkUpdateStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    BulkUpdateToolbarControlComponent.prototype.onColumnValueSelectedChanged = function (selectedColumnValue) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    };
    BulkUpdateToolbarControlComponent.prototype.checkSelectedCells = function () {
        this.props.onBulkUpdateCheckSelectedCells();
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
            this.props.onBulkUpdateValueChange('');
        }
    };
    BulkUpdateToolbarControlComponent.prototype.getStatusColour = function () {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo) {
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
    BulkUpdateToolbarControlComponent.prototype.onApplyClick = function () {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
            ? this.onConfirmWarningCellValidation()
            : this.onApplyBulkUpdate();
    };
    BulkUpdateToolbarControlComponent.prototype.onConfirmWarningCellValidation = function () {
        var confirmAction = BulkUpdateRedux.BulkUpdateApply(true);
        var cancelAction = BulkUpdateRedux.BulkUpdateApply(false);
        var confirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(confirmAction, cancelAction);
        this.props.onConfirmWarningCellValidation(confirmation);
    };
    BulkUpdateToolbarControlComponent.prototype.onApplyBulkUpdate = function () {
        this.props.onApplyBulkUpdate();
        this.props.onBulkUpdateValueChange('');
    };
    return BulkUpdateToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        BulkUpdateValidationResult: state.System.BulkUpdateValidationResult,
        PreviewInfo: state.System.BulkUpdatePreviewInfo,
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
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.BulkUpdateStrategyId, ScreenPopups.BulkUpdatePopup));
        },
    };
}
exports.BulkUpdateToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BulkUpdateToolbarControlComponent);
