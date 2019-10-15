/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
if (window.gon.embedded) {
  CernerSmartEmbeddableLib.init();
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
}
