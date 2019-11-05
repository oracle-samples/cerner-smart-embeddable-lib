/* globals window */

// eslint-disable-next-line no-unused-vars
import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

if (window.external && typeof window.external.DiscernObjectFactory !== 'undefined' && window.self !== window.top) {
  CernerSmartEmbeddableLib.init();
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
}
