let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2015.q.b.js')

describe('2015.q.b', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  describe('Base cases:', () => {
    it('only 1s', () => {
      let input = new Input(['1', '3', '1 1 1'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 1')
    })

    it('contains 2s', () => {
      let input = new Input(['1', '4', '1 2 1 2'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 2')
    })

    it('contains 3s', () => {
      let input = new Input(['1', '4', '1 2 3 2'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 3')
    })
  })
})
