
# REQUEST-PARTIAL

This is simply [mikeal/request][0] with something that looks like partial application
support for the options object. If you find yourself `_.extend`-ing or `_.merge`-ing your
request options hash multiple times, such as when writing many test cases against a
single HTTP url, for example, you might want to re-use the options object for each test.

# API

The API is a bit hard to explain but actually very easy to use, so please bear with me.

The only function is exported from this module and is simply a wrapper around the original
`request` function. If called normally, then it will behave normally. However, if the
callback is omitted, it is assumed that you are building up the request and thus will
return a copy of itself which, otherwise, will behave exactly the same way but with a
modified default `options` (the one you've just given it). You can call the resulting
function to modify the options hash further and further and when you are ready, you can
simply pass in a single callback function and the original `mikeal/request` function will
be called with all the options passed in thus far and the callback.

### request(options, callback)

Effectively the [same request function as `require('request')`][1].

### partial = request(options)

Returns a function that behaves just like `require('request')` but with defaults modified
to match the given options.

You can call the resulting function with another options hash again to modify the default
values further. The new function instance will be independent from the original function
(out-of-place modification) so it can be reused.

### result = partial(function(e, response, body) { })

Runs `require('request')` with all given options value combined. The options given thus
far will be merged using [`lodash.merge`][2].

# MOCHA EXAMPLE

```js
var request = require('request-partial');

describe('home page', function() {
  var req = request({ uri: '/' });

  describe('GET', function() {
    var get = req({ method: 'GET' });

    // tests
  });

  describe('POST', function() {
    var post = req({ method: 'POST' });

    describe('with invalid JSON body', function() {
      var invalidReq = post({ body: { } });

      // tests
    });

    describe('with valid JSON body', function() {
      var validReq = post({ body: { valid: true } });

      // tests
    });
  });
});
```

# LICENSE

3-clause BSD, see the full text in the LICENSE file.

# TODO

* Support receiving multiple functions (i.e. one for error handling and another for
  asserts.)

[0]: https://github.com/mikeal/request
[1]: https://github.com/mikeal/request#requestoptions-callback
[2]: http://lodash.com/docs#merge

