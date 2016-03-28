var protoNames = require('./protonames.json');

protoNames.forEach(function(name) {
  module.exports[name] = require('./lib/' + name + '.js').pb;
});
