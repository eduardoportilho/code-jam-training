let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2015.q.a.js')

describe('2015.q.a', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  it('Should ...', () => {
    let input = new Input(['1', '0'])
    solution(input, output)
    expect(output.toString()).to.equal('Case #1: 0')
  })
})
