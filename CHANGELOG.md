1.0.0
- Initial release of cerner-smart-embeddable-lib

1.1.0
- Update xfc to version 1.6.0

1.3.0
- Update xfc to version 1.8.1
- Include dist folder in npm package

1.4.0
- Update to consume xfc as ES6 module
- Update npm dependencies to fix critical security vulnerabilities. 

1.5.0
- Change CernerSmartEmbeddableLib init method to accept an options parameter
  - options parameter is an object that can contain and additionalAcls array
- index.js now exports a function that must be invoked to call Provider.init
