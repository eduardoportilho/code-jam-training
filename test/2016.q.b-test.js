let Input = require('../lib/input')
let Output = require('../lib/output')
let expect = require('chai').expect
let solution = require('../solutions/2016.q.b.js')

describe('2016.q.b', () => {
  var input, output

  before(() => {
    output = new Output()
  })

  it('Should flip 1 pancake', () => {
    input = new Input(['1', '-'])
    solution(input, output)
    expect(output.toString()).to.equal('Case #1: 1')
  })
})