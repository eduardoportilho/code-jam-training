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

    if (C === 1) {
      return (S < K) ? 'IMPOSSIBLE' : getRange(1, K).join(' ')
    }


//Smin = (k/2)up 
//I1 = [2, 2 + (Smin/2)up]
//I2 = [K^C - 2 - (Smin/2)down ,K^C-2]

    let Smin = Math.ceil(K/2)
    if (S < Smin) {
        return 'IMPOSSIBLE'
    }
    let intAend = 2 + Math.ceil(Smin/2)
    let intBstart = KC - 2 + Math.floor(Smin/2)

    let intA = getRange(2, intAend)
    let intB = getRange(intBstart, KC-2)
    return _.union(intA, intB).join(' ')
  }

  return solve()
}

function getRange(start, end) {
  return _.range(start, end+1)
}