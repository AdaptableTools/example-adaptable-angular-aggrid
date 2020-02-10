"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var FlashingCellsRedux = require("../../Redux/ActionsReducers/FlashingCellsRedux");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var FlashingCellEntityRow_1 = require("./FlashingCellEntityRow");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var CheckBox_1 = require("../../components/CheckBox");
var rebass_1 = require("rebass");
var FlashingCellsPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FlashingCellsPopupComponent, _super);
    function FlashingCellsPopupComponent(props) {
        return _super.call(this, props) || this;
    }
    FlashingCellsPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Make numeric cells flash briefly as their value changes',
            React.createElement("br", null),
            React.createElement("br", null),
            "Click the 'Live' checkbox to turn on flashing for a particular column; or the 'All Columns' checkbox to turn on flashing for all Columns",
            React.createElement("br", null),
            React.createElement("br", null),
            'Defaults are Green for positive change, Red for negative change and a Duration of 0.5 seconds, but these can be amended for each column.',
        ];
        var colItems = [
            { Content: 'Live', Size: 1 },
            { Content: 'Column', Size: 4 },
            { Content: 'Flash Duration', Size: 3 },
            { Content: 'Up Colour', Size: 2 },
            { Content: 'Down Colour', Size: 2 },
        ];
        var flashingCellDurations = [250, 500, 750, 1000];
        var calculatedColumns = this.props.CalculatedColumns.map(function (c) { return c.ColumnId; });
        var numericColumns = this.props.Columns.filter(function (c) { return c.DataType == Enums_1.DataType.Number; });
        var numericNonCalcColumns = numericColumns.filter(function (c) {
            return ArrayExtensions_1.ArrayExtensions.NotContainsItem(calculatedColumns, c.ColumnId);
        });
        numericNonCalcColumns = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, numericNonCalcColumns, 'FriendlyName');
        var allPotentialFlashingCells = [];
        var flashingCellState = this.props.Adaptable.api.configApi.configGetFlashingCellState(false);
        numericNonCalcColumns.forEach(function (nc) {
            var existingfc = _this.props.FlashingCells.find(function (e) { return e.ColumnId == nc.ColumnId; });
            if (!existingfc) {
                allPotentialFlashingCells.push(ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(nc, flashingCellState.DefaultUpColor, flashingCellState.DefautDownColor, flashingCellState.DefaultDuration));
            }
            else {
                allPotentialFlashingCells.push(existingfc);
            }
        });
        var allFlashingCells = allPotentialFlashingCells.map(function (flashingcell, index) {
            return (React.createElement(FlashingCellEntityRow_1.FlashingCellEntityRow, { AdaptableObject: flashingcell, key: flashingcell.ColumnId, Columns: _this.props.Columns, UserFilters: null, colItems: colItems, FlashingCellDurations: flashingCellDurations, ColorPalette: _this.props.ColorPalette, onSelect: function (flashingcell) { return _this.props.onSelectColumn(flashingcell); }, onChangeFlashingDuration: function (flashingcell, newFlashDuration) {
                    return _this.props.onChangeFlashDuration(flashingcell, newFlashDuration);
                }, onChangeDownColorFlashingCell: function (flashingcell, DownColor) {
                    return _this.props.onChangeDownColorFlashingCell(flashingcell, DownColor);
                }, onChangeUpColorFlashingCell: function (flashingcell, UpColor) {
                    return _this.props.onChangeUpColorFlashingCell(flashingcell, UpColor);
                }, TeamSharingActivated: false, onShare: null, onEdit: null, onDeleteConfirm: null, AccessLevel: _this.props.AccessLevel }));
        });
        var areAllLive = allPotentialFlashingCells.every(function (f) { return f.IsLive; });
        var setAllOption = (React.createElement(rebass_1.Box, null,
            React.createElement(CheckBox_1.default, { marginLeft: 2, onChange: function () { return _this.props.onSelectAllColumns(!areAllLive, allPotentialFlashingCells); }, checked: areAllLive }, "All Columns")));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithImage_1.PanelWithImage, { variant: "primary", header: StrategyConstants.FlashingCellsStrategyFriendlyName, glyphicon: StrategyConstants.FlashingCellGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                setAllOption,
                React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: allFlashingCells, reducedPanel: true }))));
    };
    return FlashingCellsPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        FlashingCells: state.FlashingCell.FlashingCells,
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectColumn: function (flashingCell) {
            return dispatch(FlashingCellsRedux.FlashingCellSelect(flashingCell));
        },
        onSelectAllColumns: function (shouldTurnOn, numericColumns) {
            return dispatch(FlashingCellsRedux.FlashingCellSelectAll(shouldTurnOn, numericColumns));
        },
        onChangeFlashDuration: function (flashingCell, newFlashDuration) {
            return dispatch(FlashingCellsRedux.FlashingCellChangeDuration(flashingCell, newFlashDuration));
        },
        onChangeDownColorFlashingCell: function (flashingCell, DownColor) {
            return dispatch(FlashingCellsRedux.FlashingCellChangeDownColor(flashingCell, DownColor));
        },
        onChangeUpColorFlashingCell: function (flashingCell, UpColor) {
            return dispatch(FlashingCellsRedux.FlashingCellChangeUpColor(flashingCell, UpColor));
        },
    };
}
exports.FlashingCellsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FlashingCellsPopupComponent);
