/* global window */

import CernerSmartEmbeddableLib from './cerner-smart-embeddable-lib';

/**
 *
 * @param options
 * @constructor
 */
const SmartEmbeddedContent = (options = {}) => {
  CernerSmartEmbeddableLib.init(options);
  CernerSmartEmbeddableLib.listenForCustomFrameHeight();

  window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
  window.CernerSmartEmbeddableLib.calcFrameHeight = CernerSmartEmbeddableLib.calcFrameHeight;
  window.CernerSmartEmbeddableLib.setFrameHeight = CernerSmartEmbeddableLib.setFrameHeight;
};


export default SmartEmbeddedContent;
