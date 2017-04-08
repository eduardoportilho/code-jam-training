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
    var stalls = _.fill(Array(N), false);
    var position, data

    var bar = new ProgressBar('[:bar] :percent - :elapsed s', { total: K, width: 50 })

    while (K > 0) {
      K--
      data = getStallData(stalls)
      position = choosePosition(data)
      stalls[position] = true
      bar.tick()
    }

    var min = data[position].min
    var max = data[position].max

    return `${max} ${min}`
  }

  return solve()
}

function getStallData(stalls) {
  var size = stalls.length
  var LS = Array(size)
  var distanceToFreeStall = 0
  var i
  for (i = 0 ; i < size ; i++) {
    LS[i] = distanceToFreeStall++
    if (stalls[i])
      distanceToFreeStall = 0
  }

  var RS = Array(size)
  distanceToFreeStall = 0
  for (i = (size-1) ; i >=0 ; i--) {
    RS[i] = distanceToFreeStall++
    if (stalls[i])
      distanceToFreeStall = 0
  }

  var data = {}
  for (i = 0 ; i < size ; i++) {
    if (stalls[i])
      continue //ocuppied
    data[i] = {}
    data[i].max = Math.max(LS[i], RS[i])
    data[i].min = Math.min(LS[i], RS[i])
  }
  return data
}

function choosePosition(data) {
  var filtered = filterHavingMaximalMin(data)
  filtered = filterHavingMaximalMax(filtered)
  return findMinimumIndex(filtered)
}

function filterHavingMaximalMin(data) {
  var keys = Object.keys(data)

  //find max
  var max = -1
  for (var i = 0 ; i < keys.length ; i++) {
    var key = keys[i]
    if (data[key].min > max)
      max = data[key].min
  }

  // keep only maximal min
  var filtered = {}
  for (var i = 0 ; i < keys.length ; i++) {
    var key = keys[i]
    if (data[key].min === max) {
      filtered[key] = data[key]
    }
  }
  return filtered
}

function filterHavingMaximalMax(data){
  var keys = Object.keys(data)

  //find max
  var max = -1
  for (var i = 0 ; i < keys.length ; i++) {
    var key = keys[i]
    if (data[key].max > max)
      max = data[key].max
  }

  // keep only maximal max
  var filtered = {}
  for (var i = 0 ; i < keys.length ; i++) {
    var key = keys[i]
    if (data[key].max === max) {
      filtered[key] = data[key]
    }
  }
  return filtered
}

function findMinimumIndex(data) {
  var keys = Object.keys(data).sort(function(a, b){ return a-b });
  return keys[0]
}





