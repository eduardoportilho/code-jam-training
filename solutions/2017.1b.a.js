var BigNumber = require('bignumber.js');

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var firstLine = input.popIntArray()
    var D = firstLine[0]
    var N = firstLine[1]

    var horses = []
    for(var j = 0 ; j < N ; j++) {
      var horseLine = input.popIntArray()
      horses.push({
        K: horseLine[0],
        S: horseLine[1],
        index: j
      })
    }

    var solution = getSolutionFor(D, N, horses)
    output.addSolution(solution)
  }
}

function getSolutionFor(D, N, horses) {
  var state = 0

  function solve() {
    var maxT = new BigNumber(0)
    horses.forEach(horse => {
      var dist = new BigNumber(D - horse.K)
      var speed = new BigNumber(horse.S)
      var time = dist.dividedBy(speed)

      if(time.toNumber() > maxT.toNumber()) {
        maxT = time
      }
    })

    return new BigNumber(D).dividedBy(maxT).toFixed(6)
  }

  return solve()
}
