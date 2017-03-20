let Input = require('../lib/input')
let Output = require('../lib/output')
let expect = require('chai').expect
let solution = require('../solutions/2016.q.b.js')

describe('2016.q.b', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  it('All +: 0', () => {
    let input = new Input(['1', '++++++'])
    solution(input, output)
    expect(output.toString()).to.equal('Case #1: 0')
  })

  it('All -: 1', () => {
    let input = new Input(['1', '-----'])
    solution(input, output)
    expect(output.toString()).to.equal('Case #1: 1')
  })

  it('---+++: 1', () => {
    let input = new Input(['1', '---+++'])
    solution(input, output)
    expect(output.toString()).to.equal('Case #1: 1')
  })

  it('+++---: 2', () => {
    let input = new Input(['1', '---+++'])
    solution(input, output)
    expect(output.toString()).to.equal('Case #1: 2')
  })
})
