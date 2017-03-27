let _ = require('lodash')

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var D = input.popInt()
    var P = input.popIntArray()
    var solution = getSolutionFor(D, P)
    output.addSolution(solution)
  }
}

function getSolutionFor(D, P) {
  var Parray = undefined
  var maxPi = undefined
  var tMin = undefined
  var interruptCount = 0

  function solve() {
    init()
    if (maxPi <=3) 
      return maxPi
    return iterate()
  }

  function init() {
    Parray = P
    maxPi = _.max(Parray)
    tMin = maxPi
  }

  function iterate() {
    Parray = interrupt(Parray)
    interruptCount += 1
    maxPi = _.max(Parray)

    var currentTime = maxPi + interruptCount
    if (currentTime < tMin)
      tMin = currentTime

    if (maxPi < 2)
      return tMin

    return iterate()
  }

  return solve()
}

function getMaxIndex(array) {
  var max = -1
  var maxIndex = 0
  for (var i = 0 ; i< array.length ; i++) {
    if (array[i] > max) {
      max = array[i]
      maxIndex = i
    }
  }
  return maxIndex
}

function interrupt(array) {
  let maxIndex = getMaxIndex(array)
  let max = array[maxIndex]
  let interruptedArray = _.clone(array)
  interruptedArray[maxIndex] = Math.ceil(max / 2)
  interruptedArray.push(Math.floor(max / 2))
  return interruptedArray
}

function calcTime(array) {
  return _.max(array)
}

