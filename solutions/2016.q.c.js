var _ = require('lodash')
var numbers = require('numbers')
var ProgressBar = require('progress');
var bigInt = require("big-integer");

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
  console.time('Sieve took:')
  var sieve = numbers.prime.sieve(65536);
  console.log(`Last sieve: ${_.last(sieve)}`)
  console.timeEnd('Sieve took:')

  function solve() {
    var bar = new ProgressBar('[:bar] :percent - :elapsed', { total: numJamcoins, width: 50 })
    var i = 0
    while (jamcoins.length < numJamcoins) {
      var possibleJamcoin = generateJamcoin(numDigits, i++)
      var jamcoin = validateJamcoin(possibleJamcoin, sieve)
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
function validateJamcoin(jamcoinString, sieve) {
  var divisors = []
  for(var base = 2 ; base <= 10 ; base++) {
    var jamcoinOnBase = bigInt(jamcoinString, base)
    var divisor = getPrimeDivisor(jamcoinOnBase, sieve);
    if (divisor < 0)  {
      return {isValid: false}
    } else {
      divisors.push(divisor)
    }
  }
  if (divisors.length != 9) {
    //shouldn't happen...
    throw new Error('Expected 9 divisors!')
  }
  return {
    isValid: true,
    jamcoin: jamcoinString,
    divisors: divisors
  }
}

function getPrimeDivisor(bigint, sieve) {
  var prime
  for(var i = 0 ; i < sieve.length ; i++) {
    prime = sieve[i]
    if (bigint.mod(prime).equals(bigInt.zero)) {
      return prime
    }
  }
  return -1
}

function jamcoinToString(jamcoin) {
  return jamcoin.jamcoin + ' ' + jamcoin.divisors.join(' ')
}
