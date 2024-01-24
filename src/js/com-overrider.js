/* global window */

/**
 * Wrapper object to override com objects.
 */
const ComOverrider = {
  /**
   * Overrides the COM objects if the SMART app is loaded in embedded mode
   * @param cernerSmartEmbeddableLib The Cerner Smart Embeddable Lib object
   */
  override: (cernerSmartEmbeddableLib) => {
    if (window.self !== window.top) {
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
