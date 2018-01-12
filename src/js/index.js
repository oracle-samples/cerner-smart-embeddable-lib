/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

CernerSmartEmbeddableLib.init();
CernerSmartEmbeddableLib.listenForCustomFrameHeight();

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
window.CernerSmartEmbeddableLib.triggerEvent = CernerSmartEmbeddableLib.triggerEvent;
