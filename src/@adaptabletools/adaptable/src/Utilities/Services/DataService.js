"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDataService_1 = require("./Interface/IDataService");
var Emitter_1 = require("../../Utilities/Emitter");
// Used to be the Audit Service - now much reduced
// Doesnt store any data (other than for flashing cell) - simply responsible for publishing DataChanged Events
var DataService = /** @class */ (function () {
    function DataService(adaptable) {
        var _this = this;
        this.adaptable = adaptable;
        this.on = function (eventName, callback) {
            return _this.emitter.on(eventName, callback);
        };
        this.emit = function (eventName, data) { return _this.emitter.emit(eventName, data); };
        this.adaptable = adaptable;
        // create the _columnValueList - will be empty - used currrently only for flashing cell
        this._columnValueList = new Map();
        this.emitter = new Emitter_1.default();
    }
    DataService.prototype.CreateDataChangedEvent = function (dataChangedInfo) {
        if (dataChangedInfo.NewValue != dataChangedInfo.OldValue) {
            this.emitter.emit('DataChanged', dataChangedInfo);
        }
    };
    DataService.prototype.GetPreviousColumnValue = function (columnId, identifierValue, newValue, changeDirection) {
        var columnValueList = this.getCellValuesForColumn(columnId);
        var oldValue = columnValueList.get(identifierValue);
        // this horrible code is for dealing with ag-Grid because it comes in twice for Flashing Cell and we only want to return (and save!) a value if its the correct direction
        if (oldValue) {
            switch (changeDirection) {
                case IDataService_1.ChangeDirection.Up:
                    if (oldValue >= newValue) {
                        return null;
                    }
                    break;
                case IDataService_1.ChangeDirection.Down:
                    if (oldValue <= newValue) {
                        return null;
                    }
                    break;
                case IDataService_1.ChangeDirection.Neutral:
                    // do nothing
                    break;
            }
        }
        if (oldValue == newValue) {
            return null;
        }
        columnValueList.set(identifierValue, newValue);
        if (oldValue != null) {
            return oldValue;
        }
        else {
            return newValue;
        }
    };
    DataService.prototype.getCellValuesForColumn = function (columnId) {
        // first check the list exists; if not, then create it
        if (this._columnValueList.size == 0) {
            this._columnValueList.set(columnId, new Map());
        }
        // get the item
        var returnList = this._columnValueList.get(columnId);
        //in case we created a new calculated column  - need to worry about this?
        if (!returnList) {
            returnList = new Map();
            this._columnValueList.set(columnId, returnList);
        }
        return returnList;
    };
    return DataService;
}());
exports.DataService = DataService;
