let fs = require('fs')
let Input = require('./input')

let args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: npm run solve <problem-id> <input>')
  return
}
let problemId = args[0]
let inputId = args[1]
let solutionFn = require(`../solutions/${problemId}`)
let inputPath = `./input/${problemId}/${inputId}`
let inputContent = fs.readFileSync(inputPath).toString()
let input = new Input(inputContent)

solutionFn(input)