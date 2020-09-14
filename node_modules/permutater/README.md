Generates all possible values based on a defined length..
with or without a limit

```javascript
const permutater = require('permutater');
```
```javascript
permutater({
    characters : 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
    length : 3
})
// ['aaa', 'aab', 'aac' ... '997', '998', '999'].length = 46656
```
```javascript
permutater({
    charactersAt : {
        0 : ['0', '1', '2']
    },
    characters : 'abcdefghijklmnopqrstuvwxyz'.split(''),
    length : 2
})
// ['0a', '0b', '0c' ... '2x', '2y', '2z'].length = 78
```
```javascript
permutater({
    charactersAt : {
        0 : ['a', 'b'],
        1 : ['-']
    },
    characters : 'abcdefghijklmnopqrstuvwxyz'.split(''),
    length : 3
})
// ['a-a', 'a-b', 'a-c' ... 'b-x', 'b-y', 'b-z'].length = 52
```
```javascript
permutater({
    characters : 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
    length : 5,
    limit : 30
})
// ['fn6p3', 'x83na', '3v20r' ... ].length = 30
```
