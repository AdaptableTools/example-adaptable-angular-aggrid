"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var react_1 = require("react");
var join_1 = require("../../components/utils/join");
var contains_1 = require("../../components/utils/contains");
var SimpleButton_1 = require("../SimpleButton");
var icons_1 = require("../icons");
var HelpBlock_1 = require("../HelpBlock");
var reducer_1 = require("./reducer");
var initialState = {
    dragOver: false,
    message: null,
};
var stop = function (e) {
    e.preventDefault();
    e.stopPropagation();
};
var readJSONFile = function (file, toJSON) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var reader;
    return tslib_1.__generator(this, function (_a) {
        reader = new FileReader();
        return [2 /*return*/, new Promise(function (resolve, reject) {
                reader.onload = function (e) {
                    try {
                        var fn = toJSON || JSON.parse;
                        var json = fn(e.target.result);
                        Promise.resolve(json).then(resolve);
                    }
                    catch (ex) {
                        reject('Invalid JSON');
                    }
                };
                reader.onerror = function (e) {
                    reject(e);
                };
                reader.readAsText(file);
            })];
    });
}); };
var FileDroppable = function (props) {
    var onDropSuccess = props.onDropSuccess, message = props.message, _a = props.fileAccept, fileAccept = _a === void 0 ? '.json' : _a, _b = props.helpText, helpText = _b === void 0 ? 'Adaptable No Code Version' : _b, _c = props.defaultText, defaultText = _c === void 0 ? 'Click here to select a JSON file to load or drag it here' : _c, _d = props.dragOverText, dragOverText = _d === void 0 ? 'Drop file here to start Adaptable Wizard' : _d, _e = props.icon, icon = _e === void 0 ? React.createElement(icons_1.Icon, { name: "attach-file", size: 48 }) : _e, domProps = tslib_1.__rest(props, ["onDropSuccess", "message", "fileAccept", "helpText", "defaultText", "dragOverText", "icon"]);
    var _f = tslib_1.__read(react_1.useReducer(reducer_1.default, initialState), 2), state = _f[0], dispatch = _f[1];
    var onDragEnter = function (e) {
        dispatch({
            type: reducer_1.ActionTypes.DRAG_OVER,
        });
    };
    var onDragLeave = function (event) {
        stop(event);
        if (domRef.current != event.target &&
            contains_1.default(domRef.current, event.target)) {
            return;
        }
        dispatch({
            type: reducer_1.ActionTypes.DRAG_OUT,
        });
    };
    var onDrop = function (e) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var files, nativeEvent, file, json_1, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stop(e);
                    nativeEvent = e.nativeEvent;
                    if (nativeEvent && nativeEvent.dataTransfer) {
                        files = nativeEvent.dataTransfer.files;
                    }
                    else {
                        files = e.target.files;
                    }
                    onDragLeave(e);
                    file = files[0];
                    if (!file) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (props.readFile || readJSONFile)(file, props.toJSON)];
                case 2:
                    json_1 = _a.sent();
                    dispatch({
                        type: reducer_1.ActionTypes.DROP_SUCCES,
                        payload: {
                            message: React.createElement(rebass_1.Box, null, 'Initializing adaptable...'),
                        },
                    });
                    requestAnimationFrame(function () {
                        requestAnimationFrame(function () {
                            if (onDropSuccess) {
                                onDropSuccess(json_1, file);
                            }
                        });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    dispatch({
                        type: reducer_1.ActionTypes.SET_INVALID_FILE,
                        payload: {
                            message: React.createElement(rebass_1.Box, null, 'The file is not a valid JSON file! Please try again!'),
                        },
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var domRef = react_1.useRef();
    var form = (React.createElement("form", { onSubmit: stop },
        React.createElement(SimpleButton_1.default, { style: { cursor: 'pointer' }, variant: "text" },
            React.createElement("div", null, state.dragOver ? dragOverText : defaultText),
            React.createElement("input", { type: "file", onChange: onDrop, accept: fileAccept, style: {
                    opacity: 0,
                    position: 'absolute',
                    fontSize: 0,
                    lineHeight: 0,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                } }))));
    var msg = message || state.message;
    return (React.createElement(rebass_1.Flex, tslib_1.__assign({}, domProps, { flexDirection: "column", className: join_1.default(props.className, 'ab-FileDroppable', state.dragOver ? 'ab-FileDroppable--drag-over' : ''), alignItems: "center", justifyContent: "center", onDragEnter: onDragEnter, onDragLeave: onDragLeave, onDrop: onDrop, onDragOver: stop, ref: domRef }),
        props.children,
        helpText || icon ? (React.createElement(rebass_1.Flex, { flexDirection: "column" },
            helpText ? (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "center", margin: 2 },
                React.createElement(HelpBlock_1.default, null, helpText))) : null,
            icon ? (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "center", margin: 2 }, icon)) : null)) : null,
        msg,
        form));
};
FileDroppable.defaultProps = {};
exports.default = FileDroppable;
