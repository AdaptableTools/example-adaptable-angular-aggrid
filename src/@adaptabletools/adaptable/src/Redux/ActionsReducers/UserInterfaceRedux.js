"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIHelper_1 = require("../../View/UIHelper");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.COLOR_PALETTE_SET = 'COLOR_PALETTE_SET';
exports.COLOR_PALETTE_ADD = 'COLOR_PALETTE_ADD';
exports.STYLE_CLASSNAMES_ADD = 'STYLE_CLASSNAMES_ADD';
exports.PERMITTED_VALUES_COLUMN_SET = 'PERMITTED_VALUES_COLUMN_SET';
exports.PERMITTED_VALUES_COLUMN_DELETE = 'PERMITTED_VALUES_COLUMN_DELETE';
exports.ROW_STYLES_CLEAR = 'ROW_STYLES_CLEAR';
exports.ROW_STYLES_SET = 'ROW_STYLES_SET';
exports.CONTEXT_MENU_ITEM_ADD = 'CONTEXT_MENU_ITEM_ADD';
exports.ColorPaletteSet = function (ColorPalette) { return ({
    type: exports.COLOR_PALETTE_SET,
    ColorPalette: ColorPalette,
}); };
exports.ColorPaletteAdd = function (ColorPalette) { return ({
    type: exports.COLOR_PALETTE_ADD,
    ColorPalette: ColorPalette,
}); };
exports.StyleClassNamesAdd = function (StyleClassNames) { return ({
    type: exports.STYLE_CLASSNAMES_ADD,
    StyleClassNames: StyleClassNames,
}); };
exports.PermittedValuesColumnSet = function (PermittedValuesColumn) { return ({
    type: exports.PERMITTED_VALUES_COLUMN_SET,
    PermittedValuesColumn: PermittedValuesColumn,
}); };
exports.PermittedValuesColumnDelete = function (Column) { return ({
    type: exports.PERMITTED_VALUES_COLUMN_DELETE,
    Column: Column,
}); };
exports.RowStylesClear = function () { return ({
    type: exports.ROW_STYLES_CLEAR,
}); };
exports.RowStylesSet = function (rowStyles) { return ({
    type: exports.ROW_STYLES_SET,
    rowStyles: rowStyles,
}); };
exports.ContextMenuItemAdd = function (contextMenuItem) { return ({
    type: exports.CONTEXT_MENU_ITEM_ADD,
    contextMenuItem: contextMenuItem,
}); };
var initialUserInterfaceState = {
    ColorPalette: UIHelper_1.UIHelper.getDefaultColors(),
    StyleClassNames: GeneralConstants_1.EMPTY_ARRAY,
    PermittedValuesColumns: GeneralConstants_1.EMPTY_ARRAY,
    EditLookUpColumns: GeneralConstants_1.EMPTY_ARRAY,
    RowStyles: GeneralConstants_1.EMPTY_ARRAY,
    ColumnMenuItems: GeneralConstants_1.EMPTY_ARRAY,
    ContextMenuItems: GeneralConstants_1.EMPTY_ARRAY,
};
exports.UserInterfaceStateReducer = function (state, action) {
    if (state === void 0) { state = initialUserInterfaceState; }
    var permittedValuesColumns;
    switch (action.type) {
        case exports.COLOR_PALETTE_SET:
            return Object.assign({}, state, {
                ColorPalette: action.ColorPalette,
            });
        case exports.COLOR_PALETTE_ADD:
            var actionTypedAddColors = action;
            var existingColors_1 = [].concat(state.ColorPalette);
            actionTypedAddColors.ColorPalette.forEach(function (cp) {
                existingColors_1.push(cp);
            });
            return Object.assign({}, state, { ColorPalette: existingColors_1 });
        case exports.STYLE_CLASSNAMES_ADD:
            var actionTypedAddStyles = action;
            var existingStyleNames_1 = [].concat(state.StyleClassNames);
            actionTypedAddStyles.StyleClassNames.forEach(function (sc) {
                existingStyleNames_1.push(sc);
            });
            return Object.assign({}, state, { StyleClassNames: existingStyleNames_1 });
        case exports.PERMITTED_VALUES_COLUMN_SET:
            var actionTypedSetColumnValues_1 = action;
            permittedValuesColumns = [].concat(state.PermittedValuesColumns);
            var existingPermittedColumnValues = permittedValuesColumns.find(function (pcv) { return pcv.ColumnId == actionTypedSetColumnValues_1.PermittedValuesColumn.ColumnId; });
            if (existingPermittedColumnValues) {
                existingPermittedColumnValues.PermittedValues =
                    actionTypedSetColumnValues_1.PermittedValuesColumn.PermittedValues;
            }
            else {
                permittedValuesColumns.push(actionTypedSetColumnValues_1.PermittedValuesColumn);
            }
            return Object.assign({}, state, {
                PermittedValuesColumns: permittedValuesColumns,
            });
        case exports.PERMITTED_VALUES_COLUMN_DELETE:
            var actionTypedDeleteColumnValues_1 = action;
            permittedValuesColumns = [].concat(state.PermittedValuesColumns);
            var index = permittedValuesColumns.findIndex(function (pcv) { return pcv.ColumnId == actionTypedDeleteColumnValues_1.Column; });
            permittedValuesColumns.splice(index, 1);
            return Object.assign({}, state, {
                PermittedValuesColumns: permittedValuesColumns,
            });
        case exports.ROW_STYLES_CLEAR:
            return Object.assign({}, state, {
                RowStyles: GeneralConstants_1.EMPTY_ARRAY,
            });
        case exports.ROW_STYLES_SET:
            return Object.assign({}, state, {
                RowStyles: action.rowStyles,
            });
        case exports.CONTEXT_MENU_ITEM_ADD:
            var contextMenuItemAdd = action;
            var contextMenuItems = [].concat(state.ContextMenuItems);
            contextMenuItems.push(contextMenuItemAdd.contextMenuItem);
            return Object.assign({}, state, { ContextMenuItems: contextMenuItems });
        default:
            return state;
    }
};
