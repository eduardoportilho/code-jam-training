let _ = require('lodash')
let ProgressBar = require('progress')

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var line = input.popIntArray()
    var solution = getSolutionFor(line[0], line[1])
    output.addSolution(solution)
  }
}

function getSolutionFor(N, K) {
  var state = 0

  function solve() {
    var stalls = _.repeat('f', N);
    var position

    var bar = new ProgressBar('[:bar] :percent - :elapsed s', { total: K, width: 50 })

    while (K > 0) {
      K--
      position = choosePosition(stalls)
      stalls = replaceAt(stalls, position, 'o')
      bar.tick()
    }

    var LS = calcLS(stalls, position)
    var RS = calcRS(stalls, position)

    var min = Math.min(LS, RS)
    var max = Math.max(LS, RS)

    return `${max} ${min}`
  }

  return solve()
}

function choosePosition(stallsStr) {
  var freeSubstrs = stallsStr.split('o')
  var freeSubstrsSizes = freeSubstrs.map((arr) => arr.length)
  var maxSize = -1, maxIndex = 0
  for (var i = 0 ; i < freeSubstrs.length ; i++) {
    var freeStr = freeSubstrs[i]
    if (freeStr.length > maxSize) {
      maxSize = freeStr.length
      maxIndex = i
    }
  }
  var posSubIndex = Math.ceil(maxSize / 2) - 1

  var offset = 0
  for (var i = 0 ; i < maxIndex ; i++) {
    offset += (freeSubstrs[i].length + 1)
  }
  return offset + posSubIndex
}

function replaceAt (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function calcLS(stallsStr, pos) {
  if(pos === 0) return 0
  var freeCount = 0,
    i = pos-1

  while (i >= 0) {
    if (stallsStr.charAt(i) === 'o')
      return freeCount
    i--
    freeCount++
  }
  return freeCount
}

function calcRS(stallsStr, pos) {
  var lastPos = stallsStr.length - 1
  if(pos >= lastPos) return 0
  var freeCount = 0,
    i = pos+1

  while (i <= lastPos) {
    if (stallsStr.charAt(i) === 'o')
      return freeCount
    i++
    freeCount++
  }
  return freeCount
}
