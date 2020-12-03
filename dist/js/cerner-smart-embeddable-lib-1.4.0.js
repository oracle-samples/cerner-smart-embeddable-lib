/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 77);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(35)('wks');
var uid = __webpack_require__(25);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(12);
var hide = __webpack_require__(9);
var has = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(47);
var toPrimitive = __webpack_require__(30);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(45);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(94)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(46)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(102);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
var global = __webpack_require__(1);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(11);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-console: 0 */
exports.default = {
  log: function log() {
    if (process.env.NODE_ENV !== 'production') {
      var _console;

      (_console = console).log.apply(_console, arguments);
    }
  },

  warn: function warn() {
    var _console2;

    return (_console2 = console).warn.apply(_console2, arguments);
  },
  error: function error() {
    var _console3;

    return (_console3 = console).error.apply(_console3, arguments);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(140)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4);
var dPs = __webpack_require__(91);
var enumBugKeys = __webpack_require__(36);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(50).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys');
var uid = __webpack_require__(25);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(16) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(15);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(11);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(16);
var wksExt = __webpack_require__(42);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(85);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(96);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(15);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(16);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(48);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(11);
var $iterCreate = __webpack_require__(90);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(92)(false);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(19);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(106);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {



/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(11);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(12);
var invoke = __webpack_require__(114);
var html = __webpack_require__(50);
var cel = __webpack_require__(29);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(15)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(41);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(123);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(125);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(25)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(21);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(30);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(47);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(133);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(137);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = __webpack_require__(72);

var _freeze2 = _interopRequireDefault(_freeze);

var _promise = __webpack_require__(40);

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = __webpack_require__(53);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = __webpack_require__(143);

var _uuid2 = _interopRequireDefault(_uuid);

var _errors = __webpack_require__(146);

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var JSONRPCVersion = '2.0';

/**
 * JSONRPC class based on the JSONRPC specification[0]. This object handles creating JSONRPC
 * requests and notification objects and managing resolving responses.
 *
 * @see {@link  http://json-rpc.org/wiki/specification}
 */

var JSONRPC = function () {
  /**
   * Initializes a JSONRPC instance.
   * @param {function} dispatcher - A function which takes a single argument for
   *                                the JSONRPC object to send to the RPC server.
   * @param {object} methods - The JSONRPC methods to handle.
   */
  function JSONRPC(dispatcher) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, JSONRPC);

    this.version = JSONRPCVersion;
    this.deferreds = {};
    this.methods = methods;
    this.dispatcher = dispatcher;
  }

  /**
   * Sends the given JSONPRC message using the dispatcher provided.
   * @param {object} message - A JSONPRC 2.0 message object.
   */

  (0, _createClass3.default)(JSONRPC, [{
    key: 'send',
    value: function send(message) {
      var data = (0, _extends3.default)({}, message);
      data.jsonrpc = this.version;

      this.dispatcher(data);
    }

    /**
     * Create a notification object for the given method and params.
     * @see {@link  http://www.jsonrpc.org/specification#notification|JSONRPC Notifications}
     *
     * @param {string} method - The RPC method to execute
     * @param {object[]} params - The parameters to execute with the method.
     * @returns {object} JSONRPC notification object
     */

  }, {
    key: 'notification',
    value: function notification(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      this.send({ method: method, params: params });
    }

    /**
     * Create a request object for the given method and params and passes the result to
     * next(err, result).
     * @see {@link  http://www.jsonrpc.org/specification#request_object|JSONRPC Requests}
     *
     * @param {string} method - The RPC method to execute
     * @param {object[]} params - The parameters to execute with the method.
     * @returns {Promise} which is resolved with the response value.
     */

  }, {
    key: 'request',
    value: function request(method) {
      var _this = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      return new _promise2.default(function (resolve, reject) {
        var id = _uuid2.default.v4();

        // Save the resolve/reject callbacks as a deferred. We do this because
        // the response may not occur within the scope of the dispatch method. Example
        // Cross-Domain messaging is sent over postMessage but received via the
        // message event.
        _this.deferreds[id] = { resolve: resolve, reject: reject };

        _this.send({ id: id, method: method, params: params });
      });
    }

    /**
    * Handles a JSONRPC message for the following scenarios:
    * request - Executes the method defined and passes the result to dispatch
    * response - Resolves the promise associated with the id on the response
    * notification - Executes the method defined
    *
    * @param {object} message - The JSONRPC message to handle.
    */

  }, {
    key: 'handle',
    value: function handle(message) {
      // Requests and notifications have methods defined.
      if (message.method) {
        // Requests have ids
        if (message.id) {
          this.handleRequest(message);

          // Notifications have no ids
        } else {
          this.handleNotification(message);
        }

        // Responses have no methods, but have an id
      } else if (message.id) {
        this.handleResponse(message);
      }
    }

    /**
    * Handle a JSONRPC response object and resolve the promise associated to the
    * originating request.
    * @param {object} response - The JSONRPC response object to handle.
    */

  }, {
    key: 'handleResponse',
    value: function handleResponse(response) {
      var deferred = this.deferreds[response.id];
      if (deferred === undefined) {
        return;
      }

      if (response.error) {
        deferred.reject(response.error);
      } else {
        deferred.resolve(response.result);
      }

      delete this.deferreds[response.id];
    }

    /**
    * Handle a JSONRPC request object and execute the method it specifies sending
    * the result to the dispatcher.
    * @param {object} request - The JSONRPC request object to handle.
    */

  }, {
    key: 'handleRequest',
    value: function handleRequest(request) {
      var _this2 = this;

      var method = this.methods[request.method];
      if (typeof method !== 'function') {
        var error = {
          message: 'The method ' + method + ' was not found.',
          code: _errors2.default.METHOD_NOT_FOUND
        };
        this.send({ id: request.id, error: error });
        return;
      }
      // Success
      method.apply(request, request.params).then(function (result) {
        _this2.send({ id: request.id, result: result });
        // Error
      }).catch(function (message) {
        var error = { message: message, code: _errors2.default.INTERNAL_ERROR };
        _this2.send({ id: request.id, error: error });
      });
    }

    /**
    * Handle a JSONRPC notification request and execute the method it specifies.
    * @param {object} request - The JSONRPC notification object to handle.
    */

  }, {
    key: 'handleNotification',
    value: function handleNotification(request) {
      var method = this.methods[request.method];
      if (method && typeof method === 'function') {
        method.apply(request, request.params);
      }
    }
  }]);
  return JSONRPC;
}();

exports.default = (0, _freeze2.default)(JSONRPC);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** URI class for parsing URIs */
var URI = function URI(uri) {
  (0, _classCallCheck3.default)(this, URI);

  var a = document.createElement('a');
  a.href = uri;

  this.protocol = a.protocol;
  this.pathname = a.pathname;

  // In postMessage the default port for each protocol is stripped from
  // the event origin. Exclude it so the origins match up.
  var portMatch = this.protocol === 'http:' ? /(:80)$/ : /(:443)$/;
  this.host = a.host.replace(portMatch, '');

  this.origin = this.protocol + '//' + this.host;
};

