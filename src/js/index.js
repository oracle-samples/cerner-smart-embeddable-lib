/* globals window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

export const initializeCernerSmartEmbeddableLib = (acls) => {
  CernerSmartEmbeddableLib.init(acls);
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
};
