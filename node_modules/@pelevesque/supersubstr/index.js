'use strict'

const wrapNumber = require('@pelevesque/wrap-number')
const scaleNumber = require('@pelevesque/scale-number')
const reverseString = require('string-reverse')

module.exports = (str, startIndex = 0, length, reverse = false) => {
  const lastIndex = str.length - 1
  startIndex = wrapNumber(startIndex, 0, lastIndex)
  if (reverse) {
    startIndex = scaleNumber(startIndex, 0, lastIndex, lastIndex, 0)
    str = reverseString(str)
  }
  if (typeof length === 'undefined') {
    length = str.length - startIndex
  }
  let substr = ''
  for (let i = 0; i < length; i++) {
    substr += str.charAt((i + startIndex) % str.length)
  }
  return substr
}
