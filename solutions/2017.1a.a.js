let _ = require('lodash')
module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var dimensions = input.popIntArray()
    var R = dimensions[0]
    var C = dimensions[1]
    var cake = []
    for(var ri = 0; ri < R ; ri++) {
      cake.push(input.popString().split(''))
    }
    var solution = getSolutionFor(R, C, cake)
    output.addSolution(solution)
  }
}

function getSolutionFor(R, C, cake) {
  var queue = []

  function solve() {
    var pos = getNextCharPos(cake, null)
    queue.push({state: cake, pos: pos})

    while(queue.length > 0) {
      var solution = iterate() 
      if (solution != null)
        return solutionToString(solution)
    }
    console.log(R,C,cake)
    throw new Error('Deu ruim')
  }

  function iterate() {
    var params = queue.shift()

    var newStates = getNewStatesWithRectangleFrom(params.state, params.pos)
    var nextPos = getNextCharPos(params.state, params.pos)
    for(var i = 0; i < newStates.length; i++) {
      if (isFinal(newStates[i])) {
        return newStates[i]
      }
      if (nextPos) {
        queue.push({state: newStates[i], pos: nextPos})
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
      y1.c === y2.c;
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

  var visitedChars = []
  function getNextCharPos(state, lastPos) {
    var nextIndex = 0
    if (lastPos) {
      nextIndex = posToIndex(lastPos) + 1
    }
    let flat = _.flatten(state)
    while(nextIndex < flat.length) {
      var currChar = flat[nextIndex]
      if(currChar != '?' &&
        !visitedChars.includes(currChar)) {
        visitedChars.push(currChar)
        return indexToPos(nextIndex, currChar)
      }
      nextIndex += 1
    }
    return null
  }

  function posToIndex(pos) {
    return (pos.r * C) + pos.c
  }

  function indexToPos(index, val) {
    let r = Math.floor(index/C)
    let c = index % C
    return {r: r, c: c, val: val}
  }

  function fillHorizontal(state, pos) {
    let newState = _.cloneDeep(state)
    let row = pos.r
    let char = state[row][pos.c]
    //left
    var i = pos.c - 1
    while (i >= 0) {
      if (newState[row][i] != '?') {
        break
      }
      newState[row][i] = char
      i--
    }
    //right
    var i = pos.c + 1
    while (i < C) {
      if (newState[row][i] != '?') {
        break
      }
      newState[row][i] = char
      i++
    }
    return newState
  }

  function fillVertical(state, pos) {
    let newState = _.cloneDeep(state)
    let col = pos.c
    let char = state[pos.r][col]
    //up
    var i = pos.r - 1
    while (i >= 0) {
      if (newState[i][col] != '?') {
        break
      }
      newState[i][col] = char
      i--
    }
    //down
    var i = pos.r + 1
    while (i < R) {
      if (newState[i][col] != '?') {
        break
      }
      newState[i][col] = char
      i++
    }
    return newState
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
