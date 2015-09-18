'use strict';

exports.__esModule = true;
exports['default'] = isPromise;

function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}

module.exports = exports['default'];
