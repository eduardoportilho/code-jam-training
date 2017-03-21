var _ = require('lodash')
var numbers = require('numbers')
var ProgressBar = require('progress');

module.exports = function(input, output) {
  let t = input.popInt()
  for(var i = 0 ; i < t ; i++) {
    var array = input.popIntArray()
    n = array[0]
    j = array[1]
    var solution = getSolutionFor(n, j)
    output.addSolution(solution)
  }
}

function getSolutionFor(numDigits, numJamcoins) {
  var jamcoins = []

  function solve() {
    var bar = new ProgressBar('[:bar] :percent - :elapsed', { total: numJamcoins, width: 50 })
    var i = 0
    while (jamcoins.length < numJamcoins) {
      var possibleJamcoin = generateJamcoin(numDigits, i++)
      var jamcoin = validateJamcoin(possibleJamcoin)
      if (jamcoin.isValid) {
        jamcoins.push(jamcoin)
        bar.tick()
      }
    }

    return '\n' + jamcoins.map((jc) => jamcoinToString(jc)).join('\n')
  }

  return solve()
}

/**
 * @param  {number} numDigits >=2
 * @param  {number} seed      >=0
 * @return {string}
 */
function generateJamcoin(numDigits, seed) {
  return `1${toBinaryString(seed, numDigits-2)}1`
}
module.exports._generateJamcoin = generateJamcoin

function toBinaryString(decimal, digits) {
  return _.padStart(parseInt(decimal, 10).toString(2), digits, '0')
}
/**
 * @return {Object} jamcoin
 * @return {boolean} jamcoin.isValid
 */
function validateJamcoin(jamcoinString) {
  var divisors = []
  for(var base = 2 ; base <= 10 ; base++) {
    var jcOnBase = parseInt(jamcoinString, base)
    var divisor = getPrimeDivisor(jcOnBase);
    if (divisor < 0) return {isValid: false}
    divisors.push(divisor)
  }
  return {
    isValid: true,
    jamcoin: jamcoinString,
    divisors: divisors
  }
}

function getPrimeDivisor(number) {
  let primeFactors = numbers.prime.factorization(number)
  if (primeFactors.length === 0 ||
    primeFactors[0] === number) {
    return -1
  }
  return _.last(primeFactors)
}

function jamcoinToString(jamcoin) {
  return jamcoin.jamcoin + ' ' + jamcoin.divisors.join(' ')
}
