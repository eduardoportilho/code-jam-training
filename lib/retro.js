let fs = require('fs')
let _ = require('lodash')

let args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: npm run retro <problem-id> <input>')
  return
}
let problemId = args[0]
let inputId = args[1]

let inputPath = `./input/${problemId}/${inputId}.in`
let outputPath = `./output/${problemId}/${inputId}.out`
  
let retroFn = require(`../solutions/${problemId}-retro`)
let input = _.drop(getLines(inputPath)).filter((s) => s.trim().length > 0)
let output = getLines(outputPath).map((line) => line.replace(/Case #\d+: /, ''))
retroFn(input, output)

function getLines(path) {
  let content = fs.readFileSync(path).toString()
  return content.split('\n')
}