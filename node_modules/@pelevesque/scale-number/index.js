'use strict'

module.exports = (num, oldMin, oldMax, newMin, newMax) =>
  (((newMax - newMin) * (num - oldMin)) / (oldMax - oldMin)) + newMin
