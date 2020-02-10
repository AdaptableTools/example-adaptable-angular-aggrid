"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var CellSummaryDetails_1 = require("./CellSummaryDetails");
var CellSummaryPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryPopupComponent, _super);
    function CellSummaryPopupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellSummaryPopupComponent.prototype.componentDidMount = function () {
        this.props.onSetSelectedCellSummary();
    };
    CellSummaryPopupComponent.prototype.render = function () {
        var infoBody = [
            'Provides summary information about the (numeric) cells which have been selected.',
        ];
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.CellSummaryStrategyFriendlyName, glyphicon: StrategyConstants.CellSummaryGlyph, infoBody: infoBody, border: "none", bodyProps: { padding: 0 } },
            React.createElement(CellSummaryDetails_1.CellSummaryDetails, { CellSummary: this.props.CellSummary })));
    };
    return CellSummaryPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CellSummary: state.Grid.CellSummary,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSetSelectedCellSummary: function () { return dispatch(GridRedux.GridCreateCellSummary()); },
    };
}
exports.CellSummaryPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellSummaryPopupComponent);
