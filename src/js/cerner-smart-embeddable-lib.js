/* global window */

import Provider from 'xfc/src/provider';

/**
* Wrapper object to initialize the provider's content
* to allow content to embed inside an iframe.
*/
const CernerSmartEmbeddableLib = {

  /**
  * Initializes the provider wrapper object with ACLs.
  */
  init: () => {
    Provider.init({
      acls: ['https://embedded.cerner.com', 'https://embedded.sandboxcerner.com', 'https://embedded.devcerner.com'],
    });
  },
  /**
  * Get the frame height.  The default height is HTML's scrollHeight.
  */
  calcFrameHeight: () => window.document.getElementsByTagName('html')[0].scrollHeight,

  /**
  * Pass the height info to the consumer by triggering iframeCustomResizer
  * message with the height detail.
  */
  setFrameHeight: (h) => {
    Provider.trigger('iframeCustomResizer', { height: h });
  },
  /**
  * Listen for iframeCustomResizer message.
  * Calculate the frame height in px and set the height.
  */
  listenForCustomFrameHeight: () => {
    Provider.on('iframeCustomResizer', () => {
      const height = `${window.CernerSmartEmbeddableLib.calcFrameHeight()}px`;
      CernerSmartEmbeddableLib.setFrameHeight(height);
    });
  },
};

export default CernerSmartEmbeddableLib;
