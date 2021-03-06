let _ = require('lodash')
let jsturbo = require('jsturbo')
let ProgressBar = require('progress')

module.exports = function(input, output) {
  let t = input.popInt()
  let bar = new ProgressBar('[:bar] :percent - :elapsed', { total: t, width: 50 })
  for(var i = 0; i < t; i++) {
    var dimensions = input.popIntArray()
    var R = dimensions[0]
    var C = dimensions[1]
    var cake = []
    for(var ri = 0; ri < R; ri++) {
      cake.push(input.popString().split(''))
    }
    var solution = getSolutionFor(R, C, cake)
    output.addSolution(solution)
    bar.tick()
  }
}

function getSolutionFor(R, C, cake) {
  var queue = []
  let cakeSize = {R:R, C:C}

  function solve() {
    var visited = []
    var pos = getNextCharPos(cake, null, visited)
    queue.push({state: cake, pos: pos, visited: visited})

    while (queue.length > 0) {
      var solution = iterate() 
      if (solution != null)
        return solutionToString(solution)
    }
    throw new Error('IMPOSSIBLE')
  }

  function iterate() {
    var params = queue.pop()
    var currState = params.state
    var currPos = params.pos
    var currVisited = params.visited

    var newStates = getNewStatesWithRectangleFrom(currState, currPos)
    var nextPos = getNextCharPos(currState, currPos, currVisited)
    for(var i = 0; i < newStates.length; i++) {
      if (isFinal(newStates[i])) {
        return newStates[i]
      }
      if (nextPos) {
        queue.push({state: newStates[i], pos: nextPos, visited: _.clone(currVisited)})
      }
    }
    return null
  }

  function getNewStatesWithRectangleFrom(state, pos) {
    var horRect = getHorizontalAxisRect(state, pos)

    //up
    var horRectPlus = increaseOneUp(state, horRect)
    while (isValidEmptyRect(state, horRectPlus, pos)) {
      horRect = horRectPlus
      horRectPlus = increaseOneUp(state, horRect)
    }

    //down
    horRectPlus = increaseOneDown(state, horRect)
    while (isValidEmptyRect(state, horRectPlus, pos)) {
      horRect = horRectPlus
      horRectPlus = increaseOneDown(state, horRect)
    }

    var vertRect = getVerticalAxisRect(state, pos)
    //left
    var vertRectPlus = increaseOneLeft(state, vertRect)
    while (isValidEmptyRect(state, vertRectPlus, pos)) {
      vertRect = vertRectPlus
      vertRectPlus = increaseOneLeft(state, vertRect)
    }

    //right
    var vertRectPlus = increaseOneRight(state, vertRect)
    while (isValidEmptyRect(state, vertRectPlus, pos)) {
      vertRect = vertRectPlus
      vertRectPlus = increaseOneRight(state, vertRect)
    }

    var rects = [horRect]
    if(!isSameRect(vertRect, horRect)) {
      rects = [horRect, vertRect]
    }

    var val = state[pos.r][pos.c]
    return rects.map((rect) => fillRect(state, rect, val))
  }

  function getHorizontalAxisRect(state, pos) {
    let row = pos.r
    //left
    var ci = pos.c 
    var i = pos.c - 1
    while (i >= 0) {
      if (state[row][i] !== '?') {
        break
      }
      ci = i
      i--
    }
    //right
    var cf = pos.c
    i = pos.c + 1
    while (i < C) {
      if (state[row][i] !== '?') {
        break
      }
      cf = i
      i++
    }
    return [{r: row, c: ci}, {r: row, c: cf}]
  }

  function getVerticalAxisRect(state, pos) {
    let col = pos.c
    //up
    var ri = pos.r
    var i =  pos.r - 1
    while (i >= 0) {
      if (state[i][col] != '?') {
        break
      }
      ri = i
      i--
    }
    //down
    var rf = pos.r
    i = pos.r + 1
    while (i < R) {
      if (state[i][col] != '?') {
        break
      }
      rf = i
      i++
    }
    return [{r: ri, c: col}, {r: rf, c: col}]
  }

  function isValidEmptyRect(state, rect, originalPos) {
    var val = state[originalPos.r][originalPos.c]
    var pti = rect[0]
    var ptf = rect[1]

    if (pti.r < 0 ||
      pti.c < 0 ||
      ptf.r >= R ||
      ptf.c >= C) {
      return false
    }

    for(var r = pti.r; r <= ptf.r; r++) {
      for(var c = pti.c; c <= ptf.c; c++) {
        if (state[r][c] !== '?' && state[r][c] !== val) {
          return false
        }
      }
    }
    return true
  }

  function increaseOneUp(state, rect) {
    return [
      {r: rect[0].r-1, c: rect[0].c},
      rect[1]
    ]
  }

  function increaseOneDown(state, rect) {
    return [
      rect[0],
      {r: rect[1].r+1, c: rect[1].c}
    ]
  }
  function increaseOneLeft(state, rect) {
    return [
      {r: rect[0].r, c: rect[0].c-1},
      rect[1]
    ]
  }
  function increaseOneRight(state, rect) {
    return [
      rect[0],
      {r: rect[1].r, c: rect[1].c+1}
    ]
  }
  function isSameRect(rect1, rect2) {
    let x1 = rect1[0]
    let y1 = rect1[1]
    let x2 = rect2[0]
    let y2 = rect2[1]

    return x1.r === x2.r &&
      x1.c === x2.c &&
      y1.r === y2.r &&
      y1.c === y2.c
  }

  function fillRect(state, rect, val) {
    let newState = _.cloneDeep(state)
    var pti = rect[0]
    var ptf = rect[1]

    for(var r = pti.r; r <= ptf.r; r++) {
      for(var c = pti.c; c <= ptf.c; c++) {
        newState[r][c] = val
      }
    }
    return newState
  }

  function getNextCharPos(state, lastPos, visitedChars) {
    visitedChars = visitedChars || []
    var nextIndex = 0
    if (lastPos) {
      nextIndex = jsturbo.matrix.coordToIndex(lastPos, cakeSize) + 1
    }
    let flat = _.flatten(state)
    while(nextIndex < flat.length) {
      var currChar = flat[nextIndex]
      if(currChar != '?' &&
        !visitedChars.includes(currChar)) {
        visitedChars.push(currChar)
        return jsturbo.matrix.indexToCoord(nextIndex, cakeSize)
      }
      nextIndex += 1
    }
    return null
  }

  function isFinal(state) {
    let flat = _.flatten(state)
    return _.indexOf(flat, '?') < 0
  }

  function solutionToString(solution) {
    return '\n' + solution.map((arr) => arr.join('')).join('\n')
  }

  return solve()
}
