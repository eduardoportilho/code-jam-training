let _ = require('lodash')

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var n = input.popString()
    var solution = getSolutionFor(n)
    output.addSolution(solution)
  }
}

function getSolutionFor(n) {

  function solve(n) {
    var str = n.toString()
    var i = getFirstDecrescentIndex(str)
    while (i >= 0) {
      str = replaceWithDminus9s(str, i)
      i = getFirstDecrescentIndex(str)
    }
    return _.trimStart(str, '0')
  }

  return solve(n)
}
module.exports._solve = getSolutionFor

function getFirstDecrescentIndex(str) {
  if (str.length < 2)
    return -1
  
  for (var i = 0 ; i < (str.length-1) ; i++) {
    var d1 = parseInt(str.charAt(i), 10)
    var d2 = parseInt(str.charAt(i+1), 10)
    if (d1 > d2)
      return i
  }
  return -1
}
module.exports._getFirstDecrescentIndex = getFirstDecrescentIndex


function replaceWithDminus9s(str, index) {
  var startStr = str.substring(0, index)
  var d = parseInt(str.charAt(index), 10)
  if(d < 1) {
    console.log("D SHOULD BE > 0")
    d = 1 
  }
  var newStr = '' + startStr + (d-1)
  return _.padEnd(newStr, str.length, '9');
}
module.exports._replaceWithDminus9s = replaceWithDminus9s
