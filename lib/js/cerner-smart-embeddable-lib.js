'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xfc = require('xfc');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global window */

/**
* Wrapper object to initialize the provider's content
* to allow content to embed inside an iframe.
*/
var CernerSmartEmbeddableLib = {

  /**
  * Initializes the provider wrapper object with ACLs.
  */
  init: function init(_ref) {
    var _ref$additionalAcls = _ref.additionalAcls,
        additionalAcls = _ref$additionalAcls === undefined ? [] : _ref$additionalAcls;

    _xfc.Provider.init({
      acls: ['https://embedded.cerner.com', 'https://embedded.sandboxcerner.com', 'https://embedded.devcerner.com', 'https://embedded.applications.ca.cerner.com', 'https://embedded.ca.cernerpowerchart.net', 'https://embedded.applications.au.cerner.com', 'https://embedded.au.cernerpowerchart.net', 'https://embedded.emea-2.cerner.com'].concat(_toConsumableArray(additionalAcls))
    });
  },

  /**
  * Get the frame height.  The default height is HTML's scrollHeight.
  */
  calcFrameHeight: function calcFrameHeight() {
    return window.document.getElementsByTagName('html')[0].scrollHeight;
  },

  /**
  * Pass the height info to the consumer by triggering iframeCustomResizer
  * message with the height detail.
  */
  setFrameHeight: function setFrameHeight(h) {
    _xfc.Provider.trigger('iframeCustomResizer', { height: h });
  },

  /**
  * Listen for iframeCustomResizer message.
  * Calculate the frame height in px and set the height.
  */
  listenForCustomFrameHeight: function listenForCustomFrameHeight() {
    _xfc.Provider.on('iframeCustomResizer', function () {
      var height = window.CernerSmartEmbeddableLib.calcFrameHeight() + 'px';
      CernerSmartEmbeddableLib.setFrameHeight(height);
    });
  }
};

exports.default = CernerSmartEmbeddableLib;