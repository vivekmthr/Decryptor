const jsonfile = require('jsonfile')
const file = './dictionary.json'
const permutate = require('@pelevesque/permutate');
//creates grid
create_grid = () => {
    var grid = []
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < 26; i++) {
        grid[i] = new Array(26);
    }
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            grid[i][j] = alphabet[(j + i) % 26]
        }
    }
    return grid
};
//encrypts a data set using a key
vencrypt = (plaintext, key, grid) => {
    //declare necessary vars
    var new_data = []
    var pos1
    var pos2
    var add = 0
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
        //loops through every element of plaintext
    for (let index = 0; index < plaintext.length; index++) {
        var my_character = plaintext.charCodeAt(index);
        //checks if char is letter and if so modifies and adds to array
        if ((my_character > 64 && my_character < 91) || (my_character > 96 && my_character < 123)) {
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
    return new_data
};
//decrypts a data set using a key
vdecrypt = (new_data, key, grid) => {
    var data = []
    var pos1
    var pos2
    var add = 0
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for (let index = 0; index < new_data.length; index++) {
        var my_character = new_data[index].charCodeAt()
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
    return data
};
//creates a container, which creates different data sets based on key_size
create_container = (data, key_size) => {
    data1 = parse_to_letters(data);
    //create new_data to store all letters in sub arrays
    var new_data = []
    for (let i = 0; i < (Math.round(key_size)); i++) {
        new_data.push(new Array())
    }
    //populate sub arrays
    for (let index = 0; index < data1.length; index++) {
        new_data[index % key_size].push(data1[index])
    }
    return new_data;
};
//MISK: parses a data set to letters
parse_to_letters = (data) => {
    var data1 = []
        //parse so that it contains only letters
    for (let index = 0; index < data.length; index++) {
        var my_character = data.charCodeAt(index)
        if (char_check(my_character)) {
            my_character = String.fromCharCode(my_character)
            data1.push(my_character)
        }
    }
    return data1;
};
//MISK : checks for chars
char_check = (my_character) => {
    if ((my_character > 64 && my_character < 91) || (my_character > 96 && my_character < 123)) {
        return true
    } else {
        return false
    }
};
//MISK
return_smallest = (array) => {
    var temp = array[0]
    var min_index = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] <= temp) {
            temp = array[i]
            min_index = i
        }
    }
    return min_index
};
//MISK
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
};
//gets letter frequencines from array
get_freqs = (whole_data) => {
    var letter_freqs = []
    for (let index = 0; index < whole_data.length; index++) {
        letter_freqs.push(format_data(whole_data[index]))
    }
    return letter_freqs
};
//gets the letter frequencies from the sample
format_data = (data) => {
    var letter_freqs = Array(26)
    for (let i = 0; i < letter_freqs.length; i++) {;
        letter_freqs[i] = 0;
    }
    var alphabet = 'abcdefghijklmnopqrstuvxyz'
    for (let i = 0; i < data.length + 1; i++) {
        for (let j = 0; j < alphabet.length + 1; j++) {
            if (data[i] == alphabet[j]) {
                letter_freqs[j] += 1;
            }
        }
    }
    var total = letter_freqs.reduce((a, b) => a + b, 0)
    for (let i = 0; i < letter_freqs.length; i++) {
        letter_freqs[i] = letter_freqs[i] / total * 100
    }
    return letter_freqs
};
//returns the most likely shif for every char of the key
get_error = (my_letter_freq) => {
    hard_coded_frequency = [8.17, 1.49, 2.2, 4.25, 12.7, 2.23, 2.02, 6.09, 6.97, 0.15, 1.29, 4.03, 2.41, 6.75, 7.51,
        1.93, 0.095, 5.99, 6.33, 9.36, 2.76, 0.98, 2.56, 0.15, 1.99, 0.08
    ]
    var errors = []
    for (let index = 0; index < errors.length; index++) {
        errors[index] = 0;

    }
    // calculate error for each shift
    for (let shift = 0; shift < 26; ++shift) { // to calculate error, compare each element in the two arrays, offset by shift
        var error = 0;
        for (let i = 0; i < 26; ++i) {
            error += Math.abs((hard_coded_frequency[(i + shift) % 26] - my_letter_freq[i]));
        }
        errors[shift] = error;
    }
    //find index of 3 smallest datapoints
    var array_data = []
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for (let j = 0; j < 5; j++) {
        var i = return_smallest(errors)
            //console.log(i)
        if (i == 0) {
            array_data.push(alphabet[0])
        } else {
            array_data.push(alphabet[26 - i])
        }
        errors.splice(i, 1, 1000)
    }
    return array_data
};
//returns the actual shift values
get_shift = (sample_freqs) => {
    var shifts = []
    var add1 = 0
    var add2 = 0
    for (let index = 0; index < sample_freqs.length; index++) {
        shifts.push(get_error(sample_freqs[index]))
    }
    return shifts
};
//gets the possible combos of shifts
get_combos = (shifts, key_length) => {
    var my_characters = []
    if (shifts.length > 2) {
        for (let i = 0; i < shifts.length; i++) {
            my_characters.push(i)
        }
    } else {
        for (let i = 0; i < 3; i++) {
            my_characters.push(i)
        }
    }

    my_characters = my_characters.join('')
    var combos = permutate({
        characters: '01234'.split(''),
        length: key_length
    })
    return combos
};
//gets the possible keys
get_keys = (shifts, combos) => {
    keys = []
    keys1 = []
    for (let i = 0; i < combos.length; i++) {
        for (let j = 0; j < shifts.length; j++) {
            //console.log(combos[i][j])
            //console.log(shifts[j][parseInt(combos[i][j])])
            keys1.push(shifts[j][parseInt(combos[i][j])])
        }
        keys.push(keys1)
        keys1 = []
    }
    return keys
};
//possible decrypts using these keys
get_decrypt = (encrypted_data, keys, grid) => {
    var decrypted_data = []
    for (let i = 0; i < keys.length / 2; i++) {
        decrypted_data.push(vdecrypt(encrypted_data, keys[i], grid))
    }
    return decrypted_data
};

