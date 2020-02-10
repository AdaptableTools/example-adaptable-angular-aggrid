"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var FlashingCellRedux = require("../../Redux/ActionsReducers/FlashingCellsRedux");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var SimpleButton_1 = require("../../components/SimpleButton");
var FlashingCellSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FlashingCellSummaryComponent, _super);
    function FlashingCellSummaryComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlashingCellSummaryComponent.prototype.render = function () {
        var _this = this;
        var flashingCell = this.props.FlashingCells.find(function (fc) { return fc.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        var isFlashingCellColumn = flashingCell && flashingCell.IsLive;
        var message = isFlashingCellColumn ? 'Flashing on' : 'Flashing off';
        var showFlashingButton = isFlashingCellColumn ? (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onFlashingSelectedChanged(flashingCell); }, variant: "raised", tone: "neutral" }, "Turn Off")) : (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onFlashingSelectedChanged(flashingCell); }, variant: "raised", tone: "neutral" }, "Turn On"));
        var colItems = [];
        colItems.push({
            Size: 3,
            Content: React.createElement("b", null, StrategyConstants.FlashingCellsStrategyFriendlyName),
        });
        colItems.push({ Size: 7, Content: message });
        colItems.push({ Size: 2, Content: showFlashingButton });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    FlashingCellSummaryComponent.prototype.onFlashingSelectedChanged = function (flashingCell) {
        var _this = this;
        var existingfc = this.props.FlashingCells.find(function (e) { return e.ColumnId == _this.props.SummarisedColumn.ColumnId; });
        if (!existingfc) {
            var flashingCellState = this.props.Adaptable.api.configApi.configGetFlashingCellState(false);
            var col = ColumnHelper_1.ColumnHelper.getColumnFromId(this.props.SummarisedColumn.ColumnId, this.props.Columns);
            existingfc = ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(col, flashingCellState.DefaultUpColor, flashingCellState.DefautDownColor, flashingCellState.DefaultDuration);
            this.props.onSelectFlashingCell(existingfc);
        }
        this.props.onSelectFlashingCell(existingfc);
    };
    return FlashingCellSummaryComponent;
}(React.Component));
exports.FlashingCellSummaryComponent = FlashingCellSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        FlashingCells: state.FlashingCell.FlashingCells,
        Columns: state.Grid.Columns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectFlashingCell: function (flashingCell) {
            return dispatch(FlashingCellRedux.FlashingCellSelect(flashingCell));
        },
    };
}
exports.FlashingCellSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FlashingCellSummaryComponent);
