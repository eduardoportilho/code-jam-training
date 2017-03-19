module.exports = function(input, output) {
  let t = input.popInt()

  for(var i = 0 ; i < t ; i++) {
    var stack = input.popString()
    var solution = getSolutionFor(stack)
    output.addSolution(solution)
  }
};

function getSolutionFor(stack) {
  return 1
}