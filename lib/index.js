let Input = require('./input')
let Output = require('./output')

let args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: npm run solve <problem-id> <input>')
  return
}
let problemId = args[0]
let inputId = args[1]

let inputPath = `./input/${problemId}/${inputId}.in`
let input = new Input(inputPath)

let outputPath = `./output/${problemId}/${inputId}.out`
let output = new Output(outputPath)

let solutionFn = require(`../solutions/${problemId}`)
solutionFn(input, output)

output.printToFile()
console.log('done')