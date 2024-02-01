'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */

/**
 * Wrapper object to override com objects.
 */
var ComOverrider = {
  /**
   * Overrides the COM objects if the SMART app is loaded in embedded mode and within Edge browser.
   * Currently overrides APPLINK only.
   * @param cernerSmartEmbeddableLib The Cerner Smart Embeddable Lib object
   */
  override: function override(cernerSmartEmbeddableLib) {
    var isEdge = window.navigator.userAgent.indexOf('Edg') !== -1;
    if (window.self !== window.top && isEdge) {
      /** APPLINK API definition - https://wiki.cerner.com/display/public/MPDEVWIKI/APPLINK */
      window.APPLINK = function (linkMode, launchObject, commandLineArgs) {
        return cernerSmartEmbeddableLib.invokeAPI('APPLINK', {
          linkMode: linkMode,
          launchObject: launchObject,
          commandLineArgs: commandLineArgs
        });
      };
    }
  }
};
exports.default = ComOverrider;