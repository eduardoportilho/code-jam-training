let fs = require('fs')

function Input(inputPath) {
  let inputContent = fs.readFileSync(inputPath).toString()
  this.lines = inputContent.split('\n')
}

Input.prototype.popInt = function () {
  return parseInt(this.lines.shift(), 10)
}

module.exports = Input