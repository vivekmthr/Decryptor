/* global describe, it */
'use strict'

const expect = require('chai').expect
const removeOffsets = require('../index')

describe('#removeOffsets()', () => {
  it('should not remove identical strings', () => {
    const arr = [
      '12345',
      '12345',
      '12345'
    ]
    removeOffsets(arr)
    const result = arr
    const expected = [
      '12345',
      '12345',
      '12345'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should not remove non-offsetted strings', () => {
    const arr = [
      '12345',
      '67891',
      'abcde'
    ]
    removeOffsets(arr)
    const result = arr
    const expected = [
      '12345',
      '67891',
      'abcde'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should remove one offsetted string', () => {
    const arr = [
      '12345',
      'abcde',
      '45123'
    ]
    removeOffsets(arr)
    const result = arr
    const expected = [
      '12345',
      'abcde'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should remove many offsetted strings', () => {
    const arr = [
      'abcdef',
      '123456',
      'defabc', // 0
      'apple',
      '234561', // 1
      'banana',
      '456123', // 1
      'panama',
      'amapan' // 8
    ]
    removeOffsets(arr)
    const result = arr
    const expected = [
      'abcdef',
      '123456',
      'apple',
      'banana',
      'panama'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should remove many offsetted strings with a step bigger than one', () => {
    const arr = [
      '123456789',
      'aaaabbbbb',
      'abbbbbaaa',
      'bbbbbaaaa', // 1
      '234567891', // 0
      '678912345', // 0
      '912345678'
    ]
    removeOffsets(arr, 4)
    const result = arr
    const expected = [
      '123456789',
      'aaaabbbbb',
      'abbbbbaaa',
      '912345678'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })
})
