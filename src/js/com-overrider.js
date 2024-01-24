/* global window */

/**
 * Wrapper object to override com objects.
 */
const ComOverrider = {
  /**
   * Overrides the COM objects if the SMART app is loaded in embedded mode and within Edge browser.
   * @param cernerSmartEmbeddableLib The Cerner Smart Embeddable Lib object
   */
  override: (cernerSmartEmbeddableLib) => {
    const isEdge = window.navigator.userAgent.indexOf('Edg') !== -1;
    if (window.self !== window.top && isEdge) {
      /** APPLINK API definition - https://wiki.cerner.com/display/public/MPDEVWIKI/APPLINK */
      window.APPLINK = (linkMode, launchObject, commandLineArgs) =>
        cernerSmartEmbeddableLib.invokeAPI('APPLINK', {
          linkMode,
          launchObject,
          commandLineArgs,
        });
    }
  },
};
export default ComOverrider;
