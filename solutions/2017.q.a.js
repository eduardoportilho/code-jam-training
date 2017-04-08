module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var line = input.popString().split()
    var S = line[0]
    var K = parseInt(line[1])
    var solution = getSolutionFor(S, K)
    output.addSolution(solution)
  }
}

function getSolutionFor(S, K) {
  var state = 0

  function solve() {
    if(S.indexOf('-') < 0)
       return 0
    return 'IMPOSSIBLE'
  }

  return solve(S, K)
}
