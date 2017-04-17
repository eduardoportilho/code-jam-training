let expect = require('chai').expect
let Input = require('../lib/input')
let Output = require('../lib/output')
let solution = require('../solutions/2017.1a.a.js')

describe('2017.1a.a', () => {
  var output

  beforeEach(() => {
    output = new Output()
  })

  xit('Should handle rectangles', () => {
    let input = new Input(['1', '2 2', '??', '?A'])
    solution(input, output)
    expect(output.toString()).to.equal(
      'Case #1:\n'+
      'AA\n'+
      'AA'
    )
  })


  it('Detected errors', () => {
    let input = new Input(['1', '4 3',
'FC?',
'E?D',
'???',
'?BA'
])
    solution(input, output)
    expect(output.toString()).to.equal(
      'Case #1:\n'+
      'FCC\n' +
      'EED\n' +
      'EED\n' +
      'BBA'
    )
  })
})
