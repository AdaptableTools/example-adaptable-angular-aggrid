"use strict";
/** based on emittery npm package, which is MIT */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var anyMap = new WeakMap();
var eventsMap = new WeakMap();
var resolvedPromise = Promise.resolve();
//type EmitterCallback = (data?: any) => any;
function assertEventName(eventName) {
    if (typeof eventName !== 'string') {
        throw new TypeError('eventName must be a string');
    }
}
function assertListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('listener must be a function');
    }
}
function getListeners(instance, eventName) {
    var events = eventsMap.get(instance);
    if (!events.has(eventName)) {
        events.set(eventName, new Set());
    }
    return events.get(eventName);
}
function defaultMethodNamesOrAssert(methodNames) {
    var e_1, _a;
    if (methodNames === undefined) {
        return allEmitteryMethods;
    }
    if (!Array.isArray(methodNames)) {
        throw new TypeError('`methodNames` must be an array of strings');
    }
    try {
        for (var methodNames_1 = tslib_1.__values(methodNames), methodNames_1_1 = methodNames_1.next(); !methodNames_1_1.done; methodNames_1_1 = methodNames_1.next()) {
            var methodName = methodNames_1_1.value;
            if (!allEmitteryMethods.includes(methodName)) {
                if (typeof methodName !== 'string') {
                    throw new TypeError('`methodNames` element must be a string');
                }
                throw new Error(methodName + " is not Emittery method");
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (methodNames_1_1 && !methodNames_1_1.done && (_a = methodNames_1.return)) _a.call(methodNames_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return methodNames;
}
var Emittery = /** @class */ (function () {
    function Emittery() {
        anyMap.set(this, new Set());
        eventsMap.set(this, new Map());
    }
    Emittery.mixin = function (emitteryPropertyName, methodNames) {
        methodNames = defaultMethodNamesOrAssert(methodNames);
        return function (target) {
            var e_2, _a, e_3, _b;
            if (typeof target !== 'function') {
                throw new TypeError('`target` must be function');
            }
            try {
                for (var methodNames_2 = tslib_1.__values(methodNames), methodNames_2_1 = methodNames_2.next(); !methodNames_2_1.done; methodNames_2_1 = methodNames_2.next()) {
                    var methodName = methodNames_2_1.value;
                    if (target.prototype[methodName] !== undefined) {
                        throw new Error("The property `" + methodName + "` already exists on `target`");
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (methodNames_2_1 && !methodNames_2_1.done && (_a = methodNames_2.return)) _a.call(methodNames_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            function getEmitteryProperty() {
                Object.defineProperty(this, emitteryPropertyName, {
                    enumerable: false,
                    value: new Emittery(),
                });
                return this[emitteryPropertyName];
            }
            Object.defineProperty(target.prototype, emitteryPropertyName, {
                enumerable: false,
                get: getEmitteryProperty,
            });
            var emitteryMethodCaller = function (methodName) {
                return function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return (_a = this[emitteryPropertyName])[methodName].apply(_a, tslib_1.__spread(args));
                };
            };
            try {
                for (var methodNames_3 = tslib_1.__values(methodNames), methodNames_3_1 = methodNames_3.next(); !methodNames_3_1.done; methodNames_3_1 = methodNames_3.next()) {
                    var methodName = methodNames_3_1.value;
                    Object.defineProperty(target.prototype, methodName, {
                        enumerable: false,
                        value: emitteryMethodCaller(methodName),
                    });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (methodNames_3_1 && !methodNames_3_1.done && (_b = methodNames_3.return)) _b.call(methodNames_3);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return target;
        };
    };
    Emittery.prototype.on = function (eventName, listener) {
        assertEventName(eventName);
        assertListener(listener);
        getListeners(this, eventName).add(listener);
        return this.off.bind(this, eventName, listener);
    };
    Emittery.prototype.off = function (eventName, listener) {
        assertEventName(eventName);
        assertListener(listener);
        getListeners(this, eventName).delete(listener);
    };
    Emittery.prototype.once = function (eventName) {
        var _this = this;
        return new Promise(function (resolve) {
            assertEventName(eventName);
            var off = _this.on(eventName, function (data) {
                off();
                resolve(data);
            });
        });
    };
    Emittery.prototype.emit = function (eventName, eventData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var listeners, anyListeners, staticListeners, staticAnyListeners;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertEventName(eventName);
                        listeners = getListeners(this, eventName);
                        anyListeners = anyMap.get(this);
                        staticListeners = tslib_1.__spread(listeners);
                        staticAnyListeners = tslib_1.__spread(anyListeners);
                        return [4 /*yield*/, resolvedPromise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.all(tslib_1.__spread(staticListeners.map(function (listener) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    if (listeners.has(listener)) {
                                        return [2 /*return*/, listener(eventData)];
                                    }
                                    return [2 /*return*/];
                                });
                            }); }), staticAnyListeners.map(function (listener) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    if (anyListeners.has(listener)) {
                                        return [2 /*return*/, listener(eventName, eventData)];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })))];
                }
            });
        });
    };
    Emittery.prototype.emitSerial = function (eventName, eventData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var listeners, anyListeners, staticListeners, staticAnyListeners, staticListeners_1, staticListeners_1_1, listener, e_4_1, staticAnyListeners_1, staticAnyListeners_1_1, listener, e_5_1;
            var e_4, _a, e_5, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        assertEventName(eventName);
                        listeners = getListeners(this, eventName);
                        anyListeners = anyMap.get(this);
                        staticListeners = tslib_1.__spread(listeners);
                        staticAnyListeners = tslib_1.__spread(anyListeners);
                        return [4 /*yield*/, resolvedPromise];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, 8, 9]);
                        staticListeners_1 = tslib_1.__values(staticListeners), staticListeners_1_1 = staticListeners_1.next();
                        _c.label = 3;
                    case 3:
                        if (!!staticListeners_1_1.done) return [3 /*break*/, 6];
                        listener = staticListeners_1_1.value;
                        if (!listeners.has(listener)) return [3 /*break*/, 5];
                        return [4 /*yield*/, listener(eventData)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        staticListeners_1_1 = staticListeners_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_4_1 = _c.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (staticListeners_1_1 && !staticListeners_1_1.done && (_a = staticListeners_1.return)) _a.call(staticListeners_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        _c.trys.push([9, 14, 15, 16]);
                        staticAnyListeners_1 = tslib_1.__values(staticAnyListeners), staticAnyListeners_1_1 = staticAnyListeners_1.next();
                        _c.label = 10;
                    case 10:
                        if (!!staticAnyListeners_1_1.done) return [3 /*break*/, 13];
                        listener = staticAnyListeners_1_1.value;
                        if (!anyListeners.has(listener)) return [3 /*break*/, 12];
                        return [4 /*yield*/, listener(eventName, eventData)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        staticAnyListeners_1_1 = staticAnyListeners_1.next();
                        return [3 /*break*/, 10];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_5_1 = _c.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (staticAnyListeners_1_1 && !staticAnyListeners_1_1.done && (_b = staticAnyListeners_1.return)) _b.call(staticAnyListeners_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    Emittery.prototype.onAny = function (listener) {
        assertListener(listener);
        anyMap.get(this).add(listener);
        return this.offAny.bind(this, listener);
    };
    Emittery.prototype.offAny = function (listener) {
        assertListener(listener);
        anyMap.get(this).delete(listener);
    };
    Emittery.prototype.clearListeners = function (eventName) {
        var e_6, _a;
        if (typeof eventName === 'string') {
            getListeners(this, eventName).clear();
        }
        else {
            anyMap.get(this).clear();
            try {
                for (var _b = tslib_1.__values(eventsMap.get(this).values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var listeners = _c.value;
                    listeners.clear();
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    };
    Emittery.prototype.listenerCount = function (eventName) {
        var e_7, _a;
        if (typeof eventName === 'string') {
            return anyMap.get(this).size + getListeners(this, eventName).size;
        }
        if (typeof eventName !== 'undefined') {
            assertEventName(eventName);
        }
        var count = anyMap.get(this).size;
        try {
            for (var _b = tslib_1.__values(eventsMap.get(this).values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                count += value.size;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return count;
    };
    Emittery.prototype.bindMethods = function (target, methodNames) {
        var e_8, _a;
        if (typeof target !== 'object' || target === null) {
            throw new TypeError('`target` must be an object');
        }
        methodNames = defaultMethodNamesOrAssert(methodNames);
        try {
            for (var methodNames_4 = tslib_1.__values(methodNames), methodNames_4_1 = methodNames_4.next(); !methodNames_4_1.done; methodNames_4_1 = methodNames_4.next()) {
                var methodName = methodNames_4_1.value;
                if (target[methodName] !== undefined) {
                    throw new Error("The property `" + methodName + "` already exists on `target`");
                }
                Object.defineProperty(target, methodName, {
                    enumerable: false,
                    value: this[methodName].bind(this),
                });
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (methodNames_4_1 && !methodNames_4_1.done && (_a = methodNames_4.return)) _a.call(methodNames_4);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    return Emittery;
}());
var allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter(function (v) { return v !== 'constructor'; });
exports.default = Emittery;
