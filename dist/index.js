'use strict';

exports.__esModule = true;
exports['default'] = promiseMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isPromise = require('./isPromise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function promiseMiddleware() {
  return function (next) {
    return function (action) {
      if (!_isPromise2['default'](action.payload)) {
        return next(action);
      }

      var types = action.types;
      var meta = action.meta;
      var _action$payload = action.payload;
      var promise = _action$payload.promise;
      var data = _action$payload.data;
      var PENDING = types[0];
      var FULFILLED = types[1];
      var REJECTED = types[2];

      /**
       * Dispatch the first async handler. This tells the
       * reducer that an async action has been dispatched.
       */
      next({
        type: PENDING,
        payload: data,
        meta: meta
      });

      /**
       * Return either the fulfilled action object or the rejected
       * action object.
       */
      return promise.then(function (payload) {
        return next({
          type: FULFILLED,
          payload: payload,
          meta: meta
        });
      }, function (error) {
        return next({
          payload: error,
          error: true,
          type: REJECTED
        });
      });
    };
  };
}

module.exports = exports['default'];
