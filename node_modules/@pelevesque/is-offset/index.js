'use strict'

const supersubstr = require('@pelevesque/supersubstr')

module.exports = (str1, str2, step = 1) => {
  let isOffset = false
  if (
    str1.localeCompare(str2) !== 0 &&
    str1.length === str2.length &&
    str1.length > 1 &&
    str1.length > step
  ) {
    for (let i = step; i < str1.length; i += step) {
      if (str1.localeCompare(supersubstr(str2, i, str1.length)) === 0) {
        isOffset = true
        break
      }
    }
  }
  return isOffset
}