exports.default = URI;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(150);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(78);


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// This is the entry point for webpack to distribute assets

// Require all less files and output them as css for non webpack consumers
__webpack_require__(79);

// Require all JS and output as a single js bundle.
// Note, we are requiring the es6 js.
__webpack_require__(80);


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cernerSmartEmbeddableLib = __webpack_require__(81);

var _cernerSmartEmbeddableLib2 = _interopRequireDefault(_cernerSmartEmbeddableLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cernerSmartEmbeddableLib2.default.init(); /* globals window */

_cernerSmartEmbeddableLib2.default.listenForCustomFrameHeight();

window.CernerSmartEmbeddableLib = window.CernerSmartEmbeddableLib || {};
window.CernerSmartEmbeddableLib.calcFrameHeight = _cernerSmartEmbeddableLib2.default.calcFrameHeight;
window.CernerSmartEmbeddableLib.setFrameHeight = _cernerSmartEmbeddableLib2.default.setFrameHeight;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xfc = __webpack_require__(82);

/**
* Wrapper object to initialize the provider's content
* to allow content to embed inside an iframe.
*/
var CernerSmartEmbeddableLib = {

  /**
  * Initializes the provider wrapper object with ACLs.
  */
  init: function init() {
    _xfc.Provider.init({
      acls: ['https://embedded.cerner.com', 'https://embedded.sandboxcerner.com', 'https://embedded.devcerner.com']
    });
  },
  /**
  * Get the frame height.  The default height is HTML's scrollHeight.
  */
  calcFrameHeight: function calcFrameHeight() {
    return window.document.getElementsByTagName('html')[0].scrollHeight;
  },

  /**
  * Pass the height info to the consumer by triggering iframeCustomResizer
  * message with the height detail.
  */
  setFrameHeight: function setFrameHeight(h) {
    _xfc.Provider.trigger('iframeCustomResizer', { height: h });
  },
  /**
  * Listen for iframeCustomResizer message.
  * Calculate the frame height in px and set the height.
  */
  listenForCustomFrameHeight: function listenForCustomFrameHeight() {
    _xfc.Provider.on('iframeCustomResizer', function () {
      var height = window.CernerSmartEmbeddableLib.calcFrameHeight() + 'px';
      CernerSmartEmbeddableLib.setFrameHeight(height);
    });
  }
}; /* global window */

exports.default = CernerSmartEmbeddableLib;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.Provider = undefined;

var _consumer = __webpack_require__(83);

var _consumer2 = _interopRequireDefault(_consumer);

var _provider = __webpack_require__(147);

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.Provider = _provider2.default;
exports.Consumer = _consumer2.default;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _consumer = __webpack_require__(84);

var _consumer2 = _interopRequireDefault(_consumer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = new _consumer2.default();

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(44);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(52);

var _entries2 = _interopRequireDefault(_entries);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _frame = __webpack_require__(105);

var _frame2 = _interopRequireDefault(_frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Consumer = function () {
  function Consumer() {
    (0, _classCallCheck3.default)(this, Consumer);
  }

  (0, _createClass3.default)(Consumer, [{
    key: 'init',

    /**
     * Initialize a consumer.
     * @param  {Array}  globalHandlers - an object containing event handlers that apply to all frames.
     * @example
     * // Each key/value pair in globalHandlers should be a pair of event name and event handler.
     * const handlers = {'eventA': function() {}, 'eventB': function() {}};
     * Consumer.init(handlers);
     */
    value: function init() {
      var globalHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.globalHandlers = globalHandlers;
    }

    /**
     * Mount the given source as an application into the given container.
     * @param {object} container - The DOM element to append the mounted frame to.
     * @param {string} source - The source URL to load the app from.
     * @param {string} options - An optional parameter that contains optional configs
     * @return {Frame} Returns the application that was mounted.
     */

  }, {
    key: 'mount',
    value: function mount(container, source) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var frame = new _frame2.default();
      frame.init(container, source, options);

      // Apply global handlers to the frame
      (0, _entries2.default)(this.globalHandlers).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            event = _ref2[0],
            handler = _ref2[1];

        var handlersArray = [].concat(handler);
        handlersArray.forEach(function (eventHandler) {
          // Add the given event handler to the frame.
          if (typeof eventHandler === 'function') {
            frame.on(event, eventHandler);
          }
        });
      });
      frame.mount();

      return frame;
    }
  }]);
  return Consumer;
}();

exports.default = Consumer;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(20);
module.exports = __webpack_require__(95);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(88);
var step = __webpack_require__(89);
var Iterators = __webpack_require__(11);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(46)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(31);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(4);
var getKeys = __webpack_require__(18);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(32);
var toAbsoluteIndex = __webpack_require__(93);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(33);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(11);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(20);
module.exports = __webpack_require__(98);


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var get = __webpack_require__(38);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(3);
var $entries = __webpack_require__(101)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var getKeys = __webpack_require__(18);
var toIObject = __webpack_require__(8);
var isEnum = __webpack_require__(21).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(44);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(52);

var _entries2 = _interopRequireDefault(_entries);

var _extends2 = __webpack_require__(53);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(40);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(62);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(64);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(69);

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = __webpack_require__(70);

var _logger = __webpack_require__(27);

var _logger2 = _interopRequireDefault(_logger);

var _jsonrpcDispatch = __webpack_require__(71);

var _jsonrpcDispatch2 = _interopRequireDefault(_jsonrpcDispatch);

var _uri = __webpack_require__(75);

