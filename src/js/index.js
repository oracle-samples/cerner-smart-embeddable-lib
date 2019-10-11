/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
// console.log(typeof 'CCLINK' === typeof Functions);

window.CernerSmartEmbeddableLib.embedded = typeof 'CCLINK' === typeof Functions;
if (false) {
  CernerSmartEmbeddableLib.init();
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
}
