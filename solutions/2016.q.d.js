let _ = require('lodash')

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var array = input.popIntArray()
    var k = array[0]
    var c = array[1]
    var s = array[2]
    var solution = getSolutionFor(k,c,s)
    output.addSolution(solution)
  }
}

function getSolutionFor(K, C, S) {
  var KC = Math.pow(K, C)
  var state = 0

  function solve() {
    if (K === 1) {
      return '1'
    }
    else if (C === 1) {
      return (S < K) ? 'IMPOSSIBLE' : getRange(1, K).join(' ')
    }
    else if (K === 2) {
      return '2'
    }
    else if (K === 3) {
      return (S < 2) ? 'IMPOSSIBLE' : '2 3'
    }

    let Smin = Math.ceil(K/2)
    if (S < Smin) {
        return 'IMPOSSIBLE'
    }
    let intAend = 1 + Math.ceil(Smin/2)
    let intBstart = KC - (1 + Math.floor(Smin/2))

    let intA = getRange(2, intAend)
    let intB = getRange(intBstart, KC-2)
    return _.union(intA, intB).join(' ')
  }

  return solve()
}

function getRange(start, end) {
  return _.range(start, end+1)
}