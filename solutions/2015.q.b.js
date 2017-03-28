let _ = require('lodash')

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var D = input.popInt()
    var P = input.popIntArray()
    var solution = getSolutionFor(D, P)
    output.addSolution(solution)
  }
}

function getSolutionFor(D, P) {
  var maxPi = _.max(P)

  function solve() {
    var min = maxPi
    for (var x = 1; x < maxPi; x++) {
      var totalMoves = 0
      for (var i = 0; i < P.length; i++) {
        var Pi = P[i]
        var moves = Math.ceil(Pi / x) - 1
        totalMoves += moves
      }
      var time = totalMoves + x
      min = Math.min(min, time)
    }
    return min
  }
  return solve()
}
