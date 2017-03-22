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

function getSolutionFor(numInitialTiles, complexity, numStudents) {
  var numTiles = Math.pow(numInitialTiles, complexity)
  var state = 0

  function solve() {
    if (complexity === 1) {
      if (numStudents < numInitialTiles)
        return 'IMPOSSIBLE'
      return _.range(1, numInitialTiles+1).join(' ');
    }
    return 'IMPOSSIBLE'
  }

  return solve()
}
