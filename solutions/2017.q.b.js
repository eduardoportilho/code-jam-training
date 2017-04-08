module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var n = input.popInt()
    var solution = getSolutionFor(n)
    output.addSolution(solution)
  }
}

function getSolutionFor(n) {
  var lastTidy = undefined

  function solve(n) {
    for(var i = 1 ; i <= n ; i++) {
      if (isTidy(i)) {
        lastTidy = i
      }
    }
    return lastTidy
  }

  return solve(n)
}

function isTidy(k) {
  if (k <= 9)
    return true
  
  var str = k.toString()
  for (var i = 1 ; i <= str.length ; i++) {
    var d1 = parseInt(str.charAt(i-1), 10)
    var d2 = parseInt(str.charAt(i), 10)
    if (d1 > d2)
      return false
  }
  return true
}
module.exports._isTidy = isTidy
