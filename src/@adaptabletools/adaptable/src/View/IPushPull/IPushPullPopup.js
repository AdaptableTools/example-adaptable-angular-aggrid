"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var IPushPullRedux = require("../../Redux/ActionsReducers/IPushPullRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var UIHelper_1 = require("../UIHelper");
var IPushPullPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IPushPullPopupComponent, _super);
    function IPushPullPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    IPushPullPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
        }
    };
    IPushPullPopupComponent.prototype.render = function () {
        var infoBody = ['Create a report to send to ipushpull.', React.createElement("br", null), React.createElement("br", null)];
        //  let iPushPullDomainPages: IPushPullDomain[] = this.props.Adaptable.api.iPushPullApi.getIPushPullDomains();
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.IPushPullStrategyFriendlyName, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.IPushPullGlyph, infoBody: infoBody }));
    };
    IPushPullPopupComponent.prototype.onApplyExport = function (iPushPullReport) {
        this.props.onIPushPullSendSnapshot(iPushPullReport);
    };
    return IPushPullPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
    //   SelectedIPushPullReportName: state.IPushPull.SelectedIPushPullReportName,
    //   LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onIPushPullSendSnapshot: function (report) {
            return dispatch(IPushPullRedux.IPushPullSendSnapshot(report));
        },
        onIPushPullStopLiveData: function () { return dispatch(IPushPullRedux.IPushPullStopLiveData()); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.IPushPullStrategyId));
        },
    };
}
exports.IPushPullPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(IPushPullPopupComponent);
