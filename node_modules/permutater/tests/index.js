const permutater = require('../');
const assert = require('assert')


assert.strictEqual(permutater({
    characters : 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
    length : 3
}).length, 46656)


assert.strictEqual(permutater({
    charactersAt : {
        0 : ['0', '1', '2'],
    },
    characters : 'abcdefghijklmnopqrstuvwxyz'.split(''),
    length : 3
}).length, 2028)


assert.strictEqual(permutater({
    charactersAt : {
        0 : ['0', '1', '2'],
        1 : ['-']
    },
    characters : 'abcdefghijklmnopqrstuvwxyz'.split(''),
    length : 3
}).length, 78)


assert.deepStrictEqual(permutater({
    charactersAt : {
        0 : ['0', '1', '2'],
        1 : ['_'],
        2 : ['a', 'b', 'c']
    },
    length : 3
}), ['0_a','0_b','0_c','1_a','1_b','1_c','2_a','2_b','2_c'])


console.log('\x1b[32m%s\x1b[0m', 'Permutater Tests: All tests passed');
