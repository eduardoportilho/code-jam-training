let _ = require('lodash')

module.exports = (inputLines, outputLines) => {
  var K, C, S
  for (var i = 0 ; i < inputLines.length ; i++) {
    if((i*2)+1>=inputLines.length) return
    var inputArray = inputLines[(i*2)+1].split(' ').map(function (s) { return parseInt(s)})
    var max = _.max(inputArray)
    var output = outputLines[i]
    console.log(`Case #${i+1} | ${inputArray} | ${output} | ${max}`)
  }
  console.log('done')
}
