module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var n = input.popInt()
    var solution = getSolutionFor(n)
    output.addSolution(solution)
  }
}

function getSolutionFor(n) {
  var state = 0

  function solve(n) {
    return ''
  }

  return solve(n)
}
