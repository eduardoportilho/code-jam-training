let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2016.q.c.js')

describe('2016.q.c', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  it('Should generate jamcoin candidates', () => {
    expect(solution._generateJamcoin(3, 0)).to.equal('101')
    expect(solution._generateJamcoin(3, 1)).to.equal('111')
  })
})
