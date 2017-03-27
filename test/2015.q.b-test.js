let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2015.q.b.js')

describe('2015.q.b', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  describe('Sample:', () => {
    it('only 1s', () => {
      let input = new Input(['1', '1', '4'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 3')
    })

    it('10 10', () => {
      let input = new Input(['1', '2', '10 10'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 7')
    })

    it('10 10 10', () => {
      let input = new Input(['1', '3', '10 10 10'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 8')
    })

    it('100 50 25', () => {
      let input = new Input(['1', '3', '100 50 25'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 24')
    })

    it('100 100', () => {
      let input = new Input(['1', '2', '100 100'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 27')
    })

    it('1 2 3 4 5', () => {
      let input = new Input(['1', '-1', '1 2 3 4 5'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 5')
    })

    it('7 33 100', () => {
      let input = new Input(['1', '-1', '7 33 100'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 23')
    })
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

  describe('Small input:', () => {
    it('9', () => {
      let input = new Input(['1', '1', '9'])
      solution(input, output)
      expect(output.toString()).to.equal('Case #1: 5')
    })
  })
})
