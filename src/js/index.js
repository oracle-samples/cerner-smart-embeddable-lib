/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};

window.CernerSmartEmbeddableLib.embedded = typeof 'CCLLINK' === typeof Function;
CernerSmartEmbeddableLib.init();
CernerSmartEmbeddableLib.listenForCustomFrameHeight();

window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
