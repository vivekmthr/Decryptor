'use strict'

const isOffset = require('@pelevesque/is-offset')

module.exports = (arr, step = 1) => {
  let indicesToRemove = []
  for (let i = 0; i < arr.length - 1; i++) {
    if (indicesToRemove.indexOf(i) === -1) {
      for (let j = i + 1; j < arr.length; j++) {
        if (isOffset(arr[i], arr[j], step)) {
          indicesToRemove.push(j)
        }
      }
    }
  }
  indicesToRemove.sort((a, b) => b - a) // sort descending
  indicesToRemove.forEach(v => arr.splice(v, 1))
}
