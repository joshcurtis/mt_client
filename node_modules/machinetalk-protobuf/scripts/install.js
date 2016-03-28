#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var protoSrcPath = 'machinetalk-protobuf/proto';
var destinationPath = 'lib';
var protoNames = require('../protonames.json');

var protoTasks = protoNames.map(function(name) {
  return {
    source: path.join(protoSrcPath, name + '.proto'),
    destination: path.join(destinationPath, name + '.js')
  };
});

// Create destinationPath directory if it does not exist.
try {
  fs.mkdirSync(destinationPath);
} catch(err) {
  if (err.code !== 'EEXIST') {
    throw err;
  }
}

protoTasks.forEach(function(task) {
  var fileContent = child_process.execFileSync('pbjs', ['--target', 'commonjs', '--path', protoSrcPath, task.source]);
  fs.writeFileSync(task.destination, fileContent);
});
