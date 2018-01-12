import SmartEmbeddedContent from 'js/cerner-smart-embeddable-lib'
import Provider from 'xfc/src/provider';

describe('CernerSmartEmbeddableLib', () => {
  describe('init', () => {
    it('initializes Provider with correct ACLs', () => {

      spyOn(Provider, 'init');
      SmartEmbeddedContent.init();

      const option = {
        acls: ['https://embedded.cerner.com',
               'https://embedded.sandboxcerner.com',
               'https://embedded.devcerner.com'
               ]
      };
      expect(Provider.init).toHaveBeenCalledWith(option);
    });
  });

  describe('calcFrameHeight', () => {
    it('returns the scrollHeight property\'s value', () => {
      spyOn(window.document, 'getElementsByTagName').and.returnValue([{scrollHeight: 200}]);
      expect(SmartEmbeddedContent.calcFrameHeight()).toEqual(200);
    });
  });

  describe('setFrameHeight', () => {
    it('trigger iframeCustomResizer message with height in px', () => {
      spyOn(Provider, 'trigger');
      SmartEmbeddedContent.setFrameHeight('500px');

      expect(Provider.trigger).toHaveBeenCalledWith('iframeCustomResizer', {height: '500px'});
    });
  });

  describe('listenForCustomFrameHeight', () => {
    it('listens on iframeCustomResizer message', () => {
      spyOn(Provider, 'on');
      SmartEmbeddedContent.listenForCustomFrameHeight();

      expect(Provider.on).toHaveBeenCalledWith('iframeCustomResizer', jasmine.any(Function))
    });
  });

  describe('triggerEvent', () => {
    it('call trigger API on Provider object with valid option', () => {
      spyOn(Provider, 'trigger');
      SmartEmbeddedContent.triggerEvent('testEventName', {key: 'value1'});

      const option = {key: 'value1'};
      expect(Provider.trigger).toHaveBeenCalledWith('testEventName', option);
    });

    it('call trigger API on Provider object with null option', () => {
      spyOn(Provider, 'trigger');
      SmartEmbeddedContent.triggerEvent('testEventName', null);

      const option = null;
      expect(Provider.trigger).toHaveBeenCalledWith('testEventName', option);
    });
  });
});
