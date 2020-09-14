/* global describe, it */
'use strict'

const expect = require('chai').expect
const scaleNumber = require('../index')

describe('#scaleNumber()', () => {
  it('should work without scaling', () => {
    const result = scaleNumber(10, 0, 100, 0, 100)
    const expected = 10
    expect(result).to.equal(expected)
  })

  it('should work when scaling maximum to higher value', () => {
    const result = scaleNumber(10, 0, 100, 0, 1000)
    const expected = 100
    expect(result).to.equal(expected)
  })

  it('should work when scaling maximum to lower value', () => {
    const result = scaleNumber(10, 0, 100, 0, 10)
    const expected = 1
    expect(result).to.equal(expected)
  })

  it('should work when scaling minimum to higher value', () => {
    const result = scaleNumber(20, 0, 100, 50, 100)
    const expected = 60
    expect(result).to.equal(expected)
  })

  it('should work when scaling minimum to lower value', () => {
    const result = scaleNumber(10, 0, 100, -100, 100)
    const expected = -80
    expect(result).to.equal(expected)
  })

  it('should work when scaling to range inside initial range', () => {
    const result = scaleNumber(10, 0, 100, 40, 60)
    const expected = 42
    expect(result).to.equal(expected)
  })

  it('should work when scaling to range outside initial range', () => {
    const result = scaleNumber(10, 0, 100, -100, 200)
    const expected = -70
    expect(result).to.equal(expected)
  })

  it('should work with floats', () => {
    const result = scaleNumber(10.78, 0, 100, -100, 200)
    const expected = -67.66
    expect(result).to.equal(expected)
  })
})
