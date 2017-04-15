let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2017.1a.a.js')

describe('2017.1a.a', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  it('Should handle rectangles', () => {
    let input = new Input(['1', '2 2', '??', '?A'])
    solution(input, output)
    expect(output.toString()).to.equal(
      'Case #1:\n'+
      'AA\n'+
      'AA'
    )
  })


  it('Should handle rectangles', () => {
    let input = new Input(['1', '4 3', '?DE', '?AB', '??C', '???'])
    solution(input, output)
    expect(output.toString()).to.equal(
      'Case #1:\n'+
      'DDE\n' +
      'AAB\n' +
      'CCC\n' +
      'CCC'
    )
  })
})
