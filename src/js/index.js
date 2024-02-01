/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';
import ComOverrider from './com-overrider';

CernerSmartEmbeddableLib.init();
CernerSmartEmbeddableLib.listenForCustomFrameHeight();

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;

ComOverrider.override(CernerSmartEmbeddableLib);
