/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
console.log(typeof 'CCLINK' === typeof Functions);
console.log(window);
if (typeof 'CCLINK' === typeof Functions) {
  CernerSmartEmbeddableLib.init();
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();
  console.log('Hello Millenium User');
  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
}
