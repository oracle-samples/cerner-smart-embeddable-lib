import SmartEmbeddedContent from 'js/cerner-smart-embeddable-lib'
import { Provider } from 'xfc';

const DEFAULT_ACLS = ['https://embedded.cerner.com',
  'https://embedded.sandboxcerner.com',
  'https://embedded.devcerner.com',
  'https://embedded.applications.ca.cerner.com',
  'https://embedded.ca.cernerpowerchart.net',
  'https://embedded.applications.au.cerner.com',
  'https://embedded.au.cernerpowerchart.net',
  'https://embedded.emea-2.cerner.com'
];

describe('CernerSmartEmbeddableLib', () => {
  describe('init', () => {
    it('initializes Provider with default ACLs', () => {

      spyOn(Provider, 'init');
      SmartEmbeddedContent.init({});

      const options = {
        acls: DEFAULT_ACLS
      };

      expect(Provider.init).toHaveBeenCalledWith(options);
    });

    it('initializes Provider with additional ACLs', () => {

      spyOn(Provider, 'init');
      SmartEmbeddedContent.init({
        additionalAcls: [
          'https://bobs.burgers.com',
          '*.foo.bar'
        ]
      });

      const options = {
        acls: [
          ...DEFAULT_ACLS,
          'https://bobs.burgers.com',
          '*.foo.bar'
        ]
      };

      expect(Provider.init).toHaveBeenCalledWith(options);
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
});
