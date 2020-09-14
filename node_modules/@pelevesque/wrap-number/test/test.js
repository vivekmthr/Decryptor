/* global describe, it */
'use strict'

const expect = require('chai').expect
const wrapNumber = require('../index')

const test = (min, max, tests) => {
  tests.forEach(v => {
    const result = wrapNumber(v[0], min, max)
    const expected = v[1]
    expect(result).to.equal(expected)
  })
}

describe('#wrapNumber()', () => {
  it('should work in a positive to positive range', () => {
    const min = 0
    const max = 2
    const tests = [
      [-3, 0], [-2, 1], [-1, 2],
      [0, 0], [1, 1], [2, 2],
      [3, 0], [4, 1], [5, 2]
    ]
    test(min, max, tests)
  })

  it('should work in a negative to negative range', () => {
    const min = -3
    const max = -1
    const tests = [
      [-3, -3], [-2, -2], [-1, -1],
      [0, -3], [1, -2], [2, -1],
      [3, -3], [4, -2], [5, -1]
    ]
    test(min, max, tests)
  })

  it('should work in a negative to positive range', () => {
    const min = -2
    const max = 2
    const tests = [
      [-7, -2], [-6, -1], [-5, 0], [-4, 1], [-3, 2],
      [-2, -2], [-1, -1], [0, 0], [1, 1], [2, 2],
      [3, -2], [4, -1], [5, 0], [6, 1], [7, 2]
    ]
    test(min, max, tests)
  })
})
