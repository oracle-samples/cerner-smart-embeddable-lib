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
   * Overrides the COM objects if the SMART app is loaded in embedded mode
   * @param cernerSmartEmbeddableLib The Cerner Smart Embeddable Lib object
   */
  override: function override(cernerSmartEmbeddableLib) {
    if (window.self !== window.top) {
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