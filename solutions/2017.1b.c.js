module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var firstLine = input.popIntArray()
    var N = firstLine[0]
    var Q = firstLine[1]

    var horses = []
    for(var j = 0 ; j < N ; j++) {
      var cityLine = input.popIntArray()
      horses.push({
        cityId: j+1,
        maxDist: cityLine[0],
        S: cityLine[1]
      })
    }

    var dists = []
    for(var cidI = 0 ; cidI < N ; cidI++) {
      var distLine = input.popIntArray()
      dists.push([])
      for(var cidJ = 0 ; cidJ < N ; cidJ++) {
        dists[cidI].push(distLine[cidJ])
      }
    }

    var pares = []
    for(var qi = 0 ; qi < Q ; qi++) {
      var qLine = input.popIntArray()
      pares.push({
        U: qLine[0],
        V: qLine[1]
      })
    }

    var solution = getSolutionFor(N, Q, horses, dists, pares)
    output.addSolution(solution)
  }
}

function getSolutionFor(N, Q, horses, dists, pares) {
  var queue = []

  function solve() {
    var ys = []
    for(var i = 0 ; i < Q ; i++) {
      ys.push(getT(pares[i].U, pares[i].V))
    }


    return ys.join(' ')
  }

  function getT(idInicio, idFim) {
    var indexInicio = idInicio-1
    var horse = horses[indexInicio]
    var nextCities = getNextCitiesFrom(indexInicio)
    for(var i = 0 ; i < nextCities.length ; i++) {
      queue.push({
        next: nextCities[i],
        time: 0,
        horse: horse,
        distanceWithHorse: 0,
        visited: [indexInicio]
      })
    }

    var times = []
    while(queue.length > 0) {
      var state = queue.shift()
      var time = step(state, idFim)
      if (time !== null) {
        times.push(time)
      }
    }
    return Math.min.apply(null, times)
  }

  function getNextCitiesFrom(cityIndex) {
    var next = []
    var paths = dists[cityIndex]
    for(var i = 0 ; i < paths.length ; i++) {
      if (paths[i] > 0) {
        next.push({
          index: i,
          id: i+1,
          dist: paths[i]
        })
      }
    }
    return next
  }

  function step(state, idFim) {
    var nextCity = state.next
    var nextCityIndex = nextCity.index
    var visited = state.visited

    var dist = nextCity.dist
    var vel = state.horse.S
    var newTime = state.time + (dist / vel)

    //next city is destination
    if (nextCity.id === idFim) {
      return newTime.toFixed(6)
    }
    //fill queue
    visited.push(nextCityIndex)
    var nextCityHorse = horses[nextCityIndex]
    var currentHorse = state.horse
    var distanceWithCurrentHorse = state.distanceWithHorse + dist
    var nextCities = getNextCitiesFrom(nextCityIndex)

    for(var i = 0; i < nextCities.length; i++) {
      if (visited.includes(nextCities[i].index)) {
        continue
      }

      var nextStepDist = nextCities[i].dist
      var nextStepHorseDist = distanceWithCurrentHorse + nextStepDist

      if (currentHorse.maxDist > nextStepHorseDist) {
        //horse still good! ;)
        queue.push({
          next: nextCities[i],
          time: newTime,
          horse: currentHorse,
          distanceWithHorse: distanceWithCurrentHorse,
          visited: visited
        })
      }
      //new horse
      queue.push({
        next: nextCities[i],
        time: newTime,
        horse: nextCityHorse,
        distanceWithHorse: 0,
        visited: visited
      })
    }

    return null
  }

  return solve()
}
