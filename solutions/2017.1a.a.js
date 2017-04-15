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
    throw new Error('Deu ruim')
  }

  function iterate() {
    var params = queue.shift()
    var solHor = fillHorizontal(params.state, params.pos)
    if (isFinal(solHor)) {
      return solHor
    }

    var solVert = fillVertical(params.state, params.pos)
    if (isFinal(solVert)) {
      return solVert
    }

    var nextPos = getNextCharPos(params.state, params.pos)
    if (nextPos) {
      queue.push({state: solHor, pos: nextPos})
      queue.push({state: solVert, pos: nextPos})
    }
    return null
  }


  function getNextCharPos(state, lastPos) {
    var nextIndex = 0
    if (lastPos) {
      nextIndex = posToIndex(lastPos) + 1
    }
    let flat = _.flatten(state)
    while(nextIndex < flat.length) {
      if(flat[nextIndex] != '?') {
        return indexToPos(nextIndex)
      }
      nextIndex += 1
    }
    return null
  }

  function posToIndex(pos) {
    return (pos.r * C) + pos.c
  }

  function indexToPos(index) {
    let r = Math.floor(index/C)
    let c = index % C
    return {r: r, c: c}
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
