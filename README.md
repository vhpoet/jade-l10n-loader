# jade-l10n-loader


## Usage

``` javascript
var template = require("jade!./file.jade?languageFile=/path/messages.po");
// => returns file.jade content as template function
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

## License

MIT