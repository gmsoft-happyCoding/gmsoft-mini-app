'use strict';

var react = require('react');
var debounce = require('lodash/debounce');
var reactRedux = require('react-redux');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function useArray(initial) {
    var _a = __read(react.useState(initial), 2), value = _a[0], setValue = _a[1];
    var add = react.useCallback(function (a) { return setValue(function (v) { return __spreadArray(__spreadArray([], __read(v), false), [a], false); }); }, []);
    var move = react.useCallback(function (from, to) {
        return setValue(function (it) {
            var copy = it.slice();
            copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
            return copy;
        });
    }, []);
    var clear = react.useCallback(function () { return setValue(function () { return []; }); }, []);
    var removeById = react.useCallback(
    // @ts-ignore not every array that you will pass down will have object with id field.
    function (id) { return setValue(function (arr) { return arr.filter(function (v) { return v && v.id !== id; }); }); }, []);
    var removeIndex = react.useCallback(function (index) {
        return setValue(function (v) {
            var copy = v.slice();
            copy.splice(index, 1);
            return copy;
        });
    }, []);
    return react.useMemo(function () { return ({
        value: value,
        setValue: setValue,
        add: add,
        move: move,
        clear: clear,
        removeById: removeById,
        removeIndex: removeIndex,
    }); }, [add, clear, move, removeById, removeIndex, value]);
}

function useBoolean(initial) {
    var _a = __read(react.useState(initial), 2), value = _a[0], setValue = _a[1];
    var toggle = react.useCallback(function () { return setValue(function (v) { return !v; }); }, []);
    var setTrue = react.useCallback(function () { return setValue(true); }, []);
    var setFalse = react.useCallback(function () { return setValue(false); }, []);
    return react.useMemo(function () { return ({
        value: value,
        setValue: setValue,
        toggle: toggle,
        setTrue: setTrue,
        setFalse: setFalse,
    }); }, [setFalse, setTrue, toggle, value]);
}

function useInput(initial) {
    if (initial === void 0) { initial = ''; }
    var stringified = initial.toString();
    var _a = __read(react.useState(stringified), 2), value = _a[0], setValue = _a[1];
    var onChange = react.useCallback(function (e) { return setValue(e.target.value); }, []);
    var clear = react.useCallback(function () { return setValue(''); }, []);
    return react.useMemo(function () { return ({
        value: value,
        setValue: setValue,
        hasValue: value !== undefined && value !== null && value.trim() !== '',
        clear: clear,
        onChange: onChange,
        eventBind: {
            onChange: onChange,
            value: value,
        },
        valueBind: {
            onChange: setValue,
            value: value,
        },
    }); }, [clear, onChange, value]);
}

/* eslint-disable no-console */
function useLogger(name, props) {
    react.useEffect(function () {
        console.log("".concat(name, " has mounted"));
        return function () { return console.log("".concat(name, " has unmounted")); };
    }, [name]);
    react.useEffect(function () {
        console.log('Props updated', props);
    });
}

function useMap(initialState) {
    if (initialState === void 0) { initialState = new Map(); }
    var _a = __read(react.useState(Array.isArray(initialState) ? new Map(initialState) : initialState), 2), map = _a[0], setMap = _a[1];
    var set = react.useCallback(function (key, value) {
        setMap(function (aMap) {
            var copy = new Map(aMap);
            return copy.set(key, value);
        });
    }, []);
    var deleteByKey = react.useCallback(function (key) {
        setMap(function (_map) {
            var copy = new Map(_map);
            copy.delete(key);
            return copy;
        });
    }, []);
    var clear = react.useCallback(function () {
        setMap(function () { return new Map(); });
    }, []);
    var initialize = react.useCallback(function (mapOrTuple) {
        if (mapOrTuple === void 0) { mapOrTuple = []; }
        setMap(function () { return new Map(mapOrTuple); });
    }, []);
    return react.useMemo(function () { return ({
        value: map,
        setValue: setMap,
        clear: clear,
        set: set,
        remove: deleteByKey,
        initialize: initialize,
    }); }, [clear, deleteByKey, initialize, map, set]);
}

function useNumber(initial, _a) {
    var _b = _a === void 0 ? {} : _a, upperLimit = _b.upperLimit, lowerLimit = _b.lowerLimit, loop = _b.loop, _c = _b.step, step = _c === void 0 ? 1 : _c;
    var _d = __read(react.useState(initial), 2), value = _d[0], setValue = _d[1];
    var decrease = react.useCallback(function (d) {
        setValue(function (aValue) {
            var decreaseBy = d !== undefined ? d : step;
            var nextValue = aValue - decreaseBy;
            if (lowerLimit !== undefined) {
                if (nextValue + decreaseBy > lowerLimit) {
                    return nextValue;
                }
                if (loop && upperLimit) {
                    return upperLimit;
                }
                return aValue;
            }
            return nextValue;
        });
    }, [loop, lowerLimit, step, upperLimit]);
    var increase = react.useCallback(function (i) {
        setValue(function (aValue) {
            var increaseBy = i !== undefined ? i : step;
            var nextValue = aValue + increaseBy;
            if (upperLimit !== undefined) {
                if (nextValue - increaseBy < upperLimit) {
                    return nextValue;
                }
                if (loop) {
                    return initial;
                }
                return aValue;
            }
            return nextValue;
        });
    }, [initial, loop, step, upperLimit]);
    return react.useMemo(function () { return ({
        value: value,
        setValue: setValue,
        increase: increase,
        decrease: decrease,
    }); }, [decrease, increase, value]);
}

