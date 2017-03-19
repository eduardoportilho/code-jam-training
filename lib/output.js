let mkdirp = require('mkdirp');
let fs = require('fs')
let getDirName = require('path').dirname;

function Output() {
  this.solutions = []
}

Output.prototype.addSolution = function(solution) {
  this.solutions.push(solution)
}

Output.prototype.printToFile = function(path) {
  let outputContent = this.solutions
    .map((solution, index) => `Case #${index+1}: ${solution}`)
    .join('\n')

  writeFile(path, outputContent)
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

module.exports = Output
