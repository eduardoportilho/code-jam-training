let _ = require('lodash')

module.exports = (inputLines, outputLines) => {

  var R, C, cakeIn, cakeOut
  var i = 0
  while (i < inputLines.length) {
    var caseNr = outputLines[i]
    var dimensions = inputLines[i].split(' ').map((s) => parseInt(s, 10))
    R = dimensions[0]
    C = dimensions[1]
    i++

    cakeIn = []
    cakeOut = []
    for (var j = 0; j < R; j++) {
      cakeIn.push(inputLines[i].split(''))
      cakeOut.push(outputLines[i].split(''))
      i++
    }
    //console.log(`${caseNr}\n---\n${cakeIn}\n---\n${cakeOut}`)
    checks.forEach((check) => check(R, C, cakeIn, cakeOut, caseNr))
  }
  console.log('done')
}

var checks = [
  //check out dimensions
  (R,C,input,output,caseNr) => {
    if (output.length !== R || output[0].length !== C)
      console.log(`${caseNr} ERROR - wrong output dimensions`)
  },
  //print in out
  (R,C,input,output,caseNr) => {
    console.log(`${caseNr}`)
    var instr = ''
    var outstr = ''
    for (var j = 0; j < R; j++) {
      console.log(input[j].join('\t') + '\t\t\t' + output[j].join('\t'))
    }
    console.log(`----`)
  }
]
