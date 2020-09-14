[![Build Status](https://travis-ci.org/pelevesque/supersubstr.svg?branch=master)](https://travis-ci.org/pelevesque/supersubstr)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/supersubstr/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/supersubstr?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# supersubstr

Like Javascript's substr, but with wrapping and reversed substrings.

## Node Repository

[https://www.npmjs.com/package/@pelevesque/supersubstr](https://www.npmjs.com/package/@pelevesque/supersubstr)

## Installation

`npm install @pelevesque/supersubstr`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

### parameters

```js
str        (required)  
startIndex (optional) default = 0  
length     (optional) default = startIndex to the string end  
reversed   (optional) default = false  
```

### examples

```js
const supersubstr = require('@pelevesque/supersubstr')
```

```js
const str = '12345'
const startIndex = 1
const result = supersubstr(str, startIndex)
// result === '2345'
```

```js
const str = '12345'
const startIndex = 2
const length = 10
const reversed = true
const result = supersubstr(str, startIndex, length, reversed)
// result === '3215432154'
```
