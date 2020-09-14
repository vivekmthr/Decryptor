/* global describe, it */
'use strict'

const expect = require('chai').expect
const isOffset = require('../index')

describe('#isOffset()', () => {
  it('should return false for strings of length 1', () => {
    const str1 = 'a'
    const str2 = 'a'
    const result = isOffset(str1, str2)
    const expected = false
    expect(result).to.equal(expected)
  })

  it('should return false for the same string even with an offset', () => {
    const str1 = '123123'
    const str2 = '123123'
    const result = isOffset(str1, str2)
    const expected = false
    expect(result).to.equal(expected)
  })

  it('should return false for strings of different lengths', () => {
    const str1 = 'abcd'
    const str2 = 'abcdabcd'
    const result = isOffset(str1, str2)
    const expected = false
    expect(result).to.equal(expected)
  })

  it('should return false when it is not an offsetted copy', () => {
    const str1 = 'abcd'
    const str2 = 'efgh'
    const result = isOffset(str1, str2)
    const expected = false
    expect(result).to.equal(expected)
  })

  it('should return true when the offset starts on the 2nd index', () => {
    const str1 = 'abcd'
    const str2 = 'bcda'
    const result = isOffset(str1, str2)
    const expected = true
    expect(result).to.equal(expected)
  })

  it('should return true when the offset starts on a middle index', () => {
    const str1 = 'abcd'
    const str2 = 'cdab'
    const result = isOffset(str1, str2)
    const expected = true
    expect(result).to.equal(expected)
  })

  it('should return true when the offset starts on the last index', () => {
    const str1 = 'abcd'
    const str2 = 'dabc'
    const result = isOffset(str1, str2)
    const expected = true
    expect(result).to.equal(expected)
  })

  it('should return false if step is equal or bigger than string length', () => {
    const str1 = '123'
    const str2 = '123'
    const step = 3
    const result = isOffset(str1, str2, step)
    const expected = false
    expect(result).to.equal(expected)
  })

  it('should return false when the offset occurs at a wrong step (test with step of 2)', () => {
    const str1 = '112233'
    const str2 = '311223'
    const step = 2
    const result = isOffset(str1, str2, step)
    const expected = false
    expect(result).to.equal(expected)
  })

  it('should return true when the offset occurs at a correct step (test with step of 2)', () => {
    const str1 = '112233'
    const str2 = '331122'
    const step = 2
    const result = isOffset(str1, str2, step)
    const expected = true
    expect(result).to.equal(expected)
  })

  it('should return true when the offset occurs at a correct step (test with step of 3)', () => {
    const str1 = '111222333444'
    const str2 = '333444111222'
    const step = 3
    const result = isOffset(str1, str2, step)
    const expected = true
    expect(result).to.equal(expected)
  })
})
