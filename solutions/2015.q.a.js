module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var line = input.popString().split(' ')
    var Smax = parseInt(line[0], 10)
    var audience = line[1].split('').map((s) => parseInt(s))
    var solution = getSolutionFor(Smax, audience)
    output.addSolution(solution)
  }
}

function getSolutionFor(Smax, audience) {
  var clapping = 0
  var invited = 0

  function solve() {
    for(var S = 0 ; S <= Smax ; S++) {
      var ppl = audience[S]
      if (S > clapping && ppl > 0) {
        invited += (S - clapping)
        clapping += invited
      }
      clapping += ppl
    }
    return invited
  }

  return solve()
}
