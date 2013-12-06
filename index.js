var path = require("path");
var loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var jade = require("jade-l10n");
  var runtime = "var jade = require("+JSON.stringify(require.resolve("jade/lib/runtime"))+");\n\n";
  var req = loaderUtils.getRemainingRequest(this).replace(/^!/, "");
  var query = loaderUtils.parseQuery(this.query);
  var options = {
    filename: req,
    client: true,
    self: query.self,
    pretty: query.pretty,
    locals: query.locals,
    compileDebug: this.debug || false
  };

  if (query.languageFile) {
    options.languageFile = query.languageFile;
  }

  var tmplFunc = jade.compile(source, options);
  var debugSource = "";
  if(this.debug) {
    debugSource = "require(" + JSON.stringify(path.join(__dirname, "web_modules", "fs")) + ").setFile(" + JSON.stringify(req) + ", " + JSON.stringify(source) + ");";
  }
  return runtime + debugSource + "module.exports = " + tmplFunc.toString();
};

module.exports.seperable = true;