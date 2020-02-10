"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ReportEntityRow_1 = require("./ReportEntityRow");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var UIHelper_1 = require("../UIHelper");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ReportWizard_1 = require("./Wizard/ReportWizard");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EmptyContent_1 = require("../../components/EmptyContent");
var ExportPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExportPopupComponent, _super);
    function ExportPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ExportPopupComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action) {
                if (this.props.PopupParams.action == 'New') {
                    this.onNew();
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var selectedReport = this.props.Reports.find(function (a) { return a.Name == _this.props.CurrentReport; });
                    this.onEdit(selectedReport);
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
        }
    };
    ExportPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            "Create a 'Report' (or use a predefined one) and then export it to specified location.",
            React.createElement("br", null),
            React.createElement("br", null),
        ];
        var colItems = [
            { Content: 'Report', Size: 3 },
            { Content: 'Columns', Size: 3 },
            { Content: 'Query Details', Size: 3 },
            { Content: 'Export', Size: 1 },
            { Content: '', Size: 2 },
        ];
        var Reports = this.props.SystemReports.concat(this.props.Reports).map(function (report, index) {
            return (React.createElement(ReportEntityRow_1.ReportEntityRow, { AdaptableObject: report, key: report.Uuid, colItems: colItems, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, LiveReports: _this.props.LiveReports, onShare: function () { return _this.props.onShare(report); }, TeamSharingActivated: _this.props.TeamSharingActivated, onExport: function (exportDestination) { return _this.onApplyExport(report, exportDestination); }, onReportStopLive: function (exportDestination) {
                    return _this.props.onReportStopLive(report, exportDestination);
                }, onEdit: function () { return _this.onEdit(report); }, onDeleteConfirm: ExportRedux.ReportDelete(report), AccessLevel: _this.props.AccessLevel, ReportService: _this.props.Adaptable.ReportService }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Report", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ExportStrategyFriendlyName, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.ExportGlyph, infoBody: infoBody, button: newButton },
            Reports.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: Reports, allowOverflow: true })) : (React.createElement(EmptyContent_1.default, null,
                React.createElement("p", null, "Click 'New' to create a new Report. A Report is named group of columns and Unique values."))),
            this.state.EditedAdaptableObject && (React.createElement(ReportWizard_1.ReportWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ModalContainer: this.props.ModalContainer, ConfigEntities: this.props.Reports, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    ExportPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (this.shouldClosePopupOnFinishWizard) {
            this.props.onClosePopup();
        }
    };
    ExportPopupComponent.prototype.onFinishWizard = function () {
        var report = this.state.EditedAdaptableObject;
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditReport(report);
        }
        else {
            this.props.onAddReport(report);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    ExportPopupComponent.prototype.canFinishWizard = function () {
        var report = this.state.EditedAdaptableObject;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(report.Name)) {
            return false;
        }
        if (report.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows &&
            ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(report.Expression)) {
            return false;
        }
        if (report.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns &&
            ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(report.ColumnIds)) {
            return false;
        }
        return true;
    };
    ExportPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyReport(),
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ExportPopupComponent.prototype.onEdit = function (ReportToEdit) {
        var clonedReportToEdit = Helper_1.Helper.cloneObject(ReportToEdit);
        this.setState({
            EditedAdaptableObject: clonedReportToEdit,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ExportPopupComponent.prototype.onApplyExport = function (report, exportDestination) {
        this.props.onApplyExport(report, exportDestination);
    };
    return ExportPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        Reports: state.Export.Reports,
        SystemReports: state.System.SystemReports,
        CurrentReport: state.Export.CurrentReport,
        LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onApplyExport: function (report, exportDestination, isLiveReport) {
            return dispatch(ExportRedux.ExportApply(report, exportDestination));
        },
        onAddReport: function (report) { return dispatch(ExportRedux.ReportAdd(report)); },
        onEditReport: function (report) { return dispatch(ExportRedux.ReportEdit(report)); },
        onReportStopLive: function (report, exportDestination) { return dispatch(SystemRedux.ReportStopLive(report, exportDestination)); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId));
        },
    };
}
exports.ExportPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ExportPopupComponent);