var _uri2 = _interopRequireDefault(_uri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Application container class which represents an application frame hosting
 * an app on a 3rd party domain.
 */
var Frame = function (_EventEmitter) {
  (0, _inherits3.default)(Frame, _EventEmitter);

  function Frame(props) {
    (0, _classCallCheck3.default)(this, Frame);

    // Binds 'this' for methods called internally
    var _this = (0, _possibleConstructorReturn3.default)(this, (Frame.__proto__ || (0, _getPrototypeOf2.default)(Frame)).call(this, props));

    _this.handleProviderMessage = _this.handleProviderMessage.bind(_this);
    _this.initIframeResizer = _this.initIframeResizer.bind(_this);
    _this.send = _this.send.bind(_this);
    _this.cleanup = _this.cleanup.bind(_this);
    _this.load = _this.load.bind(_this);
    return _this;
  }

  /**
  * @param {object} container - The DOM node to append the application frame to.
  * @param {string} source - The url source of the application
  * @param {object} options - An optional parameter that contains a set of optional configs
  */


  (0, _createClass3.default)(Frame, [{
    key: 'init',
    value: function init(container, source) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$secret = _ref.secret,
          secret = _ref$secret === undefined ? null : _ref$secret,
          _ref$resizeConfig = _ref.resizeConfig,
          resizeConfig = _ref$resizeConfig === undefined ? {} : _ref$resizeConfig,
          _ref$iframeAttrs = _ref.iframeAttrs,
          iframeAttrs = _ref$iframeAttrs === undefined ? {} : _ref$iframeAttrs;

      this.source = source;
      this.container = container;
      this.iframe = null;
      this.iframeAttrs = iframeAttrs;
      this.wrapper = null;
      this.origin = new _uri2.default(this.source).origin;
      this.secret = secret;
      this.resizeConfig = resizeConfig;

      var self = this;
      this.JSONRPC = new _jsonrpcDispatch2.default(self.send, {
        launch: function launch() {
          self.wrapper.setAttribute('data-status', 'launched');
          self.emit('xfc.launched');
          return _promise2.default.resolve();
        },
        authorized: function authorized() {
          var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          self.wrapper.setAttribute('data-status', 'authorized');
          self.emit('xfc.authorized', detail);
          self.initIframeResizer();
          return _promise2.default.resolve();
        },
        unload: function unload() {
          var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          self.wrapper.setAttribute('data-status', 'unloaded');
          self.emit('xfc.unload', detail);
          return _promise2.default.resolve();
        },
        resize: function resize() {
          var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          if (typeof resizeConfig.customCalculationMethod === 'function') {
            resizeConfig.customCalculationMethod.call(self.iframe);
            return _promise2.default.resolve();
          }

          if (height) {
            self.iframe.style.height = height;
          }

          if (width) {
            self.iframe.style.width = width;
          }
          return _promise2.default.resolve();
        },
        event: function event(_event, detail) {
          self.emit(_event, detail);
          return _promise2.default.resolve();
        },
        authorizeConsumer: function authorizeConsumer() {
          return _promise2.default.resolve('hello');
        },
        challengeConsumer: function challengeConsumer() {
          return _promise2.default.resolve(self.secret);
        },
        loadPage: function loadPage(url) {
          self.load(url);
          return _promise2.default.resolve();
        }
      });
    }
  }, {
    key: 'initIframeResizer',
    value: function initIframeResizer() {
      var config = this.resizeConfig;

      // If user chooses to use fixedHeight or fixedWidth,
      // set height/width to the specified value and keep unchanged.
      if (config.fixedHeight || config.fixedWidth) {
        if (config.fixedHeight) {
          this.iframe.style.height = config.fixedHeight;
        }
        if (config.fixedWidth) {
          this.iframe.style.width = config.fixedWidth;
        }
      } else {
        // If user chooses to update iframe dynamically,
        // replace customCalculationMethod by a boolean indicator
        // in config because method is not transferrable.
        if (typeof config.customCalculationMethod === 'function') {
          config = (0, _extends3.default)({}, config);
          config.customCal = true;
          delete config.customCalculationMethod;
        }
        this.JSONRPC.notification('resize', [config]);
      }
    }

    /**
    * Mount this application onto its container and initiate resize sync.
    */

  }, {
    key: 'mount',
    value: function mount() {
      if (this.iframe) return;

      // Set up listener for all incoming communication
      window.addEventListener('message', this.handleProviderMessage);

      this.wrapper = document.createElement('div');
      this.wrapper.className = 'xfc';
      this.wrapper.setAttribute('data-status', 'mounted');
      this.container.appendChild(this.wrapper);

      var iframe = document.createElement('iframe');
      iframe.src = this.source;
      if (!this.resizeConfig.scrolling) {
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';
      }

      // Put custom attributes on iframe if specified
      (0, _entries2.default)(this.iframeAttrs).forEach(function (_ref2) {
        var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        iframe.setAttribute(key, value);
      });

      this.iframe = iframe;
      this.wrapper.appendChild(iframe);

      this.emit('xfc.mounted');
    }

    /**
     * Unmount this application from its container
     */

  }, {
    key: 'unmount',
    value: function unmount() {
      if (this.wrapper.parentNode === this.container) {
        this.container.removeChild(this.wrapper);
        this.emit('xfc.unmounted');
        this.cleanup();
      }
    }

    /**
     * Cleans up unused message listeners and references of detached nodes
     */

  }, {
    key: 'cleanup',
    value: function cleanup() {
      // Remove listener for all incoming communication
      window.removeEventListener('message', this.handleProviderMessage);

      // Sets references of detached nodes to null to avoid potential memory leak
      this.iframe = null;
      this.wrapper = null;
    }

    /**
     * Loads a new page within existing frame.
     * @param  {string} url - the URL of new page to load.
     */

  }, {
    key: 'load',
    value: function load(url) {
      this.origin = new _uri2.default(url).origin;
      this.source = url;
      this.wrapper.setAttribute('data-status', 'mounted');
      this.iframe.src = url; // Triggers the loading of new page
    }

    /**
    * Handles an incoming message event by processing the JSONRPC request
    * @param {object} event - The emitted message event.
    */

  }, {
    key: 'handleProviderMessage',
    value: function handleProviderMessage(event) {
      // 1. This isn't a JSONRPC message or iframe is null, exit.
      if (!event.data.jsonrpc || !this.iframe) return;

      // 2. Identify the app the message came from.
      if (this.iframe.contentWindow !== event.source) return;

      // For Chrome, the origin property is in the event.originalEvent object.
      // Update origin so it can be used to post back to this frame.
      this.origin = event.origin || event.originalEvent.origin;

      _logger2.default.log('<< consumer', event.origin, event.data);

      // 3. Send a response, if any, back to the app.
      this.JSONRPC.handle(event.data);
    }

    /**
    * Post the given message to the application frame.
    * @param {object} message - The message to post.
    * See: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    */

  }, {
    key: 'send',
    value: function send(message) {
      if (message) {
        _logger2.default.log('>> consumer', this.origin, message);
        this.iframe.contentWindow.postMessage(message, this.origin);
      }
    }

    /**
    * Triggers an event within the embedded application.
    * @param {string} event - The event name to trigger.
    * @param {object} detail - The data context to send with the event.
    */

  }, {
    key: 'trigger',
    value: function trigger(event, detail) {
      this.JSONRPC.notification('event', [event, detail]);
    }
  }]);
  return Frame;
}(_events.EventEmitter);

exports.default = Frame;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(109) });


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(5);
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(21);
var toObject = __webpack_require__(19);
var IObject = __webpack_require__(45);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(20);
__webpack_require__(23);
__webpack_require__(111);
__webpack_require__(119);
__webpack_require__(120);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(16);
var global = __webpack_require__(1);
var ctx = __webpack_require__(12);
var classof = __webpack_require__(37);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(112);
var forOf = __webpack_require__(113);
var speciesConstructor = __webpack_require__(57);
var task = __webpack_require__(58).set;
var microtask = __webpack_require__(115)();
var newPromiseCapabilityModule = __webpack_require__(41);
var perform = __webpack_require__(59);
var userAgent = __webpack_require__(116);
var promiseResolve = __webpack_require__(60);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(117)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(118)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(61)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(12);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(32);
var getIterFn = __webpack_require__(38);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 114 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(58).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(15)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(5);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(57);
var promiseResolve = __webpack_require__(60);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(41);
var perform = __webpack_require__(59);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(19);
var $getPrototypeOf = __webpack_require__(51);

