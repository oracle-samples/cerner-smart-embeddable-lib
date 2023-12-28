import SmartEmbeddedContent from 'js/cerner-smart-embeddable-lib'
import { Provider } from 'xfc';

describe('CernerSmartEmbeddableLib', () => {
  describe('init', () => {
    it('initializes Provider with correct ACLs', () => {

      spyOn(Provider, 'init');
      SmartEmbeddedContent.init();

      const option = {
        acls: ['https://embedded.cerner.com',
               'https://embedded.sandboxcerner.com',
               'https://embedded.devcerner.com',
               'https://embedded.applications.ca.cerner.com',
               'https://embedded.ca.cernerpowerchart.net',
               'https://embedded.applications.au.cerner.com',
               'https://embedded.au.cernerpowerchart.net',
               'https://embedded.emea-2.cerner.com'
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

  describe('invokeCOMApi', () => {
    it('trigger invokeCOMApi', () => {
      spyOn(Provider, 'trigger');
      /** Sample data based on cerner wiki - https://wiki.cerner.com/display/public/MPDEVWIKI/APPLINK */
      const ApplinkParams = {'mode':100, 'launchMode': 'https://www.oracle.com', 'commandlineargs':''}
      SmartEmbeddedContent.invokeComApi('APPLINK', ApplinkParams);
      expect(Provider.trigger).toHaveBeenCalledWith('invokeCOMApi', {name: 'APPLINK', params: ApplinkParams})
    });
  });
});
