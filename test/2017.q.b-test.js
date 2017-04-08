let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2017.q.b.js')

describe('2017.q.b', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  it('Should be tidy', () => {
    expect(solution._isTidy(8)).to.be.true
    expect(solution._isTidy(123)).to.be.true
    expect(solution._isTidy(555)).to.be.true
    expect(solution._isTidy(224488)).to.be.true
  })

  it('Should not be tidy', () => {
    expect(solution._isTidy(20)).to.be.false
    expect(solution._isTidy(321)).to.be.false
    expect(solution._isTidy(495)).to.be.false
    expect(solution._isTidy(999990)).to.be.false
  })
})
