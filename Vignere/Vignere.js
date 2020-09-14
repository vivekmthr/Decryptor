var grid = new Array(26);

for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(26);
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz'

var plaintext = 'attack of the clones'
var key = 'cheesits'


for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
        grid[i][j] = alphabet[(j + i) % 26]
    }
}





vencrypt = (plaintext, key, grid) => {
    //declare necessary vars
    var new_data = []
    var pos1
    var pos2
    var add = 0
        //loops through every element of plaintext
    for (let index = 0; index < plaintext.length; index++) {
        var my_character = plaintext.charCodeAt(index)
            //checks if char is letter and if so modifies and adds to array
        if (my_character > 64 && my_character < 91 || my_character > 96 && my_character < 123) {
            my_character = String.fromCharCode(my_character)
            for (let j = 0; j < 26; j++) {
                if (grid[j][0] == my_character) {
                    pos1 = j
                }
                if (grid[0][j] == key[add % key.length]) {
                    pos2 = j
                }
            }
            add++
            new_data.push((grid[pos1][pos2]))
                //otherwise adds char as is
        } else {
            new_data.push(String.fromCharCode(my_character))
        }
    }
    //modifies the new data
    new_data = new_data.join('')
    console.log(new_data)
    return new_data
}

var new_data = vencrypt(plaintext, key, grid)



vdecrypt = (new_data, key, grid) => {
    var data = []
    var pos1
    var pos2
    var add = 0
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for (let index = 0; index < new_data.length; index++) {
        var my_character = new_data.charCodeAt(index)
        if (my_character > 64 && my_character < 91 || my_character > 96 && my_character < 123) {
            my_character = String.fromCharCode(my_character)
            for (let j = 0; j < 26; j++) {
                if (grid[0][j] == key[add % key.length]) {
                    pos2 = j
                    break
                }
            }
            for (let i = 0; i < 26; i++) {
                if (grid[i][pos2] == my_character) {
                    pos1 = i
                    data.push(alphabet[pos1])
                    break;
                }
            }
            add++
        } else {
            data.push(String.fromCharCode(my_character))
        }
    }
    data = data.join('')
    console.log(data)
    return data
}

vdecrypt(new_data, key, grid)