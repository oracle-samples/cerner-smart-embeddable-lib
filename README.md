# Cerner SMART Embeddable Library

In order to run any SMART app in Cerner's MPage view (iframe), the following project is needed.  This project provides necessary JavaScript and CSS files to include in any SMART app. The app should work regardless of it being embedded or not when this library is used.

This library uses [xfc](https://github.com/cerner/xfc) to solve [Clickjacking](https://www.owasp.org/index.php/Clickjacking) problem for all browsers.

## Installation

This is an npm project and can be installed with the following: 
```shell
npm install cerner-smart-embeddable-lib
```

Include it to your project with the following: 
```js
import 'cerner-smart-embeddable-lib';
```

It is suggested to import the module (as opposed to including the pre-minified file from `dist/`) as it will allow Webpack to define `process.env.NODE_ENV` which will enable or disable XFC logging. Per the [XFC Readme](https://github.com/cerner/xfc#usage), logging is only enabled in non-production environments. The environment can be set in webpack using the DefinePlugin:

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

**Warning:** Disable XFC logging if using [F-Twelve](https://github.com/cerner/f-twelve/). F-Twelve writes to the DOM every time `console.log` is called and (when logging is enabled) XFC calls `console.log` every time the DOM is written to. This causes the browser to endlessly loop and freeze. It is safe to use both concurrently if XFC logging is disabled. 

## Script Include (NOT recommended) 
If the import method described above is not an option, the transpiled bundle files are available in the `dist/` directory and can be used with a `<script>` tag. This is not suggested because the logging cannot be disabled via webpack (see warning above). 


## Dependency

This project requires an additional library:
- [babel-polyfill npm](https://www.npmjs.com/package/babel-polyfill) or
- [babel-polyfill end state](https://babeljs.io/docs/usage/polyfill/#usage-in-browser)

NOTE: Your app *must* bundle this polyfill in order for Cerner SMART Embeddable Library project to function. Since there can only be one instance of Babel polyfill, it is best if your application bundles this polyfill instead of having Babel polyfill packaged with this library.

## Setup

- Install build tools via npm.

```
npm install webpack
```

- Install local build dependencies.

```
npm install
```

## Build

```
npm run build
```

## Config

- Include `hidden` attribute to all of HTML documents. This is a security feature that will hide the HTML document.

```
<!DOCTYPE html>
<html hidden>
```

- Include minified css file from `dist` directory in all of HTML documents.  This css is supplementing the `hidden` attribute above.  This css will hide the HTML documents when the page is rendered with older browsers that do not support `hidden` attribute.

```
<link rel='stylesheet' type='text/css' href='cerner-smart-embeddable-lib-[version].min.css'>
```

- Include babel-polyfill JavaScript file in all of HTML documents.

```
<script src='/path/to/babel-polyfill.js'></script>
```

- Include minified JavaScript file from `dist` directory in all of HTML documents before the end of `</body>` tag.  This JavaScript will remove the `hidden` attribute if the page is not being framed or, if it was framed by Cerner.

```
<script src='cerner-smart-embeddable-lib-[version].min.js'></script>
```

See [example.html](/example.html) file for reference.

## Sizing Content

The default height calculation logic uses the html `scrollHeight`.  If this default does not size the app correctly, you can override the default height calculation method by using the following code with your custom height calculation logic.  The following code snippets are provided as examples.

Using scrollHeight method:

```
// Specify the custom height calculation code in the function below.
// Include this function after the CernerSmartEmbeddableLib's include.
window.CernerSmartEmbeddableLib.calcFrameHeight = function() {
  return window.document.getElementsByTagName('html')[0].scrollHeight;
};
```

Using bodyOffset method:

```
var heightCalc = {};

heightCalc.getComputedStyle = function (prop) {
  var result = null;
  if ('getComputedStyle' in window) {
    result = window.getComputedStyle(window.document.body, null);
  } else {
    result = window.document.defaultView.getComputedStyle(window.document.body, null);
  }
  return result !== null ? parseInt(result[prop], 10) : 0;
};

// Using bodyOffset height calculation
window.CernerSmartEmbeddableLib.calcFrameHeight = function() {
  return window.document.body.offsetHeight + heightCalc.getComputedStyle('marginTop') + heightCalc.getComputedStyle('marginBottom');
};
```

Using a fixed height:

```
// A fixed height can be specified here in px.
window.CernerSmartEmbeddableLib.calcFrameHeight = function() {
  return 500;
};
```

Include the desired code block after the CernerSmartEmbeddableLib's include to override the height calculation method.

## Additional Consideration

This library takes care of any unauthorized framing and prevents Clickjacking. The following headers should NOT be set.  By having any of the following headers set, they will conflict with this library which will cause the app to not show up in Cerner's *PowerChart MPage*.

1. [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
2. [Content-Security-Policy frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives#frame-ancestors)

The X-Frame-Options header provides the following options: DENY, SAMEORIGIN and ALLOW-FROM url.  The DENY and SAMEORIGIN options cannot be used.  The ALLOW-FROM option does not have full support from all browsers.  Chrome and Opera do not have support for ALLOW-FROM url. If there are multiple frames, Firefox will enforce and only allow value set in ALLOW-FROM for all frames. The ALLOW-FROM url does not allow multiple urls to be set. This header cannot be used.

The Content-Security-Policy frame-ancestors header does not have full support from all browsers.  Additionally, the CSP frame-ancestors will check all frames in the hierarchy against the whitelist.  This means that all parties that want to frame the app will need to be whitelisted by the app's page.  This can be a big burden on the app's developer.  Also, the list will be big and the process will be very tedius to add hosts to the whitelist.  This header cannot be used.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## LICENSE

Copyright 2017 Cerner Innovation, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0) Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
