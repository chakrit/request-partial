
// index.js - Main function exports
module.exports = (function(_, request, undefined) {

  function partial(options) {
    options = options || { };

    return function partial_(moreOptions) {
      if (typeof moreOptions === 'function')
        return request(options, moreOptions /*as callback*/);

      if (typeof moreOptions === 'string')
        moreOptions = { uri: moreOptions };

      return partial(_.merge({ }, options, moreOptions));
    };
  };

  partial.defaults = request.defaults;
  return partial;

})(require('lodash'), require('request'));

