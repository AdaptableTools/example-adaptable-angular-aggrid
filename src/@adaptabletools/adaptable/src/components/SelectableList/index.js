"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var useProperty_1 = require("../utils/useProperty");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var SelectableListContext = React.createContext({
    clickInfoRef: null,
    selected: {},
    getItemId: function (index) { return index; },
    toggleOnSimpleClick: false,
    setSelected: function (x) { },
});
exports.useSelectionEvent = function () {
    var _a = react_1.useContext(SelectableListContext), selected = _a.selected, setSelected = _a.setSelected, toggleOnSimpleClick = _a.toggleOnSimpleClick, clickInfoRef = _a.clickInfoRef, getItemId = _a.getItemId;
    return function (event, _a) {
        var _b;
        var index = _a.index;
        if (index === undefined) {
            LoggingHelper_1.default.LogAdaptableWarning('No "index" was passed to the list item');
            return;
        }
        var _c = clickInfoRef.current, lastClickIndexWithoutShift = _c.lastClickIndexWithoutShift, lastShiftSelectionRange = _c.lastShiftSelectionRange;
        var _d = event, shiftKey = _d.shiftKey, metaKey = _d.metaKey, ctrlKey = _d.ctrlKey;
        if (ctrlKey) {
            metaKey = true;
        }
        if (metaKey) {
            // as if shift key is not pressed
            shiftKey = false;
        }
        var itemId = "" + getItemId(index);
        var newSelection;
        if (!shiftKey) {
            clickInfoRef.current.lastClickIndexWithoutShift = index;
            if (!metaKey && !toggleOnSimpleClick) {
                // a simple click, no key modifiers
                // so reset the selection
                // and only add one item, the currently clicked item
                newSelection = (_b = {}, _b[itemId] = true, _b);
            }
            else {
                var currentRowSelected = selected[itemId];
                newSelection = tslib_1.__assign({}, selected);
                if (currentRowSelected) {
                    // unselected the current row
                    delete newSelection[itemId];
                    // also, when unselecting, the click position should not be remembered, so need to revert it back
                    clickInfoRef.current.lastClickIndexWithoutShift = lastClickIndexWithoutShift;
                }
                else {
                    newSelection[itemId] = true;
                }
            }
            clickInfoRef.current.lastShiftSelectionRange = null;
            setSelected(newSelection);
        }
        else {
            var prevClickIndex = lastClickIndexWithoutShift;
            var currentClickIndex = index;
            newSelection = tslib_1.__assign({}, selected);
            if (lastShiftSelectionRange) {
                var start_1 = lastShiftSelectionRange.start, end_1 = lastShiftSelectionRange.end;
                // clear previous shift selection
                for (; start_1 <= end_1; start_1++) {
                    delete newSelection[getItemId(start_1)];
                }
            }
            var _e = tslib_1.__read([
                Math.min(prevClickIndex, currentClickIndex),
                Math.max(prevClickIndex, currentClickIndex),
            ], 2), start = _e[0], end = _e[1];
            clickInfoRef.current.lastShiftSelectionRange = { start: start, end: end };
            for (; start <= end; start++) {
                newSelection[getItemId(start)] = true;
            }
            setSelected(newSelection);
        }
    };
};
var SelectableList = function (props) {
    var _a = tslib_1.__read(useProperty_1.default(props, 'selected', {}), 2), selected = _a[0], setSelected = _a[1];
    var clickInfoRef = react_1.useRef({
        lastClickIndexWithoutShift: 0,
    });
    var getItemId = function (index) {
        if (props.getItemId) {
            return props.getItemId(index);
        }
        return index;
    };
    return (React.createElement(SelectableListContext.Provider, { value: {
            clickInfoRef: clickInfoRef,
            toggleOnSimpleClick: props.toggleOnSimpleClick || false,
            selected: selected,
            setSelected: setSelected,
            getItemId: getItemId,
        } }, props.children));
};
exports.default = SelectableList;
