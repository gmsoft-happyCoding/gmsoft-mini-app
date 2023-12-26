'use strict';

var dvaCore = require('dva-core');
var createLoading = require('dva-loading');

// model namespace cache
var cached = {};
var stateContainer = undefined;
// eslint-disable-next-line no-console
var defaultOnError = function (err) { return console.error(err); };
function createStateContainer(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.NODE_ENV, NODE_ENV = _c === void 0 ? "production" : _c, _d = _b.onError, onError = _d === void 0 ? defaultOnError : _d;
    if (stateContainer) {
        return stateContainer;
    }
    stateContainer = dvaCore.create({ onError: onError });
    stateContainer.use(createLoading());
    /**
     * dynamic inject dva model to stateContainer
     * if replace=true, same namespace model will be replaced
     */
    stateContainer.injectModel = function (model, replace) {
        if (replace === void 0) { replace = false; }
        // @ts-ignore
        var m = model.default || model;
        if (replace || NODE_ENV === "development") {
            // Replace a model if it exsits, if not, add it to app
            stateContainer.replaceModel(m);
        }
        else if (!cached[m.namespace]) {
            stateContainer.model(m);
        }
        cached[m.namespace] = 1;
        return m;
    };
    stateContainer.start();
    return stateContainer;
}

module.exports = createStateContainer;
//# sourceMappingURL=index.js.map
