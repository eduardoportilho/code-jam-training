let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2016.q.d.js')

//Input: K, C, S
describe('2016.q.d', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  describe('solution 1', () => {

    it('C == 1 : 1..k', () => {
      solution(new Input(['1', '10 1 20']), output)
      expect(output.toString()).to.equal('Case #1: 1 2 3 4 5 6 7 8 9 10')
    })

    it('C == 1 : S >= K', () => {
      solution(new Input(['1', '10 1 9']), output)
      expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')
    })

    it('C > 1 : 2..k', () => {
      solution(new Input(['1', '10 10 20']), output)
      expect(output.toString()).to.equal('Case #1: 2 3 4 5 6 7 8 9 10')
    })


    it('C > 1 : S >= K-1', () => {
      solution(new Input(['1', '10 10 8']), output)
      expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')
    })

  })

  describe('basic cases', () => {
    it('If K = 1:  1', () => {
      solution(new Input(['1', '1 10 10']), output)
      expect(output.toString()).to.equal('Case #1: 1')
    })

    it('If C = 1 && S == K:  1..K', () => {
      solution(new Input(['1', '1 1 1']), output)
      expect(output.toString()).to.equal('Case #1: 1')

      output = new Output()
      solution(new Input(['1', '2 1 2']), output)
      expect(output.toString()).to.equal('Case #1: 1 2')

      output = new Output()
      solution(new Input(['1', '3 1 3']), output)
      expect(output.toString()).to.equal('Case #1: 1 2 3')
    })

    it('If C = 1 && S < K:  IMPOSSIBLE', () => {

      output = new Output()
      solution(new Input(['1', '2 1 1']), output)
      expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')

      output = new Output()
      solution(new Input(['1', '3 1 2']), output)
      expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')
    })
  })
})
