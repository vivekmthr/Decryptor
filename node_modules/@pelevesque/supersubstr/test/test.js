/* global describe, it */
'use strict'

const expect = require('chai').expect
const supersubstr = require('../index')

describe('#supersubstr()', () => {
  it('should return the entire string when no parameters are set', () => {
    const str = '12345'
    const result = supersubstr(str)
    const expected = '12345'
    expect(result).to.equal(expected)
  })

  it('should return the entire string when startIndex is 0', () => {
    const str = '12345'
    const result = supersubstr(str, 0)
    const expected = '12345'
    expect(result).to.equal(expected)
  })

  it('should return part of the string when startIndex is bigger than 0, but smaller than string length', () => {
    const str = '12345'
    const result = supersubstr(str, 2)
    const expected = '345'
    expect(result).to.equal(expected)
  })

  it('should return part of the string when startIndex is negative, but bigger than the negativized string length', () => {
    const str = '12345'
    const result = supersubstr(str, -2)
    const expected = '45'
    expect(result).to.equal(expected)
  })

  it('should wrap the startIndex when it is bigger than string length', () => {
    const str = '12345'
    const result = supersubstr(str, 7)
    const expected = '345'
    expect(result).to.equal(expected)
  })

  it('should wrap the startIndex when it is negative and smaller than negativized string length', () => {
    const str = '12345'
    const result = supersubstr(str, 7)
    const expected = '345'
    expect(result).to.equal(expected)
  })

  it('should return the entire string when startIndex is negative and smaller than the negativized string length', () => {
    const str = '12345'
    const result = supersubstr(str, -8)
    const expected = '345'
    expect(result).to.equal(expected)
  })

  it('should return the first part of the string when length is shorter than string length', () => {
    const str = '12345'
    const result = supersubstr(str, 0, 3)
    const expected = '123'
    expect(result).to.equal(expected)
  })

  it('should return the middle of the string when length is shorter than the rest of the string', () => {
    const str = '12345'
    const result = supersubstr(str, 2, 2)
    const expected = '34'
    expect(result).to.equal(expected)
  })

  it('should return the last part of the string when startIndex is 2 and length is equal to the rest of the string', () => {
    const str = '12345'
    const result = supersubstr(str, 2, 3)
    const expected = '345'
    expect(result).to.equal(expected)
  })

  it('should wrap when length is longer than the string length', () => {
    const str = '12345'
    const result = supersubstr(str, 0, 12)
    const expected = '123451234512'
    expect(result).to.equal(expected)
  })

  it('should return a reversed substring when reverse is on', () => {
    const str = '12345'
    const result = supersubstr(str, 0, 3, true)
    const expected = '154'
    expect(result).to.equal(expected)
  })
})
