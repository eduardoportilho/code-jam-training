module.exports = function(input) {
  let t = input.popInt()
  let allDigits = {}

  for(var i = 0 ; i < t ; i++) {
    var n = input.popInt()
    var solution = solveFor(n)
    console.log(`Case #${i+1}: ${solution}`)
  }
};

var lastN = undefined
var times = 1
var knownDigits = {}

function solveFor(n) {
  lastN = undefined
  times = 1
  knownDigits = {}
  return solveForRecursive(n)
}

function solveForRecursive(n) {
  var nTimes = n * times++
  if (lastN === nTimes) {
    return 'INSOMNIA'
  }
  lastN = nTimes

  var digits = getDigits(nTimes)
  storeDigits(digits)
  //console.log('digits: ' + JSON.stringify(knownDigits))
  //console.log('n: ' + nTimes)
  if(isAllDigitsPresent()) {
    return nTimes
  }
  return solveForRecursive(n)
}

function getDigits(n) {
  return n.toString().split('')
}

function storeDigits(digits) {
  digits.forEach((d) => {
    knownDigits[d] = true
  })
}

function isAllDigitsPresent() {
  for(var i = 0 ; i <= 9 ; i++) {
    if (!knownDigits[i]) {
      return false
    }
  }
  return true
}
