'use strict';

var _cernerSmartEmbeddableLib = require('./cerner-smart-embeddable-lib');

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cernerSmartEmbeddableLib2.default.init(); /* globals window */

_cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
window.CernerSmartEmbeddableLib.triggerEvent = _cernerSmartEmbeddableLib2.default.triggerEvent;