let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2017.q.b.js')

describe('2017.q.b', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  it('Should getFirstDecrescentIndex', () => {
    expect(solution._getFirstDecrescentIndex('0')).to.equals(-1)
    expect(solution._getFirstDecrescentIndex('999')).to.equals(-1)
    expect(solution._getFirstDecrescentIndex('98')).to.equals(0)
    expect(solution._getFirstDecrescentIndex('898')).to.equals(1)
  })

  it('Should _replaceWithDminus9s', () => {
    expect(solution._replaceWithDminus9s('1234', 0)).to.equals('0999')
    expect(solution._replaceWithDminus9s('1234', 1)).to.equals('1199')
    expect(solution._replaceWithDminus9s('1034', 1)).to.equals('1099')
  })

  it('Should solve', () => {
    expect(solution._solve(111111111111111110)).to.equals(99999999999999999)
  })
})
