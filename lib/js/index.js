'use strict';

var _cernerSmartEmbeddableLib = require('./cerner-smart-embeddable-lib');

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {}; /* globals window */

if (window.parent.frames.length <= 1) {
  _cernerSmartEmbeddableLib2.default.init();
  _cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();
  window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = _cernerSmartEmbeddableLib2.default.setFrameHeight;
}