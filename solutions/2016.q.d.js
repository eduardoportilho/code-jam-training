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
  var numTiles = Math.pow(K, C)
  var state = 0

  function solve() {
    if (K === 1) {
      return '1'
    }
    if (C === 1) {
      if (S < K)
        return 'IMPOSSIBLE'
      return _.range(1, K+1).join(' ');
    }
    if(S < K-1) {
        return 'IMPOSSIBLE'
    }
    return _.range(2, K+1).join(' ');
  }

  return solve()
}
