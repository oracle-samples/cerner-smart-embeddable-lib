'use strict';

var _cernerSmartEmbeddableLib = require('./cerner-smart-embeddable-lib');

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

var _comOverrider = require('./com-overrider');

var _comOverrider2 = _interopRequireDefault(_comOverrider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* globals window */

_cernerSmartEmbeddableLib2.default.init();
_cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
window.CernerSmartEmbeddableLib.setFrameHeight = _cernerSmartEmbeddableLib2.default.setFrameHeight;

_comOverrider2.default.override(_cernerSmartEmbeddableLib2.default);