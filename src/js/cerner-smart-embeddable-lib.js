/* global window */

import { Provider } from 'xfc';

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
      acls: ['https://embedded.cerner.com',
        'https://embedded.sandboxcerner.com', 'https://embedded.devcerner.com',
        'https://embedded.applications.ca.cerner.com', 'https://embedded.ca.cernerpowerchart.net',
        'https://embedded.applications.au.cerner.com', 'https://embedded.au.cernerpowerchart.net',
        'https://embedded.emea-2.cerner.com'],
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
  /**
   * API invocation with specified name and corresponding params
   * @param {string} apiName   - API name required to invoke, not null  or undefined 
   * @param {object} params - Any number of parameters that passed to API, not null or undefined 
   */
  invokeAPI: function invokeAPI(apiName, params) {
    // Trigger COM Api specific event 'invokeCOMApi'
    Provider.trigger('invokeCOMApi', { name: apiName, params });
  }
};

export default CernerSmartEmbeddableLib;