"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FormatColumnStrategy_1 = require("../../Strategy/FormatColumnStrategy");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var FormatColumnStrategyagGrid = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnStrategyagGrid, _super);
    function FormatColumnStrategyagGrid(adaptableBypass) {
        var _this = _super.call(this, adaptableBypass) || this;
        _this.adaptableBypass = adaptableBypass;
        _this.adaptableBypass = adaptableBypass;
        return _this;
    }
    FormatColumnStrategyagGrid.prototype.initStyles = function () {
        var e_1, _a;
        var columns = this.adaptable.api.gridApi.getColumns();
        var formatColumns = this.adaptable.api.formatColumnApi.getAllFormatColumn();
        var theadaptable = this.adaptable;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && formatColumns.length > 0) {
            var _loop_1 = function (column) {
                var cellClassRules = {};
                formatColumns.forEach(function (fc, index) {
                    if (fc.ColumnId == column.ColumnId) {
                        var styleName = StringExtensions_1.StringExtensions.IsNullOrEmpty(fc.Style.ClassName)
                            ? theadaptable.StyleService.CreateUniqueStyleName(StrategyConstants.FormatColumnStrategyId, fc)
                            : fc.Style.ClassName;
                        cellClassRules[styleName] = function (params) {
                            return true;
                        };
                    }
                });
                theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'FormatColumn');
            };
            try {
                for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var column = columns_1_1.value;
                    _loop_1(column);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.adaptable.redraw();
    };
    return FormatColumnStrategyagGrid;
}(FormatColumnStrategy_1.FormatColumnStrategy));
exports.FormatColumnStrategyagGrid = FormatColumnStrategyagGrid;