function usePrevious(value) {
    var ref = react.useRef();
    react.useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
}

function useSetState(initialValue) {
    var _a = __read(react.useState(initialValue), 2), value = _a[0], setValue = _a[1];
    var setState = react.useCallback(function (v) {
        return setValue(function (oldValue) { return (__assign(__assign({}, oldValue), (typeof v === 'function' ? v(oldValue) : v))); });
    }, [setValue]);
    return react.useMemo(function () { return ({
        setState: setState,
        state: value,
    }); }, [setState, value]);
}

function useStateful(initial) {
    var _a = __read(react.useState(initial), 2), value = _a[0], setValue = _a[1];
    return react.useMemo(function () { return ({
        value: value,
        setValue: setValue,
    }); }, [value]);
}

var useDebounce = function (f, ms, leading, trailing) {
    if (ms === void 0) { ms = 500; }
    if (leading === void 0) { leading = true; }
    if (trailing === void 0) { trailing = true; }
    return react.useMemo(function () {
        return debounce(f, ms, {
            leading: leading,
            trailing: trailing,
        });
    }, [f, leading, ms, trailing]);
};

function bindActionCreators(actionCreators, dispatch) {
    var boundActionCreators = {};
    var _loop_1 = function (key) {
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === "function") {
            boundActionCreators[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return dispatch(actionCreator.apply(void 0, __spreadArray([], __read(args), false)));
            };
        }
    };
    for (var key in actionCreators) {
        _loop_1(key);
    }
    return boundActionCreators;
}
function bindActions (actions, dispatch) {
    var boundActionCreators = {};
    // 遍历 actions, 为了绑定 async action
    // eslint-disable-next-line no-restricted-syntax
    for (var key in actions) {
        if (Object.prototype.hasOwnProperty.call(actions, key)) {
            var actionCreator = actions[key];
            // @ts-ignore
            boundActionCreators[key] = bindActionCreators(actionCreator, dispatch);
        }
    }
    return boundActionCreators;
}

function useActions(actions, deps) {
    if (deps === void 0) { deps = []; }
    var dispatch = reactRedux.useDispatch();
    return react.useMemo(function () { return bindActions(actions, dispatch); }, __spreadArray([dispatch], __read(deps), false));
}

function useDebounceActions(actions, deps) {
    if (deps === void 0) { deps = []; }
    var debounceDispatch = useDebounce(reactRedux.useDispatch());
    return react.useMemo(function () { return bindActions(actions, debounceDispatch); }, __spreadArray([debounceDispatch], __read(deps), false));
}

function useShallowEqualSelector(selector) {
    return reactRedux.useSelector(selector, reactRedux.shallowEqual);
}

var useInterval = function (callback, delay) {
    var savedCallback = react.useRef(function () { });
    react.useEffect(function () {
        savedCallback.current = callback;
    });
    react.useEffect(function () {
        if (delay !== null) {
            var interval_1 = setInterval(function () { return savedCallback.current(); }, delay || 0);
            return function () { return clearInterval(interval_1); };
        }
        return undefined;
    }, [delay]);
};

var useCountdown = function (second) {
    /**
     * 剩余时间
     */
    var _a = __read(react.useState(0), 2), rt = _a[0], setRt = _a[1];
    /**
     * delay = null -> 暂定定时器
     */
    var _b = __read(react.useState(null), 2), delay = _b[0], setDelay = _b[1];
    var countdown = react.useCallback(function () {
        if (rt > 0) {
            setRt(rt - 1);
        }
        else {
            setDelay(null);
        }
    }, [rt]);
    var start = react.useCallback(function () {
        setRt(second);
        setDelay(1000);
    }, [second]);
    var stop = react.useCallback(function () {
        setDelay(null);
        setRt(0);
    }, []);
    var pause = react.useCallback(function () {
        setDelay(null);
    }, []);
    var goOn = react.useCallback(function () {
        setDelay(1000);
    }, []);
    useInterval(countdown, delay);
    return { rt: rt, start: start, stop: stop, pause: pause, goOn: goOn };
};

exports.useActions = useActions;
exports.useArray = useArray;
exports.useBoolean = useBoolean;
exports.useCountdown = useCountdown;
exports.useDebounce = useDebounce;
exports.useDebounceActions = useDebounceActions;
exports.useInput = useInput;
exports.useInterval = useInterval;
exports.useLogger = useLogger;
exports.useMap = useMap;
exports.useNumber = useNumber;
exports.usePrevious = usePrevious;
exports.useSetState = useSetState;
exports.useShallowEqualSelector = useShallowEqualSelector;
exports.useStateful = useStateful;
//# sourceMappingURL=index.js.map
