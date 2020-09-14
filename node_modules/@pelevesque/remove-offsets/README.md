[![Build Status](https://travis-ci.org/pelevesque/remove-offsets.svg?branch=master)](https://travis-ci.org/pelevesque/remove-offsets)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/remove-offsets/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/remove-offsets?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# remove-offsets

Removes offsetted strings from an array.

## Node Repository

[https://www.npmjs.com/package/@pelevesque/remove-offsets](https://www.npmjs.com/package/@pelevesque/remove-offsets)

## Installation

`npm install @pelevesque/remove-offsets`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

### parameters

```js
arr (required)   
step (optional) default = 1
```

### examples

```js
const removeOffsets = require('@pelevesque/remove-offsets')
```

```js
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
[
  'abcdef',
  '123456',
  'apple',
  'banana',
  'panama'
]
```

```js
// Only check for offsets every 4 steps
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
[
  '123456789',
  'aaaabbbbb',
  'abbbbbaaa',
  '912345678'
]
```
