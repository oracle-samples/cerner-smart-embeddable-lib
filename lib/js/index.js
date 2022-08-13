'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cernerSmartEmbeddableLib = require('./cerner-smart-embeddable-lib');

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param options
 * @constructor
 */
var SmartEmbeddedContent = function SmartEmbeddedContent() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _cernerSmartEmbeddableLib2.default.init(options);
  _cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
  window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = _cernerSmartEmbeddableLib2.default.setFrameHeight;
}; /* global window */

exports.default = SmartEmbeddedContent;