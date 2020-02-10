"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        var length_1 = srcValue ? srcValue.length : null;
        var result = _.mergeWith(objValue, srcValue, customizer);
        if (length_1 != null) {
            // when merging arrays, lodash result has the length of the
            // longest array, but we don't want that to happen
            // so we restrict to the current length
            result.length = length_1;
        }
        return result;
    }
}
function MergeStateFunction(oldState, newState) {
    return MergeState(oldState, newState);
}
exports.MergeStateFunction = MergeStateFunction;
// main merge function
function MergeState(oldState, newState) {
    var result = _.extend({}, oldState);
    for (var key in newState) {
        if (!newState.hasOwnProperty(key)) {
            continue;
        }
        var value = newState[key];
        // Assign if we don't need to merge at all
        if (!result.hasOwnProperty(key)) {
            result[key] = _.isObject(value) && !Array.isArray(value) ? _.merge({}, value) : value;
            continue;
        }
        var oldValue = result[key];
        if (_.isObject(value) && !Array.isArray(value)) {
            // use both lodash functions so that we can merge from State onto Predefined Config where it exists but from the former where it doesnt.
            result[key] = _.mergeWith({}, oldValue, value, customizer);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
exports.MergeState = MergeState;
exports.mergeReducer = function (rootReducer, LOAD_STATE_TYPE) {
    var finalReducer = rootReducer;
    finalReducer = function (state, action) {
        if (action.type === LOAD_STATE_TYPE) {
            state = MergeState(state, action.State);
            // put this new state on the action, since the root reducer further copies
            // keys from action.State to the new state
            action.State = state;
        }
        return rootReducer(state, action);
    };
    return finalReducer;
};
