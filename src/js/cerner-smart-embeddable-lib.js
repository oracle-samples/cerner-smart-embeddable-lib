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
    Provider.init({ acls: ['https://embedded.cerner.com',
      'https://embedded.sandboxcerner.com', 'https://embedded.devcerner.com'] });
  },
  /**
  * Get the frame height.  The default height is HTML's scrollHeight.
  */
  calcFrameHeight: () =>
    // Default height calculation to html scrollHeight
    window.document.getElementsByTagName('html')[0].scrollHeight,

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

  /**
  * Allow application (provider) to send message to the parent frame (consumer).
  * eventName - event name used as key, must not be null or empty
  * option - option hash {} with keys and values to pass to the consumer
  */
  triggerEvent: (eventName, option) => {
    Provider.trigger(eventName, option);
  },
};

export default CernerSmartEmbeddableLib;
