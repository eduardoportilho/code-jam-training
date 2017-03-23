let _ = require('lodash')

module.exports = (inputLines, outputLines) => {
  var K, C, S
  for (var i = 0 ; i < inputLines.length ; i++) {
    var inputArray = inputLines[i].split(' ').map(function (s) { return parseInt(s)})
    if (!inputArray.length) continue
    K = inputArray[0]
    C = inputArray[1]
    S = inputArray[2]
    var output = outputLines[i] === 'IMPOSSIBLE' ? 'IMPOSSIBLE' : outputLines[i].split(' ').map((s) => parseInt(s))
    checks.forEach((check) => check(i+1, K, C, S, output))
  }
  console.log('done')
}

var checks = [
  (caseNum, K, C, S, output) => {
    if(output !== 'IMPOSSIBLE' && output.length > S) {
      console.log(`ERROR IN CASE #${caseNum}: out.length (${output.length}) > S (${S})`)
    }
  },
  (caseNum, K, C, S, output) => {
    if(C === 1 && output.length != K && output !== 'IMPOSSIBLE') {
      console.log(`ERROR IN CASE #${caseNum}: C = 1 &&  output.length != K`)
    }
  },
  (caseNum, K, C, S, output) => {
    if(output !== 'IMPOSSIBLE' && C>1 && K>3 && _.last(output) === K) {
      console.log(`ERROR IN CASE #${caseNum}: _.last(output) === K`)
    }
  },
]