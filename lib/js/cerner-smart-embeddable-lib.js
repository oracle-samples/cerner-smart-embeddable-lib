'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _provider = require('xfc/src/provider');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Wrapper object to initialize the provider's content
* to allow content to embed inside an iframe.
*/
var CernerSmartEmbeddableLib = {

  /**
  * Initializes the provider wrapper object with ACLs.
  */
  init: function init() {
    _provider2.default.init({ acls: ['https://embedded.cerner.com', 'https://embedded.sandboxcerner.com', 'https://embedded.devcerner.com'] });
  },
  /**
  * Get the frame height.  The default height is HTML's scrollHeight.
  */
  calcFrameHeight: function calcFrameHeight() {
    return (
      // Default height calculation to html scrollHeight
      window.document.getElementsByTagName('html')[0].scrollHeight
    );
  },

  /**
  * Pass the height info to the consumer by triggering iframeCustomResizer
  * message with the height detail.
  */
  setFrameHeight: function setFrameHeight(h) {
    _provider2.default.trigger('iframeCustomResizer', { height: h });
  },
  /**
  * Listen for iframeCustomResizer message.
  * Calculate the frame height in px and set the height.
  */
  listenForCustomFrameHeight: function listenForCustomFrameHeight() {
    _provider2.default.on('iframeCustomResizer', function () {
      var height = window.CernerSmartEmbeddableLib.calcFrameHeight() + 'px';
      CernerSmartEmbeddableLib.setFrameHeight(height);
    });
  },

  /**
  * Allow application (provider) to send message to the parent frame (consumer).
  * eventName - event name used as key, must not be null or empty
  * option - option hash {} with keys and values to pass to the consumer
  */
  triggerEvent: function triggerEvent(eventName, option) {
    _provider2.default.trigger(eventName, option);
  }
}; /* global window */

exports.default = CernerSmartEmbeddableLib;