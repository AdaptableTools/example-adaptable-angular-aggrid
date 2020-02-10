"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingHelper_1 = require("../Helpers/LoggingHelper");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var FreeTextColumnService = /** @class */ (function () {
    function FreeTextColumnService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    FreeTextColumnService.prototype.GetFreeTextValue = function (freeTextColumn, record) {
        try {
            if (this.adaptable.isGroupRowNode(record)) {
                return null;
            }
            if (ArrayExtensions_1.default.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
                var pkValue_1 = this.adaptable.getPrimaryKeyValueFromRowNode(record);
                var freeTextStoredValue = freeTextColumn.FreeTextStoredValues.find(function (fdx) { return fdx.PrimaryKey == pkValue_1; });
                if (freeTextStoredValue) {
                    return freeTextStoredValue.FreeText;
                }
            }
            return freeTextColumn.DefaultValue;
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError(e);
            return null;
        }
    };
    FreeTextColumnService.prototype.CheckIfDataChangingColumnIsFreeText = function (dataChangedEvent) {
        var freeTextColumn = this.adaptable.api.freeTextColumnApi
            .getAllFreeTextColumn()
            .find(function (fc) { return fc.ColumnId == dataChangedEvent.ColumnId; });
        if (freeTextColumn) {
            var freeTextStoredValue = {
                PrimaryKey: dataChangedEvent.PrimaryKeyValue,
                FreeText: dataChangedEvent.NewValue,
            };
            this.adaptable.api.freeTextColumnApi.addEditFreeTextColumnStoredValue(freeTextColumn, freeTextStoredValue);
        }
    };
    return FreeTextColumnService;
}());
exports.FreeTextColumnService = FreeTextColumnService;
