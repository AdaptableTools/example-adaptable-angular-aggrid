"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserInterfaceRedux = require("../../Redux/ActionsReducers/UserInterfaceRedux");
var ApiBase_1 = require("./ApiBase");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var UserInterfaceApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(UserInterfaceApiImpl, _super);
    function UserInterfaceApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserInterfaceApiImpl.prototype.getUserInterfaceState = function () {
        return this.getAdaptableState().UserInterface;
    };
    UserInterfaceApiImpl.prototype.getColorPalette = function () {
        return this.getAdaptableState().UserInterface.ColorPalette;
    };
    UserInterfaceApiImpl.prototype.setColorPalette = function (colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette));
    };
    UserInterfaceApiImpl.prototype.addColorsToPalette = function (colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette));
    };
    UserInterfaceApiImpl.prototype.addStyleClassNames = function (styleClassNames) {
        this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames));
    };
    UserInterfaceApiImpl.prototype.getAllPermittedValuesColumns = function () {
        return this.getAdaptableState().UserInterface.PermittedValuesColumns;
    };
    UserInterfaceApiImpl.prototype.getPermittedValuesColumnForColumn = function (columnId) {
        var permittedValues = this.getAllPermittedValuesColumns();
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(permittedValues)) {
            return permittedValues.find(function (pc) { return pc.ColumnId == columnId; });
        }
        return undefined;
    };
    UserInterfaceApiImpl.prototype.getPermittedValuesForColumn = function (columnId) {
        var permittedValuesColumn = this.getPermittedValuesColumnForColumn(columnId);
        if (!permittedValuesColumn) {
            return [];
        }
        if (typeof permittedValuesColumn.PermittedValues === 'function') {
            var column = ColumnHelper_1.default.getColumnFromId(permittedValuesColumn.ColumnId, this.adaptable.api.gridApi.getColumns());
            return permittedValuesColumn.PermittedValues(column);
        }
        else {
            return permittedValuesColumn.PermittedValues;
        }
    };
    UserInterfaceApiImpl.prototype.setColumnPermittedValues = function (column, permittedValues) {
        var permittedColumnValues = {
            ColumnId: column,
            PermittedValues: permittedValues,
        };
        this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnSet(permittedColumnValues));
    };
    UserInterfaceApiImpl.prototype.clearColumnPermittedValues = function (column) {
        this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnDelete(column));
    };
    UserInterfaceApiImpl.prototype.getAllEditLookUpColumns = function () {
        return this.getAdaptableState().UserInterface.EditLookUpColumns;
    };
    UserInterfaceApiImpl.prototype.getEditLookUpColumnForColumn = function (columnId) {
        var editLookUpColumns = this.getAllEditLookUpColumns();
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(editLookUpColumns)) {
            return editLookUpColumns.find(function (pc) { return pc.ColumnId == columnId; });
        }
        return undefined;
    };
    UserInterfaceApiImpl.prototype.getEditLookUpValuesForColumn = function (columnId) {
        var editLookUpColumn = this.getEditLookUpColumnForColumn(columnId);
        if (!editLookUpColumn) {
            return [];
        }
        if (typeof editLookUpColumn.LookUpValues === 'function') {
            var column = ColumnHelper_1.default.getColumnFromId(editLookUpColumn.ColumnId, this.adaptable.api.gridApi.getColumns());
            return editLookUpColumn.LookUpValues(column);
        }
        else {
            return editLookUpColumn.LookUpValues;
        }
    };
    UserInterfaceApiImpl.prototype.isEditLookUpColumn = function (columnId) {
        var editLookUpColumnIds = this.getAllEditLookUpColumns().map(function (c) { return c.ColumnId; });
        return ArrayExtensions_1.ArrayExtensions.ContainsItem(editLookUpColumnIds, columnId);
    };
    UserInterfaceApiImpl.prototype.clearRowStyles = function () {
        this.dispatchAction(UserInterfaceRedux.RowStylesClear());
        this.adaptable.clearRowStyles();
        this.adaptable.redraw();
    };
    UserInterfaceApiImpl.prototype.setRowStyles = function (rowStyles) {
        this.dispatchAction(UserInterfaceRedux.RowStylesSet(rowStyles));
        this.adaptable.setUpRowStyles();
        this.adaptable.redraw();
    };
    UserInterfaceApiImpl.prototype.addContextMenuItem = function (contextMenuItem) {
        this.dispatchAction(UserInterfaceRedux.ContextMenuItemAdd(contextMenuItem));
    };
    UserInterfaceApiImpl.prototype.createContextMenuItem = function (label, userMenuItemClickedFunction, icon, subMenuItems) {
        var contextMenuItem = {
            Label: label,
            UserMenuItemClickedFunction: userMenuItemClickedFunction,
            Icon: icon,
            SubMenuItems: subMenuItems,
        };
        this.addContextMenuItem(contextMenuItem);
    };
    return UserInterfaceApiImpl;
}(ApiBase_1.ApiBase));
exports.UserInterfaceApiImpl = UserInterfaceApiImpl;
