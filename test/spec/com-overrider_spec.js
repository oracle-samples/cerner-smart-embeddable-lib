import SmartEmbeddedContent from "js/cerner-smart-embeddable-lib";
import ComOverrider from "js/com-overrider";

/**
 * Helper to mock the userAgent property
 * @param {String} userAgent String representing the user agent
 */
function setUserAgent(userAgent) {
  if (window.navigator.userAgent !== userAgent) {
    const userAgentProp = {
      get: () => {
        return userAgent;
      },
    };
    try {
      Object.defineProperty(window.navigator, "userAgent", userAgentProp);
    } catch (e) {
      window.navigator = Object.create(navigator, {
        userAgent: userAgentProp,
      });
    }
  }
}

describe("ComOverrider", () => {
  describe("override method", () => {
    beforeEach(() => {
      setUserAgent("Edg");
    });

    it("overrides com objects in embedded mode ", () => {
      const { top, self } = window;
      Object.defineProperty(window, "top", {});
      Object.defineProperty(window, "self", {});

      const prevAppLink = window.APPLINK;
      ComOverrider.override(SmartEmbeddedContent);
      expect(window.APPLINK).not.toEqual(prevAppLink);
      Object.defineProperty(window, "top", top);
      Object.defineProperty(window, "self", self);
      window.APPLINK = prevAppLink;
    });

    it("does not override com objects in non-edge browser context", () => {
      const { top, self } = window;
      Object.defineProperty(window, "top", {});
      Object.defineProperty(window, "self", {});
      setUserAgent("MSIE");
      const prevAppLink = window.APPLINK;
      ComOverrider.override(SmartEmbeddedContent);
      expect(window.APPLINK).toEqual(prevAppLink);
      Object.defineProperty(window, "top", top);
      Object.defineProperty(window, "self", self);
    });
    it("does not override com objects in standalone mode ", () => {
      const { top, self } = window;
      const obj = {};
      Object.defineProperty(window, "top", obj);
      Object.defineProperty(window, "self", obj);
      const prevAppLink = window.APPLINK;
      ComOverrider.override(SmartEmbeddedContent);
      expect(JSON.stringify(window.APPLINK)).toEqual(
        JSON.stringify(prevAppLink)
      );
      Object.defineProperty(window, "top", top);
      Object.defineProperty(window, "self", self);
    });

    it("overrides with the invokeAPI from CernerSmartEmbeddableLib", () => {
      const { top, self } = window;
      Object.defineProperty(window, "top", {});
      Object.defineProperty(window, "self", {});
      spyOn(SmartEmbeddedContent, "invokeAPI");
      ComOverrider.override(SmartEmbeddedContent);
      window.APPLINK(1, "http://www.test.com", "xyz");
      expect(SmartEmbeddedContent);
      expect(SmartEmbeddedContent.invokeAPI).toHaveBeenCalledWith("APPLINK", {
        linkMode: 1,
        launchObject: "http://www.test.com",
        commandLineArgs: "xyz",
      });
    });
  });
});