__webpack_require__(63)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(23);
module.exports = __webpack_require__(42).f('iterator');


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(127);
__webpack_require__(54);
__webpack_require__(131);
__webpack_require__(132);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(5);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(48);
var META = __webpack_require__(66).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(35);
var setToStringTag = __webpack_require__(26);
var uid = __webpack_require__(25);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(42);
var wksDefine = __webpack_require__(43);
var enumKeys = __webpack_require__(128);
var isArray = __webpack_require__(129);
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var toObject = __webpack_require__(19);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(30);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(31);
var gOPNExt = __webpack_require__(130);
var $GOPD = __webpack_require__(68);
var $GOPS = __webpack_require__(39);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(18);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(21).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(16)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(21);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(15);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(67).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('asyncIterator');


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('observable');


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(136).set });


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(4);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(12)(Function.call, __webpack_require__(68).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(31) });


/***/ }),
/* 140 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(7);
var meta = __webpack_require__(66).onFreeze;

__webpack_require__(63)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var v1 = __webpack_require__(144);
var v4 = __webpack_require__(145);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(73);
var bytesToUuid = __webpack_require__(74);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(73);
var bytesToUuid = __webpack_require__(74);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _freeze = __webpack_require__(72);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// http://www.jsonrpc.org/specification#error_object
var PARSE_ERROR = (0, _freeze2.default)({ message: 'Parse error', code: -32700 });
var INVALID_REQUEST = (0, _freeze2.default)({ message: 'Invalid request', code: -32600 });
var METHOD_NOT_FOUND = (0, _freeze2.default)({ message: 'Method not found', code: -32601 });
var INVALID_PARAMS = (0, _freeze2.default)({ message: 'Invalid params', code: -32602 });
var INTERNAL_ERROR = (0, _freeze2.default)({ message: 'Internal error', code: -32603 });

module.exports = (0, _freeze2.default)({
  PARSE_ERROR: PARSE_ERROR,
  INVALID_REQUEST: INVALID_REQUEST,
  METHOD_NOT_FOUND: METHOD_NOT_FOUND,
  INVALID_PARAMS: INVALID_PARAMS,
  INTERNAL_ERROR: INTERNAL_ERROR
});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _provider = __webpack_require__(148);

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = new _provider2.default();

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _application = __webpack_require__(149);

var _application2 = _interopRequireDefault(_application);

var _logger = __webpack_require__(27);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Provider = function () {
  function Provider() {
    (0, _classCallCheck3.default)(this, Provider);
  }

  (0, _createClass3.default)(Provider, [{
    key: 'init',
    value: function init(config) {
      var enforceSecurity = config.secret || config.acls.some(function (x) {
        return x !== '*';
      });

      // Set hidden attribute with script if not present and security is being enforced
      if (enforceSecurity && window.self !== window.top && !(document.documentElement.hasAttribute && document.documentElement.hasAttribute('hidden'))) {
        document.documentElement.setAttribute('hidden', null);

        // WARNING: Setting hidden attribute with script can be countered by
        // hackers using iframe sandbox attribute OR a frame busting technique.
        _logger2.default.warn('Security warning: Hidden attribute not detected on document and has been added.');
      }

      this.application = new _application2.default();
      this.application.init(config);
      this.application.launch();
    }
  }, {
    key: 'on',
    value: function on(eventName, listener) {
      this.application.on(eventName, listener);
    }
  }, {
    key: 'fullscreen',
    value: function fullscreen(source) {
      this.application.fullscreen(source);
    }
  }, {
    key: 'httpError',
    value: function httpError(error) {
      this.application.httpError(error);
    }
  }, {
    key: 'trigger',
    value: function trigger(event, detail) {
      this.application.trigger(event, detail);
    }
  }, {
    key: 'loadPage',
    value: function loadPage(url) {
      this.application.loadPage(url);
    }
  }]);
  return Provider;
}();

exports.default = Provider;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(76);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = __webpack_require__(40);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(62);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(64);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(69);

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsonrpcDispatch = __webpack_require__(71);

var _jsonrpcDispatch2 = _interopRequireDefault(_jsonrpcDispatch);

var _string = __webpack_require__(154);

var _events = __webpack_require__(70);

var _uri = __webpack_require__(75);

var _uri2 = _interopRequireDefault(_uri);

var _logger = __webpack_require__(27);

var _logger2 = _interopRequireDefault(_logger);

var _dimension = __webpack_require__(155);

var _mutationObserver = __webpack_require__(156);

var _mutationObserver2 = _interopRequireDefault(_mutationObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Application class which represents an embedded application. */
var Application = function (_EventEmitter) {
  (0, _inherits3.default)(Application, _EventEmitter);

  function Application() {
    (0, _classCallCheck3.default)(this, Application);
    return (0, _possibleConstructorReturn3.default)(this, (Application.__proto__ || (0, _getPrototypeOf2.default)(Application)).apply(this, arguments));
  }

  (0, _createClass3.default)(Application, [{
    key: 'init',

    /**
     * init method
     * @param  options.acls            An array that contains white listed origins
     * @param  options.secret          A string or function used for authorization with Consumer
     * @param  options.onReady         A function that will be called after App is authorized
     * @param  options.targetSelectors A DOMString containing one or more selectors to match against.
     *                                 This string must be a valid CSS selector string; if it's not,
     *                                 a SyntaxError exception is thrown.
     */
    value: function init(_ref) {
      var _ref$acls = _ref.acls,
          acls = _ref$acls === undefined ? [] : _ref$acls,
          _ref$secret = _ref.secret,
          secret = _ref$secret === undefined ? null : _ref$secret,
          _ref$onReady = _ref.onReady,
          onReady = _ref$onReady === undefined ? null : _ref$onReady,
          _ref$targetSelectors = _ref.targetSelectors,
          targetSelectors = _ref$targetSelectors === undefined ? '' : _ref$targetSelectors;

      this.acls = [].concat(acls);
      this.secret = secret;
      this.onReady = onReady;
      this.targetSelectors = targetSelectors;
      this.resizeConfig = null;
      this.requestResize = this.requestResize.bind(this);
      this.handleConsumerMessage = this.handleConsumerMessage.bind(this);
      this.authorizeConsumer = this.authorizeConsumer.bind(this);
      this.verifyChallenge = this.verifyChallenge.bind(this);
      this.emitError = this.emitError.bind(this);
      this.unload = this.unload.bind(this);

      // Resize for slow loading images
      document.addEventListener('load', this.imageRequestResize.bind(this), true);

      var self = this;
      this.JSONRPC = new _jsonrpcDispatch2.default(self.send.bind(self), {
        event: function event(_event, detail) {
          self.emit(_event, detail);
          return _promise2.default.resolve();
        },
        resize: function resize() {
          var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          self.resizeConfig = config;

          self.requestResize();

          // Registers a mutation observer for body
          var observer = new _mutationObserver2.default(function (mutations) {
            return self.requestResize();
          });
          observer.observe(document.body, { attributes: true, childList: true, characterData: true, subtree: true });

          // Registers a listener to window.onresize
          // Optimizes the listener by debouncing (https://bencentra.com/code/2015/02/27/optimizing-window-resize.html#debouncing)
          var interval = 100; // Resize event will be considered complete if no follow-up events within `interval` ms.
          var resizeTimer = null;
          window.onresize = function (event) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
              return self.requestResize();
            }, interval);
          };

          return _promise2.default.resolve();
        }
      });
    }

    /**
     * imageRequestResize function to call requestResize event for slow loading image
     * @param {object} event - event which triggered the listener
     */

  }, {
    key: 'imageRequestResize',
    value: function imageRequestResize(event) {
      var tgt = event.target;
      if (tgt.tagName === 'IMG' && !(tgt.hasAttribute('height') || tgt.hasAttribute('width'))) {
        this.requestResize();
      }
    }
  }, {
    key: 'requestResize',
    value: function requestResize() {
      if (!this.resizeConfig) return;
      if (this.resizeConfig.customCal) {
        this.JSONRPC.notification('resize');
      } else if (this.resizeConfig.autoResizeWidth) {
        var width = (0, _dimension.calculateWidth)(this.resizeConfig.WidthCalculationMethod);
        this.JSONRPC.notification('resize', [null, width + 'px']);
      } else {
        var height = (0, _dimension.calculateHeight)(this.resizeConfig.heightCalculationMethod);

        // If targetSelectors is specified from Provider or Consumer or both,
        // need to calculate the height based on specified target selectors
        if (this.targetSelectors || this.resizeConfig.targetSelectors) {
          // Combines target selectors from two sources
          var targetSelectors = [this.targetSelectors, this.resizeConfig.targetSelectors].filter(function (val) {
            return val;
          }).join(', ');

          var heights = [].slice.call(document.querySelectorAll(targetSelectors)).map(_dimension.getOffsetHeightToBody);

          height = Math.max.apply(Math, (0, _toConsumableArray3.default)(heights).concat([height]));
        }

        this.JSONRPC.notification('resize', [height + 'px']);
      }
    }

    /**
    * Triggers an event in the parent application.
    * @param {string} event - The event name to trigger.
    * @param {object} detail - The data context to send with the event.
    */

  }, {
    key: 'trigger',
    value: function trigger(event, detail) {
      this.JSONRPC.notification('event', [event, detail]);
    }

    /**
    * Request to mount an application fullscreen.
    * @param {string} url - The url of the application to mount.
    */

  }, {
    key: 'fullscreen',
    value: function fullscreen(url) {
      this.trigger('xfc.fullscreen', url);
    }

    /**
     * Sends http errors to consumer.
     * @param  {object} error - an object containing error details
     */

  }, {
    key: 'httpError',
    value: function httpError() {
      var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.trigger('xfc.provider.httpError', error);
    }

    /**
     * Request to load a new page of given url
     * @param  {string} url - The url of the new page.
     */

  }, {
    key: 'loadPage',
    value: function loadPage(url) {
      this.JSONRPC.notification('loadPage', [url]);
    }

    /**
    * Launches the provider app and begins the authorization sequence.
    */

  }, {
    key: 'launch',
    value: function launch() {
      if (window.self !== window.top) {
        // 1: Setup listeners for all incoming communication and beforeunload
        window.addEventListener('message', this.handleConsumerMessage);
        window.addEventListener('beforeunload', this.unload);

        // 2: Begin launch and authorization sequence
        this.JSONRPC.notification('launch');

        // 2a. We have a specific origin to trust (excluding wildcard *),
        // wait for response to authorize.
        if (this.acls.some(function (x) {
          return x !== '*';
        })) {
          this.JSONRPC.request('authorizeConsumer', []).then(this.authorizeConsumer).catch(this.emitError);

          // 2b. We don't know who to trust, challenge parent for secret
        } else if (this.secret) {
          this.JSONRPC.request('challengeConsumer', []).then(this.verifyChallenge).catch(this.emitError);

          // 2c. acl is '*' and there is no secret, immediately authorize content
        } else {
          this.authorizeConsumer();
        }

        // If not embedded, immediately authorize content
      } else {
        this.authorizeConsumer();
      }
    }

    /**
    * Handles an incoming message event by processing the JSONRPC request
    * @param {object} event - The emitted message event.
    */

  }, {
    key: 'handleConsumerMessage',
    value: function handleConsumerMessage(event) {
      // Ignore Non-JSONRPC messages or messages not from the parent frame
      if (!event.data.jsonrpc || event.source !== window.parent) {
        return;
      }

      _logger2.default.log('<< provider', event.origin, event.data);
      // For Chrome, the origin property is in the event.originalEvent object
      var origin = event.origin || event.originalEvent.origin;
      if (!this.activeACL && this.acls.indexOf(origin) !== -1) {
        this.activeACL = origin;
      }

      if (this.acls.indexOf('*') !== -1 || this.acls.indexOf(origin) !== -1) {
        this.JSONRPC.handle(event.data);
      }
    }

    /**
    * Send the given message to the frame parent.
    * @param {object} message - The message to send.
    */

  }, {
    key: 'send',
    value: function send(message) {
      // Dont' send messages if not embedded
      if (window.self === window.top) {
        return;
      }

      if (this.acls.length < 1) {
        _logger2.default.error('Message not sent, no acls provided.');
      }

      if (message) {
        _logger2.default.log('>> provider', this.acls, message);
        if (this.activeACL) {
          parent.postMessage(message, this.activeACL);
        } else {
          this.acls.forEach(function (uri) {
            return parent.postMessage(message, uri);
          });
        }
      }
    }

    /**
    * Verify the challange made to the parent frame.
    * @param {string} secretAttempt - The secret string to verify
    */

  }, {
    key: 'verifyChallenge',
    value: function verifyChallenge(secretAttempt) {
      var _this2 = this;

      var authorize = function authorize() {
        _this2.acls = ['*'];
        _this2.authorizeConsumer();
      };

      if (typeof this.secret === 'string' && (0, _string.fixedTimeCompare)(this.secret, secretAttempt)) {
        authorize();
      } else if (typeof this.secret === 'function') {
        return this.secret.call(this, secretAttempt).then(authorize);
      }
      return _promise2.default.resolve();
    }

    /**
    * Authorize the parent frame by unhiding the container.
    */

  }, {
    key: 'authorizeConsumer',
    value: function authorizeConsumer() {
      document.documentElement.removeAttribute('hidden');

      // Emit a ready event
      this.emit('xfc.ready');
      this.JSONRPC.notification('authorized', [{ url: window.location.href }]);

      // If there is an onReady callback, execute it
      if (typeof this.onReady === 'function') {
        this.onReady.call(this);
      }
    }

    /**
     * Emit the given error
     * @param  {object} error - an error object containing error code and error message
     */

  }, {
    key: 'emitError',
    value: function emitError(error) {
      this.emit('xfc.error', error);
    }
  }, {
    key: 'unload',
    value: function unload() {
      // These patterns trigger unload events but don't actually unload the page
      var protocols = /^(tel|mailto|fax|sms|callto):/;
      var element = document.activeElement;

      if (!element || !(element.hasAttribute && element.hasAttribute('download') || protocols.test(element.href))) {
        this.JSONRPC.notification('unload');
        this.trigger('xfc.unload');
      }
    }
  }]);
  return Application;
}(_events.EventEmitter);

