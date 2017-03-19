let fs = require('fs')

Input.createFromFile = (inputPath) => {
  let inputContent = fs.readFileSync(inputPath).toString()
  return Input.createFromString(inputContent)
}

Input.createFromString = (inputContent) => {
  let lines = inputContent.split('\n')
  return new Input(lines)
}

function Input(lines) {
  this.lines = lines
}

Input.prototype.popInt = function() {
  return parseInt(this.lines.shift(), 10)
}

Input.prototype.popString = function() {
  return this.lines.shift()
}

module.exports = Input
