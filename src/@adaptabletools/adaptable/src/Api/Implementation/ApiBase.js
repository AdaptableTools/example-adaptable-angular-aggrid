"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var Helper_1 = require("../../Utilities/Helpers/Helper");
// Base class for the API - provides checking dispatching methods
var ApiBase = /** @class */ (function () {
    /**
     * Constructor for all the api classes which simply takes and assigns an instance of Adaptable
     * @param adaptable the core IAdaptable object
     */
    function ApiBase(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    /**
     * Base api helper method which ensure that Adaptable Object being used in the function is not null or undefined
     *
     * If it does not exist then we log an error and the api method should stop
     * @param item AdaptableObject being checked
     * @param name the name of the object if it has one (e.g. if its a search)
     * @param type the actual type of the object being checked
     */
    ApiBase.prototype.checkItemExists = function (item, name, type) {
        if (Helper_1.default.objectNotExists(item)) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError("No " + type + " found with the name: " + name);
            return false;
        }
        return true;
    };
    ApiBase.prototype.checkArrayExists = function (array) {
        if (!Array.isArray(array)) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError("Item passed to API function was not an array");
            return false;
        }
        return true;
    };
    /**
     * Base api Helper method that dispatches a *Redux Action* to the Store
     * @param action the Redux Action to be dispatched
     */
    ApiBase.prototype.dispatchAction = function (action) {
        this.adaptable.AdaptableStore.TheStore.dispatch(action);
    };
    /**
     * Returns the entire State from the Store
     *
     * This is a simple *getState()* call
     */
    ApiBase.prototype.getAdaptableState = function () {
        return this.adaptable.AdaptableStore.TheStore.getState();
    };
    return ApiBase;
}());
exports.ApiBase = ApiBase;
