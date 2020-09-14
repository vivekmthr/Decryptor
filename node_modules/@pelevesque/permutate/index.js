'use strict'

const permutater = require('permutater')
const removeOffsets = require('@pelevesque/remove-offsets')

module.exports = (obj) => {
  let permutations = permutater(obj)
  if (obj.removeOffsets > 0) {
    removeOffsets(permutations, obj.removeOffsets)
  }
  return permutations
}
