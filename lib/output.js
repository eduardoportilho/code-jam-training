let mkdirp = require('mkdirp');
let fs = require('fs')
let getDirName = require('path').dirname;

function Output() {
  this.solutions = []
}

Output.prototype.addSolution = function(solution) {
  this.solutions.push(solution)
}

Output.prototype.toString = function() {
  return  this.solutions
    .map((solution, index) => `Case #${index+1}: ${solution}`)
    .join('\n')
}

Output.prototype.printToFile = function(path) {
  writeFile(path, this.toString())
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

module.exports = Output
