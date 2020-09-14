[![Build Status](https://travis-ci.org/pelevesque/permutate.svg?branch=master)](https://travis-ci.org/pelevesque/permutate)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/permutate/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/permutate?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# permutate

Permutates elements. Same as https://www.npmjs.com/package/permutater, but with the addition of filtering unique sets.

When `removeOffsets` is set with an integer `>` 0, `removeOffsets` is run with the integer as the step to use.

@see https://www.npmjs.com/package/@pelevesque/remove-offsets for more details.

## Node Repository

[https://www.npmjs.com/package/@pelevesque/permutate](https://www.npmjs.com/package/@pelevesque/permutate)

## Installation

`npm install @pelevesque/permutate`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

```js
const permutate = require('@pelevesque/permutate');
```

```js
permutate({
  characters: 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
  length: 3
})
// ['aaa', 'aab', 'aac' ... '997', '998', '999'].length = 46656
```

```js
permutate({
  characters: '1.23'.split('.'),
  length: 2
})
// ['11', '123', '231', '2323']
```

```js
permutate({
  charactersAt: {
    0: ['0', '1', '2']
  },
  characters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  length: 2
})
// ['0a', '0b', '0c' ... '2x', '2y', '2z'].length = 78
```

```js
permutate({
  charactersAt: {
    0: ['a', 'b'],
    1: ['-']
  },
  characters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  length: 3
})
// ['a-a', 'a-b', 'a-c' ... 'b-x', 'b-y', 'b-z'].length = 52
```

```js
permutate({
  characters: 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
  length: 5,
  limit: 30
})
// ['fn6p3', 'x83na', '3v20r' ... ].length = 30
```

```js
permutate({
  characters: 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
  length: 8,
})
// out of memory
```

```js
permutate({
  characters: '123'.split(''),
  length: 3,
  removeOffsets: 1 // indicates the step to use when removing offsets
})
// [
//   '111', '112', '113', '122', '123', '132', '133',
//   '222', '223', '233',
//   '333'
// ]
```

```js
permutate({
  characters: '123'.split(''),
  length: 3,
  removeOffsets: 2 // indicates the step to use when removing offsets
})
// [
//   '111', '112', '113', '122', '123', '132', '133',
//   '211', '212', '213', '222', '223', '233',
//   '311', '312', '313', '322', '323', '333'
// ]
```
