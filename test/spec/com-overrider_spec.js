import SmartEmbeddedContent from "js/cerner-smart-embeddable-lib";
import ComOverrider from "js/com-overrider";

describe("ComOverrider", () => {
  describe("override method", () => {
    it("overrides com objects in embedded mode ", () => {
      const { top, self } = window;
      Object.defineProperty(window, "top", {});
      Object.defineProperty(window, "self", {});

      const prevAppLink = window.APPLINK;
      ComOverrider.override(SmartEmbeddedContent);
      expect(window.APPLINK).not.toEqual(prevAppLink);
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
