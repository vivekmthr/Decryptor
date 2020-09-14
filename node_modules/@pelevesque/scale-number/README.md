[![Build Status](https://travis-ci.org/pelevesque/scale-number.svg?branch=master)](https://travis-ci.org/pelevesque/scale-number)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/scale-number/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/scale-number?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# scale-number

Scales a number within a range.

## Node Repository

[https://www.npmjs.com/package/@pelevesque/scale-number](https://www.npmjs.com/package/@pelevesque/scale-number)

## Installation

`npm install @pelevesque/scale-number`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

```js
const scaleNumber = require('@pelevesque/scale-number')
const number = scaleNumber(10, 0, 100, 0, 1000)
// number === 100
```
