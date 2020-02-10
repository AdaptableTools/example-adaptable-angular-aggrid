"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var Glue42Redux = require("../../Redux/ActionsReducers/Glue42Redux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var UIHelper_1 = require("../UIHelper");
var Glue42PopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(Glue42PopupComponent, _super);
    function Glue42PopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    Glue42PopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
        }
    };
    Glue42PopupComponent.prototype.render = function () {
        var infoBody = ['Create a report to send to Glue42.', React.createElement("br", null), React.createElement("br", null)];
        //  let Glue42DomainPages: Glue42Domain[] = this.props.Adaptable.api.Glue42Api.getGlue42Domains();
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.Glue42StrategyFriendlyName, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.Glue42Glyph, infoBody: infoBody }));
    };
    Glue42PopupComponent.prototype.onApplyExport = function (Glue42Report) {
        this.props.onGlue42SendSnapshot(Glue42Report);
    };
    return Glue42PopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
    //   SelectedGlue42ReportName: state.Glue42.SelectedGlue42ReportName,
    //   LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onGlue42SendSnapshot: function (report) {
            return dispatch(Glue42Redux.Glue42SendSnapshot(report));
        },
        //    onGlue42StopLiveData: () => dispatch(Glue42Redux.Glue42StopLiveData()),
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.Glue42StrategyId));
        },
    };
}
exports.Glue42Popup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Glue42PopupComponent);
