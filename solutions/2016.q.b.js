let _ = require('lodash')

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var stack = input.popString()
    var solution = getSolutionFor(stack)
    output.addSolution(solution)
  }
};

function getSolutionFor(stack) {
  var currentStack = _.trimEnd(stack, '+')
  var isBasicCase = checkBasicCases(stack)
  if (isBasicCase >= 0) {
    return isBasicCase
  }

  //end char is -

  return 1
}

function checkBasicCases(stack) {
  if (stack.length === 0) {
    return 0
  }
  if (stack.indexOf('-') < 0) {
    //only +
    return 0
  }
  if (stack.indexOf('+') < 0) {
    //only -
    return 1
  }
  return -1;
}
