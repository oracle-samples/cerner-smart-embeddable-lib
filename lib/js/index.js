'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* globals window */

// eslint-disable-next-line no-unused-vars


var _cernerSmartEmbeddableLib = require('./cerner-smart-embeddable-lib');

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_typeof('CCLLINK') === (typeof Function === 'undefined' ? 'undefined' : _typeof(Function))) {
  _cernerSmartEmbeddableLib2.default.init();
  _cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
  window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = _cernerSmartEmbeddableLib2.default.setFrameHeight;
}