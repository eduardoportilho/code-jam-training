module.exports = function(input, output) {
  let t = input.popInt()

  for(var i = 0 ; i < t ; i++) {
    var n = input.popInt()
    var solution = getSolutionFor(n)
    output.addSolution(solution)
  }
};

function getSolutionFor(n) {
  var lastNtimes = undefined
  var times = 1
  var knownDigits = {}

  function solve() {
    var nTimes = n * times++
    if (lastNtimes === nTimes) {
      return 'INSOMNIA'
    }
    lastNtimes = nTimes
    
    var digits = getDigits(nTimes)
    rememberDigits(digits)
    if(allDigits()) {
      return nTimes
    } else {
      return solve() 
    }
  }
  function getDigits(number) {
    return number.toString().split('')
  }

  function rememberDigits(digits) {
    digits.forEach((d) => {
      knownDigits[d] = true
    })
  }

  function allDigits() {
    for(var i = 0 ; i <= 9 ; i++) {
      if (!knownDigits[i]) return false
    }
    return true
  }

  return solve()
}
