if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target) { // .length of function is 2
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      const to = Object(target);
      // eslint-disable-next-line no-console
      console.log('SS - This got used from app');
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index < arguments.length; index++) {
        // eslint-disable-next-line prefer-rest-params
        const nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          // eslint-disable-next-line no-restricted-syntax
          for (const nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}