exports.default = Application;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(152);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(12);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(19);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var toLength = __webpack_require__(32);
var createProperty = __webpack_require__(153);
var getIterFn = __webpack_require__(38);

$export($export.S + $export.F * !__webpack_require__(61)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6);
var createDesc = __webpack_require__(17);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Comparison algorithm to prevent timing attacks.
* See: https://en.wikipedia.org/wiki/Timing_attack
* @param {String} v1 - The first value to compare
* @param {String} v2 - The second value to compare
* @return {boolean} True if the strings are equivalent, false otherwise.
*/
function fixedTimeCompare(v1, v2) {
  var compare = function compare(value, current, index) {
    return value | v1.charCodeAt(index) ^ v2.charCodeAt(index);
  };

  return v1.split('').reduce(compare, v1.length ^ v2.length) < 1;
}

exports.fixedTimeCompare = fixedTimeCompare;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(76);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.calculateHeight = calculateHeight;
exports.calculateWidth = calculateWidth;
exports.getOffsetToBody = getOffsetToBody;
exports.getOffsetHeightToBody = getOffsetHeightToBody;

var _logger = __webpack_require__(27);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComputedStyle(prop) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  var result = null;
  if ('getComputedStyle' in window) {
    result = window.getComputedStyle(el, null);
  } else {
    result = document.defaultView.getComputedStyle(el, null);
  }
  return result !== null ? parseInt(result[prop], 10) : 0;
}

