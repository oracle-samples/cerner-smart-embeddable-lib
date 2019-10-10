/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';


window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};

if (window.parent.frames.length <= 1) {
  CernerSmartEmbeddableLib.init();
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();
  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
}
