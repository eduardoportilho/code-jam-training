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

  it('Detected errors', () => {
    let input = new Input(['1', '4 3',
'BC?',
'D??',
'FA?',
'??E'
])
    solution(input, output)
    expect(output.toString()).to.equal(
'Case #1:\n'+
'BCC\n' +
'DCC\n' +
'FAA\n' +
'FEE'
    )
  })

  it('Detected errors', () => {
    let input = new Input(['1', '6 2',
'??',
'?E',
'C?',
'BD',
'??',
'A?'
])
    solution(input, output)
    expect(output.toString()).to.equal(
'Case #1:\n'+
'EE\n' +
'EE\n' +
'CC\n' +
'BD\n' +
'BD\n' +
'AD'
    )
  })
})
