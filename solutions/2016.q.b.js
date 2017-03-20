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
  var flips = 0

  function solve(stack) {
    var currentStack = _.trimEnd(stack, '+')
    var isBasicCase = checkBasicCases(currentStack)
    if (isBasicCase >= 0) {
      return flips + isBasicCase
    }

    //end char is - and there are +s
    ////flip, remove and recurse
    
    let firstCharRepeatEnd = getFirstCharRepeatEnd(currentStack)
    currentStack = flip(currentStack, firstCharRepeatEnd)
    flips++
    return solve(currentStack)
  }

  return solve(stack)
}


function flip(stack, lastIndexToFlip) {
  var partToFlip = stack.slice(0, lastIndexToFlip+1)
  var partNotToFlip = stack.slice(lastIndexToFlip+1)

  return partToFlip
    .split('')
    .map((char) => char === '+' ? '-' : '+')
    .join('') + partNotToFlip
}
module.exports._flip = flip

// check for '', '++...' or  '--...'
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
  return -1
}

// 'aaabad' => 2, 'cc' => 1, 'a' => 0 , '' => -1
function getFirstCharRepeatEnd(stack) {
  if (stack.length === 0) {
    return -1
  }
  let first = stack.charAt(0)
  var index = 0

  while (index < stack.length) {
    if (stack.charAt(index) !== first) {
      return index-1
    }
    index++
  }
  return index-1
}
