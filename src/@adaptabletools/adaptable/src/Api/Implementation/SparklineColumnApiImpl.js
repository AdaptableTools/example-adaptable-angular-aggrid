"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var SparklineColumnApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnApiImpl, _super);
    function SparklineColumnApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparklineColumnApiImpl.prototype.getSparklineColumnState = function () {
        return this.getAdaptableState().SparklineColumn;
    };
    SparklineColumnApiImpl.prototype.getAllSparklineColumn = function () {
        var sparklineColumns = this.getAdaptableState().SparklineColumn
            .SparklineColumns;
        if (sparklineColumns == undefined) {
            sparklineColumns = [];
        }
        return sparklineColumns;
    };
    SparklineColumnApiImpl.prototype.isSparklineColumn = function (columnId) {
        return this.getAllSparklineColumn().find(function (sc) { return sc.ColumnId === columnId; }) != null;
    };
    return SparklineColumnApiImpl;
}(ApiBase_1.ApiBase));
exports.SparklineColumnApiImpl = SparklineColumnApiImpl;