function getAllMeasures(dimension) {
  return [dimension.bodyOffset(), dimension.bodyScroll(), dimension.documentElementOffset(), dimension.documentElementScroll()];
}

var getHeight = {
  bodyOffset: function bodyOffset() {
    return document.body.offsetHeight + getComputedStyle('marginTop') + getComputedStyle('marginBottom');
  },

  bodyScroll: function bodyScroll() {
    return document.body.scrollHeight;
  },

  documentElementOffset: function documentElementOffset() {
    return document.documentElement.offsetHeight;
  },

  documentElementScroll: function documentElementScroll() {
    return document.documentElement.scrollHeight;
  },

  max: function max() {
    return Math.max.apply(Math, (0, _toConsumableArray3.default)(getAllMeasures(getHeight)));
  },

  min: function min() {
    return Math.min.apply(Math, (0, _toConsumableArray3.default)(getAllMeasures(getHeight)));
  }
};

var getWidth = {
  bodyOffset: function bodyOffset() {
    return document.body.offsetWidth;
  },

  bodyScroll: function bodyScroll() {
    return document.body.scrollWidth;
  },

  documentElementOffset: function documentElementOffset() {
    return document.documentElement.offsetWidth;
  },

  documentElementScroll: function documentElementScroll() {
    return document.documentElement.scrollWidth;
  },

  scroll: function scroll() {
    return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll());
  },

  max: function max() {
    return Math.max.apply(Math, (0, _toConsumableArray3.default)(getAllMeasures(getWidth)));
  },

  min: function min() {
    return Math.min.apply(Math, (0, _toConsumableArray3.default)(getAllMeasures(getWidth)));
  }
};

function calculateHeight() {
  var calMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bodyOffset';

  if (!(calMethod in getHeight)) {
    _logger2.default.error('\'' + calMethod + '\' is not a valid method name!');
  }
  return getHeight[calMethod]();
}

function calculateWidth() {
  var calMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scroll';

  if (!(calMethod in getWidth)) {
    _logger2.default.error('\'' + calMethod + '\' is not a valid method name!');
  }
  return getWidth[calMethod]();
}

/**
 * This function returns the offset height of the given node relative to the top of document.body
 */
function getOffsetToBody(node) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  // If the given node is body or null, return 0
  if (!node || node === window.document.body) {
    return 0;
  }

  // Stops if the offset parent node is body;
  // Otherwise keep searching up
  // NOTE: offsetParent will return null on Webkit if the element is hidden
  //       (the style.display of this element or any ancestor is "none") or
  //       if the style.position of the element itself is set to "fixed"
  //       See reference at https://developer.mozilla.org/en-US/docs/Web/API/HTMLelement/offsetParent#Compatibility
  var calculatedOffset = node.offsetTop + offset;
  var offsetParent = node.offsetParent;

  if (offsetParent === window.document.body) {
    return calculatedOffset;
  }

  return getOffsetToBody(offsetParent, calculatedOffset);
}

/**
 * This function returns the offset height of the given node relative to the top of document.body
 *
 * @note We are explicitly using the scrollHeight here since offsetHeight doesn't include any ::before or ::after
 * pseudo-elements, which can throw off the actual total height of the element. From the MDN web docs,
 *
 * scrollHeight:
 * > is a measurement of the height of an element's content, including content not visible on the screen due to
 * > overflow...is equal to the minimum height the element would require in order to fit all the content in the
 * > viewport without using a vertical scrollbar
 *
 * offsetHeight:
 * > is a measurement in pixels of the element's CSS height, including any borders, padding, and horizontal scrollbars
 * > (if rendered). It does not include the height of pseudo-elements such as ::before or ::after
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
 */
