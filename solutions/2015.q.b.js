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
  var state = 0

  function solve() {
    return ''
  }

  return solve()
}
