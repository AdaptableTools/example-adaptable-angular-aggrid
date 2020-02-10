"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var UIHelper_1 = require("../../View/UIHelper");
exports.FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
exports.FLASHING_CELL_SELECT_ALL = 'FLASHING_CELL_SELECT_ALL';
exports.FLASHING_CELL_CHANGE_UP_COLOR = 'FLASHING_CELL_CHANGE_UP_COLOR';
exports.FLASHING_CELL_CHANGE_DOWN_COLOR = 'FLASHING_CELL_CHANGE_DOWN_COLOR';
exports.FLASHING_CELL_CHANGE_DURATION = 'FLASHING_CELL_CHANGE_DURATION';
exports.FlashingCellSelect = function (FlashingCell) { return ({
    type: exports.FLASHING_CELL_SELECT,
    FlashingCell: FlashingCell,
}); };
exports.FlashingCellSelectAll = function (shouldTurnOn, FlashingCells) { return ({
    type: exports.FLASHING_CELL_SELECT_ALL,
    shouldTurnOn: shouldTurnOn,
    FlashingCells: FlashingCells,
}); };
exports.FlashingCellChangeDuration = function (FlashingCell, NewFlashDuration) { return ({
    type: exports.FLASHING_CELL_CHANGE_DURATION,
    FlashingCell: FlashingCell,
    NewFlashDuration: NewFlashDuration,
}); };
exports.FlashingCellChangeUpColor = function (FlashingCell, UpColor) { return ({
    type: exports.FLASHING_CELL_CHANGE_UP_COLOR,
    FlashingCell: FlashingCell,
    UpColor: UpColor,
}); };
exports.FlashingCellChangeDownColor = function (FlashingCell, DownColor) { return ({
    type: exports.FLASHING_CELL_CHANGE_DOWN_COLOR,
    FlashingCell: FlashingCell,
    DownColor: DownColor,
}); };
var initialFlashingCellState = {
    FlashingCells: GeneralConstants_1.EMPTY_ARRAY,
    DefaultUpColor: UIHelper_1.getHexForName(UIHelper_1.DARK_GREEN),
    DefautDownColor: UIHelper_1.getHexForName(UIHelper_1.RED),
    DefaultDuration: GeneralConstants_1.FLASHING_CELLS_DEFAULT_DURATION,
};
exports.FlashingCellReducer = function (state, action) {
    if (state === void 0) { state = initialFlashingCellState; }
    switch (action.type) {
        case exports.FLASHING_CELL_SELECT: {
            var selectedFlashingCell_1 = action.FlashingCell;
            var items = [].concat(state.FlashingCells);
            selectedFlashingCell_1 = Object.assign({}, selectedFlashingCell_1, {
                IsLive: !selectedFlashingCell_1.IsLive,
            });
            var index = items.findIndex(function (x) { return x.ColumnId == selectedFlashingCell_1.ColumnId; });
            if (index != -1) {
                // it exists
                items[index] = selectedFlashingCell_1;
            }
            else {
                items.push(selectedFlashingCell_1);
            }
            return Object.assign({}, state, {
                FlashingCells: items,
            });
        }
        case exports.FLASHING_CELL_SELECT_ALL: {
            var flashingCells = action
                .FlashingCells;
            var shouldTurnOn_1 = action.shouldTurnOn;
            var items_1 = [].concat(state.FlashingCells);
            flashingCells.forEach(function (column) {
                var index = items_1.findIndex(function (i) { return i.ColumnId == column.ColumnId; });
                if (index != -1) {
                    // it exists
                    items_1[index] = Object.assign({}, column, { IsLive: shouldTurnOn_1 });
                }
                else {
                    items_1.push(Object.assign({}, column, { IsLive: shouldTurnOn_1 }));
                }
            });
            return Object.assign({}, state, {
                FlashingCells: items_1,
            });
        }
        case exports.FLASHING_CELL_CHANGE_DURATION: {
            var actionTyped = action;
            var flashingCell_1 = actionTyped.FlashingCell;
            var items = [].concat(state.FlashingCells);
            var index = items.findIndex(function (i) { return i == flashingCell_1; });
            if (index != -1) {
                // it exists
                items[index] = Object.assign({}, flashingCell_1, {
                    FlashingCellDuration: actionTyped.NewFlashDuration,
                });
            }
            else {
                items.push(Object.assign({}, flashingCell_1, { FlashingCellDuration: actionTyped.NewFlashDuration }));
            }
            return Object.assign({}, state, {
                FlashingCells: items,
            });
        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case exports.FLASHING_CELL_CHANGE_UP_COLOR: {
            var actionTyped = action;
            var flashingCell_2 = actionTyped.FlashingCell;
            var items = [].concat(state.FlashingCells);
            var index = items.findIndex(function (i) { return i == flashingCell_2; });
            if (index != -1) {
                // it exists
                items[index] = Object.assign({}, flashingCell_2, { UpColor: actionTyped.UpColor });
            }
            else {
                items.push(Object.assign({}, flashingCell_2, { UpColor: actionTyped.UpColor }));
            }
            return Object.assign({}, state, {
                FlashingCells: items,
            });
        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case exports.FLASHING_CELL_CHANGE_DOWN_COLOR: {
            var actionTyped = action;
            var flashingCell_3 = actionTyped.FlashingCell;
            var items = [].concat(state.FlashingCells);
            var index = items.findIndex(function (i) { return i == flashingCell_3; });
            if (index != -1) {
                // it exists
                items[index] = Object.assign({}, flashingCell_3, { DownColor: actionTyped.DownColor });
            }
            else {
                items.push(Object.assign({}, flashingCell_3, { DownColor: actionTyped.DownColor }));
            }
            return Object.assign({}, state, {
                FlashingCells: items,
            });
        }
        default:
            return state;
    }
};
