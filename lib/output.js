let mkdirp = require('mkdirp');
let fs = require('fs')
let getDirName = require('path').dirname;

function Output(path) {
  this.outputPath = path
  this.solutions = []
}

Output.prototype.addSolution = function(solution) {
  this.solutions.push(solution)
}

Output.prototype.printToFile = function() {
  let outputContent = this.solutions
    .map((solution, index) => `Case #${index+1}: ${solution}`)
    .join('\n')

  writeFile(this.outputPath, outputContent)
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

module.exports = Output
