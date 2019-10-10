'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* globals window */

var _cernerSmartEmbeddableLib = require('./cerner-smart-embeddable-lib');

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
console.log(_typeof('CCLINK') === (typeof Functions === 'undefined' ? 'undefined' : _typeof(Functions)));
console.log(window);
if (_typeof('CCLINK') === (typeof Functions === 'undefined' ? 'undefined' : _typeof(Functions))) {
  _cernerSmartEmbeddableLib2.default.init();
  _cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();
  console.log('Hello Millenium User');
  window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = _cernerSmartEmbeddableLib2.default.setFrameHeight;
}