/* global describe, it */
'use strict'

const expect = require('chai').expect
const permutate = require('../index')

describe('#permutate()', () => {
  it('should return all permutations', () => {
    const result = permutate({
      characters: '123'.split(''),
      length: 3
    })
    const expected = [
      '111', '112', '113', '121', '122', '123', '131', '132', '133',
      '211', '212', '213', '221', '222', '223', '231', '232', '233',
      '311', '312', '313', '321', '322', '323', '331', '332', '333'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should return all permutations with a split', () => {
    const result = permutate({
      characters: '1.23'.split('.'),
      length: 2
    })
    const expected = ['11', '123', '231', '2323']
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should return all permutations with a charactersAt', () => {
    const result = permutate({
      charactersAt: { 0: ['a', 'b'], 1: ['-'] },
      characters: '123'.split(''),
      length: 3
    })
    const expected = [ 'a-1', 'a-2', 'a-3', 'b-1', 'b-2', 'b-3' ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should return all permutations with a limit', () => {
    const result = permutate({
      characters: '123'.split(''),
      length: 3,
      limit: 5
    }).length
    const expected = 5
    expect(result).to.equal(expected)
  })

  it('should remove offsets with a step of 1', () => {
    const result = permutate({
      characters: '123'.split(''),
      length: 3,
      removeOffsets: 1
    })
    const expected = [
      '111', '112', '113', '122', '123', '132', '133',
      '222', '223', '233',
      '333'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })

  it('should remove offsets with a step of 2', () => {
    const result = permutate({
      characters: '123'.split(''),
      length: 3,
      removeOffsets: 2
    })
    const expected = [
      '111', '112', '113', '122', '123', '132', '133',
      '211', '212', '213', '222', '223', '233',
      '311', '312', '313', '322', '323', '333'
    ]
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
  })
})
