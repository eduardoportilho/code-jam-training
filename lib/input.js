function Input(content) {
  this.lines = content.split('\n')
}

Input.prototype.popInt = function () {
  return parseInt(this.lines.shift(), 10)
}

module.exports = Input