module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var dimensions = input.popIntArray()
    var R = dimensions[0]
    var C = dimensions[1]
    var cake = []
    for(var ri = 0; ri < R ; ri++) {
      cake.push(input.popString())
    }
    var solution = getSolutionFor(R, C, cake)
    output.addSolution(solution)
  }
}

function getSolutionFor(R, C, cake) {
  var state = 0

  function solve() {
    return cake
  }

  return solve()
}