//converts the decrypts into arrays
into_array = (decrypted_data) => {
    for (let i = 0; i < decrypted_data.length; i++) {
        decrypted_data[i] = decrypted_data[i].split(" ")
    }
    return decrypted_data
};
//checks the arrays against a dictionary to return most likely function
dictionary_check = (decrypted_data) => {
    var checkWord = require('check-word')
    words = checkWord('en')
    var counts = []
    var count = 0
        //console.log(decrypted_data)
    for (let i = 0; i < decrypted_data.length; i++) {
        for (let j = 0; j < 5; j++) {
            if (words.check(decrypted_data[i][j]) || decrypted_data[i][j] == 'a') {
                //console.log(decrypted_data[i][j])
                count++
                //console.log(count)
            }
        }
        if (count >= 4) {
            return decrypted_data[i]
        }
        //console.log(count + 'this is count')
        //counts.push(count)
        count = 0
    }
};



var grid = create_grid()
var plaintext = 'I think can dance well but the truth is I actually cannot dance but I will actually be able to '
var key = "fafer"
plaintext = plaintext.toLowerCase();
key = key.toLowerCase();
var encrypted_data = vencrypt(plaintext, key, grid)
    //console.log(encrypted_data)
var whole_data = create_container(encrypted_data, key.length)
var sample_freqs = get_freqs(whole_data)
var shifts = get_shift(sample_freqs)
console.log(shifts)
combos = get_combos(shifts, key.length)
console.log(combos)
keys = get_keys(shifts, combos)
    //console.log(keys)
decrypted_data = get_decrypt(encrypted_data, keys, grid)
decrypted_data = into_array(decrypted_data)
var decrypted = dictionary_check(decrypted_data)
console.log(decrypted)

module.exports(vencrypt)














//var whole_text = multiple_decrypted(shifts, whole_data)


//var decrypted_data = decrypted(whole_data, shifts)
//var reparsed = reparse(decrypted_data)
//formatted_data = add_spaces(reparsed, plaintext)