function getOffsetHeightToBody(node) {
  return !node ? 0 : getOffsetToBody(node) + node.scrollHeight;
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

/*
 * Copyright 2012 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

var WeakMap = window.WeakMap;

if (typeof WeakMap === 'undefined') {
  var defineProperty = Object.defineProperty;
  var counter = Date.now() % 1e9;

  WeakMap = function WeakMap() {
    this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
  };

  WeakMap.prototype = {
    set: function set(key, value) {
      var entry = key[this.name];
      if (entry && entry[0] === key) entry[1] = value;else defineProperty(key, this.name, { value: [key, value], writable: true });
      return this;
    },
    get: function get(key) {
      var entry;
      return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
    },
    'delete': function _delete(key) {
      var entry = key[this.name];
      if (!entry) return false;
      var hasValue = entry[0] === key;
      entry[0] = entry[1] = undefined;
      return hasValue;
    },
    has: function has(key) {
      var entry = key[this.name];
      if (!entry) return false;
      return entry[0] === key;
    }
  };
}

var registrationsTable = new WeakMap();

// We use setImmediate or postMessage for our future callback.
var setImmediate = window.msSetImmediate;

// Use post message to emulate setImmediate.
if (!setImmediate) {
  var setImmediateQueue = [];
  var sentinel = String(Math.random());
  window.addEventListener('message', function (e) {
    if (e.data === sentinel) {
      var queue = setImmediateQueue;
      setImmediateQueue = [];
      queue.forEach(function (func) {
        func();
      });
    }
  });
  setImmediate = function setImmediate(func) {
    setImmediateQueue.push(func);
    window.postMessage(sentinel, '*');
  };
}

// This is used to ensure that we never schedule 2 callas to setImmediate
var isScheduled = false;

// Keep track of observers that needs to be notified next time.
var scheduledObservers = [];

/**
 * Schedules |dispatchCallback| to be called in the future.
 * @param {MutationObserver} observer
 */
function scheduleCallback(observer) {
  scheduledObservers.push(observer);
  if (!isScheduled) {
    isScheduled = true;
    setImmediate(dispatchCallbacks);
  }
}

function wrapIfNeeded(node) {
  return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
}

function dispatchCallbacks() {
  // http://dom.spec.whatwg.org/#mutation-observers

  isScheduled = false; // Used to allow a new setImmediate call above.

  var observers = scheduledObservers;
  scheduledObservers = [];
  // Sort observers based on their creation UID (incremental).
  observers.sort(function (o1, o2) {
    return o1.uid_ - o2.uid_;
  });

  var anyNonEmpty = false;
  observers.forEach(function (observer) {

    // 2.1, 2.2
    var queue = observer.takeRecords();
    // 2.3. Remove all transient registered observers whose observer is mo.
    removeTransientObserversFor(observer);

    // 2.4
    if (queue.length) {
      observer.callback_(queue, observer);
      anyNonEmpty = true;
    }
  });

  // 3.
  if (anyNonEmpty) dispatchCallbacks();
}

function removeTransientObserversFor(observer) {
  observer.nodes_.forEach(function (node) {
    var registrations = registrationsTable.get(node);
    if (!registrations) return;
    registrations.forEach(function (registration) {
      if (registration.observer === observer) registration.removeTransientObservers();
    });
  });
}

/**
 * This function is used for the "For each registered observer observer (with
 * observer's options as options) in target's list of registered observers,
 * run these substeps:" and the "For each ancestor ancestor of target, and for
 * each registered observer observer (with options options) in ancestor's list
 * of registered observers, run these substeps:" part of the algorithms. The
 * |options.subtree| is checked to ensure that the callback is called
 * correctly.
 *
 * @param {Node} target
 * @param {function(MutationObserverInit):MutationRecord} callback
 */
function forEachAncestorAndObserverEnqueueRecord(target, callback) {
  for (var node = target; node; node = node.parentNode) {
    var registrations = registrationsTable.get(node);

    if (registrations) {
      for (var j = 0; j < registrations.length; j++) {
        var registration = registrations[j];
        var options = registration.options;

        // Only target ignores subtree.
        if (node !== target && !options.subtree) continue;

        var record = callback(options);
        if (record) registration.enqueue(record);
      }
    }
  }
}

var uidCounter = 0;

/**
 * The class that maps to the DOM MutationObserver interface.
 * @param {Function} callback.
 * @constructor
 */
function JsMutationObserver(callback) {
  this.callback_ = callback;
  this.nodes_ = [];
  this.records_ = [];
  this.uid_ = ++uidCounter;
}

JsMutationObserver.prototype = {
  observe: function observe(target, options) {
    target = wrapIfNeeded(target);

    // 1.1
    if (!options.childList && !options.attributes && !options.characterData ||

    // 1.2
    options.attributeOldValue && !options.attributes ||

    // 1.3
    options.attributeFilter && options.attributeFilter.length && !options.attributes ||

    // 1.4
    options.characterDataOldValue && !options.characterData) {

      throw new SyntaxError();
    }

    var registrations = registrationsTable.get(target);
    if (!registrations) registrationsTable.set(target, registrations = []);

    // 2
    // If target's list of registered observers already includes a registered
    // observer associated with the context object, replace that registered
    // observer's options with options.
    var registration;
    for (var i = 0; i < registrations.length; i++) {
      if (registrations[i].observer === this) {
        registration = registrations[i];
        registration.removeListeners();
        registration.options = options;
        break;
      }
    }

    // 3.
    // Otherwise, add a new registered observer to target's list of registered
    // observers with the context object as the observer and options as the
    // options, and add target to context object's list of nodes on which it
    // is registered.
    if (!registration) {
      registration = new Registration(this, target, options);
      registrations.push(registration);
      this.nodes_.push(target);
    }

    registration.addListeners();
  },

  disconnect: function disconnect() {
    this.nodes_.forEach(function (node) {
      var registrations = registrationsTable.get(node);
      for (var i = 0; i < registrations.length; i++) {
        var registration = registrations[i];
        if (registration.observer === this) {
          registration.removeListeners();
          registrations.splice(i, 1);
          // Each node can only have one registered observer associated with
          // this observer.
          break;
        }
      }
    }, this);
    this.records_ = [];
  },

  takeRecords: function takeRecords() {
    var copyOfRecords = this.records_;
    this.records_ = [];
    return copyOfRecords;
  }
};

/**
 * @param {string} type
 * @param {Node} target
 * @constructor
 */
function MutationRecord(type, target) {
  this.type = type;
  this.target = target;
  this.addedNodes = [];
  this.removedNodes = [];
  this.previousSibling = null;
  this.nextSibling = null;
  this.attributeName = null;
  this.attributeNamespace = null;
  this.oldValue = null;
}

function copyMutationRecord(original) {
  var record = new MutationRecord(original.type, original.target);
  record.addedNodes = original.addedNodes.slice();
  record.removedNodes = original.removedNodes.slice();
  record.previousSibling = original.previousSibling;
  record.nextSibling = original.nextSibling;
  record.attributeName = original.attributeName;
  record.attributeNamespace = original.attributeNamespace;
  record.oldValue = original.oldValue;
  return record;
};

// We keep track of the two (possibly one) records used in a single mutation.
var currentRecord, recordWithOldValue;

/**
 * Creates a record without |oldValue| and caches it as |currentRecord| for
 * later use.
 * @param {string} oldValue
 * @return {MutationRecord}
 */
function getRecord(type, target) {
  return currentRecord = new MutationRecord(type, target);
}

/**
 * Gets or creates a record with |oldValue| based in the |currentRecord|
 * @param {string} oldValue
 * @return {MutationRecord}
 */
function getRecordWithOldValue(oldValue) {
  if (recordWithOldValue) return recordWithOldValue;
  recordWithOldValue = copyMutationRecord(currentRecord);
  recordWithOldValue.oldValue = oldValue;
  return recordWithOldValue;
}

function clearRecords() {
  currentRecord = recordWithOldValue = undefined;
}

/**
 * @param {MutationRecord} record
 * @return {boolean} Whether the record represents a record from the current
 * mutation event.
 */
function recordRepresentsCurrentMutation(record) {
  return record === recordWithOldValue || record === currentRecord;
}

/**
 * Selects which record, if any, to replace the last record in the queue.
 * This returns |null| if no record should be replaced.
 *
 * @param {MutationRecord} lastRecord
 * @param {MutationRecord} newRecord
 * @param {MutationRecord}
 */
function selectRecord(lastRecord, newRecord) {
  if (lastRecord === newRecord) return lastRecord;

  // Check if the the record we are adding represents the same record. If
  // so, we keep the one with the oldValue in it.
  if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;

  return null;
}

/**
 * Class used to represent a registered observer.
 * @param {MutationObserver} observer
 * @param {Node} target
 * @param {MutationObserverInit} options
 * @constructor
 */
function Registration(observer, target, options) {
  this.observer = observer;
  this.target = target;
  this.options = options;
  this.transientObservedNodes = [];
}

Registration.prototype = {
  enqueue: function enqueue(record) {
    var records = this.observer.records_;
    var length = records.length;

    // There are cases where we replace the last record with the new record.
    // For example if the record represents the same mutation we need to use
    // the one with the oldValue. If we get same record (this can happen as we
    // walk up the tree) we ignore the new record.
    if (records.length > 0) {
      var lastRecord = records[length - 1];
      var recordToReplaceLast = selectRecord(lastRecord, record);
      if (recordToReplaceLast) {
        records[length - 1] = recordToReplaceLast;
        return;
      }
    } else {
      scheduleCallback(this.observer);
    }

    records[length] = record;
  },

  addListeners: function addListeners() {
    this.addListeners_(this.target);
  },

  addListeners_: function addListeners_(node) {
    var options = this.options;
    if (options.attributes) node.addEventListener('DOMAttrModified', this, true);

    if (options.characterData) node.addEventListener('DOMCharacterDataModified', this, true);

    if (options.childList) node.addEventListener('DOMNodeInserted', this, true);

    if (options.childList || options.subtree) node.addEventListener('DOMNodeRemoved', this, true);
  },

  removeListeners: function removeListeners() {
    this.removeListeners_(this.target);
  },

  removeListeners_: function removeListeners_(node) {
    var options = this.options;
    if (options.attributes) node.removeEventListener('DOMAttrModified', this, true);

    if (options.characterData) node.removeEventListener('DOMCharacterDataModified', this, true);

    if (options.childList) node.removeEventListener('DOMNodeInserted', this, true);

    if (options.childList || options.subtree) node.removeEventListener('DOMNodeRemoved', this, true);
  },

  /**
   * Adds a transient observer on node. The transient observer gets removed
   * next time we deliver the change records.
   * @param {Node} node
   */
  addTransientObserver: function addTransientObserver(node) {
    // Don't add transient observers on the target itself. We already have all
    // the required listeners set up on the target.
    if (node === this.target) return;

    this.addListeners_(node);
    this.transientObservedNodes.push(node);
    var registrations = registrationsTable.get(node);
    if (!registrations) registrationsTable.set(node, registrations = []);

    // We know that registrations does not contain this because we already
    // checked if node === this.target.
    registrations.push(this);
  },

  removeTransientObservers: function removeTransientObservers() {
    var transientObservedNodes = this.transientObservedNodes;
    this.transientObservedNodes = [];

    transientObservedNodes.forEach(function (node) {
      // Transient observers are never added to the target.
      this.removeListeners_(node);

      var registrations = registrationsTable.get(node);
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i] === this) {
          registrations.splice(i, 1);
          // Each node can only have one registered observer associated with
          // this observer.
          break;
        }
      }
    }, this);
  },

  handleEvent: function handleEvent(e) {
    // Stop propagation since we are managing the propagation manually.
    // This means that other mutation events on the page will not work
    // correctly but that is by design.
    e.stopImmediatePropagation();

    switch (e.type) {
      case 'DOMAttrModified':
        // http://dom.spec.whatwg.org/#concept-mo-queue-attributes

        var name = e.attrName;
        var namespace = e.relatedNode.namespaceURI;
        var target = e.target;

        // 1.
        var record = new getRecord('attributes', target);
        record.attributeName = name;
        record.attributeNamespace = namespace;

        // 2.
        var oldValue = null;
        if (!(typeof MutationEvent !== 'undefined' && e.attrChange === MutationEvent.ADDITION)) oldValue = e.prevValue;

        forEachAncestorAndObserverEnqueueRecord(target, function (options) {
          // 3.1, 4.2
          if (!options.attributes) return;

          // 3.2, 4.3
          if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
            return;
          }
          // 3.3, 4.4
          if (options.attributeOldValue) return getRecordWithOldValue(oldValue);

          // 3.4, 4.5
          return record;
        });

        break;

      case 'DOMCharacterDataModified':
        // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
        var target = e.target;

        // 1.
        var record = getRecord('characterData', target);

        // 2.
        var oldValue = e.prevValue;

        forEachAncestorAndObserverEnqueueRecord(target, function (options) {
          // 3.1, 4.2
          if (!options.characterData) return;

          // 3.2, 4.3
          if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);

          // 3.3, 4.4
          return record;
        });

        break;

      case 'DOMNodeRemoved':
        this.addTransientObserver(e.target);
      // Fall through.
      case 'DOMNodeInserted':
        // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
        var target = e.relatedNode;
        var changedNode = e.target;
        var addedNodes, removedNodes;
        if (e.type === 'DOMNodeInserted') {
          addedNodes = [changedNode];
          removedNodes = [];
        } else {

          addedNodes = [];
          removedNodes = [changedNode];
        }
        var previousSibling = changedNode.previousSibling;
        var nextSibling = changedNode.nextSibling;

        // 1.
        var record = getRecord('childList', target);
        record.addedNodes = addedNodes;
        record.removedNodes = removedNodes;
        record.previousSibling = previousSibling;
        record.nextSibling = nextSibling;

        forEachAncestorAndObserverEnqueueRecord(target, function (options) {
          // 2.1, 3.2
          if (!options.childList) return;

          // 2.2, 3.3
          return record;
        });

    }

    clearRecords();
  }
};

if (!MutationObserver) {
  MutationObserver = JsMutationObserver;
}

module.exports = MutationObserver;

/***/ })
/******/ ]);
//# sourceMappingURL=cerner-smart-embeddable-lib-1.4.0.js.map