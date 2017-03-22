let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2016.q.d.js')

//Input: numInitialTiles, complexity, numStudents
describe('2016.q.d', () => {
  var output

  beforeEach(() => {
    output = new Output()
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
    solution(new Input(['1', '1 1 0']), output)
    expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')

    output = new Output()
    solution(new Input(['1', '2 1 1']), output)
    expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')

    output = new Output()
    solution(new Input(['1', '3 1 2']), output)
    expect(output.toString()).to.equal('Case #1: IMPOSSIBLE')
  })
})
