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
}

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
}

//decrypts a data set using a key
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
    return data
}

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
}

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
}

//MISK : checks for chars
char_check = (my_character) => {
    if (my_character > 64 && my_character < 91 || my_character > 96 && my_character < 123) {
        return true
    } else {
        return false
    }
}


get_freqs = (whole_data) => {
    var letter_freqs = []
    for (let index = 0; index < whole_data.length; index++) {
        letter_freqs.push(format_data(whole_data[index]))
    }
    return letter_freqs
}

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
}

get_shift = (sample_freqs) => {
    var shifts = []
    for (let index = 0; index < sample_freqs.length; index++) {
        shifts.push(get_error(sample_freqs[index]))
    }
    return shifts
}

//now that you have parsed data set, every data set will have similar shifts for each thing
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
    var min = Math.min(...errors)
    for (let index = 0; index < errors.length; index++) {
        if (min == errors[index]) {
            var shift = index
        }
    }
    return shift
}

get_decrypt = (whole_data, shifts) => {
    var decrypted_text = []
    for (let index = 0; index < shifts.length; index++) {
        decrypted_text.push(get_decrypt(whole_data[index], shifts[index]))
    }
    return decrypted_text;
}

//returns the decrypted data
get_decrypt = (data, shift) => {
    var new_data = []
        //console.log(data)
        //console.log(data.charCodeAt(0))
    if (typeof shift === "string") {
        shift = parseInt(shift, 10)
    }
    if (typeof shift === "number") {
        shift = shift
    }
    for (let index = 0; index < data.length; index++) {
        var my_character = data.charCodeAt(10)
        if (my_character > 64 && my_character < 91 || my_character > 96 && my_character < 123) {
            if (my_character < 91 && my_character + shift < 91) {
                my_character += shift
            } else if (my_character < 91 && my_character + shift > 90) {
                my_character = (my_character + shift) % 90 + 64
            } else if (my_character > 96 && (my_character + shift) < 123) {
                my_character += shift
            } else if (my_character > 96 && my_character + shift > 122) {
                my_character = (my_character + shift) % 122 + 96
            }
            new_data.push(String.fromCharCode(my_character))
        } else {
            new_data.push(String.fromCharCode(my_character))
        }
    }
    new_data = new_data.join('')
    return new_data;
}



decrypted = (whole_data, shifts) => {
    var decrypted = []
    for (let index = 0; index < shifts.length; index++) {
        decrypted.push(get_decrypt(whole_data[index], shifts[index]))
    }
    return decrypted
}

//returns the decrypted data
get_decrypt = (data, shift) => {
    var new_data = []
    if (typeof shift === "string") {
        shift = parseInt(shift, 10)
    }
    if (typeof shift === "number") {
        shift = shift
    }
    for (let index = 0; index < data.length; index++) {
        var my_character = data[index].charCodeAt()
        if (my_character > 64 && my_character < 91 || my_character > 96 && my_character < 123) {
            if (my_character < 91 && my_character + shift < 91) {
                my_character += shift
            } else if (my_character < 91 && my_character + shift > 90) {
                my_character = (my_character + shift) % 90 + 64
            } else if (my_character > 96 && (my_character + shift) < 123) {
                my_character += shift
            } else if (my_character > 96 && my_character + shift > 122) {
                my_character = (my_character + shift) % 122 + 96
            }
            new_data.push(String.fromCharCode(my_character))
        } else {
            new_data.push(String.fromCharCode(my_character))
        }
    }
    return new_data;
}

//repareses the 3 separate strings into 1 massive array
reparse = (decrypted_data) => {
    var final_data = []
    var index = 0
    var index2 = 0
    var index3
    var fake = new Array(decrypted_data[0].length)
    while (fake.length != 0) {
        //console.log(fake.length)
        // console.log(index % decrypted_data.length)
        //console.log(index2)
        //console.log(decrypted_data[index % decrypted_data.length][index2])
        final_data.push(decrypted_data[index % decrypted_data.length][index2])
        if (index % decrypted_data.length == 2) {
            fake.shift()
            if (index != 0) {
                index2++
            }
        }
        index++
    }
    return final_data
}

add_spaces = (final_data, plaintext) => {
    //add spaces will loop through every element of final data, and compare it to the original data, if a char is not a letter
    //that char will be inserted into final data
    for (let index = 0; index < plaintext.length; index++) {
        var character = plaintext[index].charCodeAt()
        if (char_check(character) == false) {
            character = String.fromCharCode(character)
            final_data.splice(index, 0, character)
        }
    }
    final_data = final_data.join('')
    final_data = final_data.split(' ')
}

jsonfile.readFile(file, function(err, obj) {
    if (err) {
        console.error(err)
    } else {
        const dictionary = Object.keys(obj)

    }
})

multiple_decrypted = (shifts, whole_data) => {
    var whole_text = []
    for (let i = 0; i < shifts.length; i++) {
        whole_text.push(decrypted(whole_data, shifts[i]))
    }
    return whole_text
}

multiple_reparsed = (shifts, whole_data) => {
    var whole_text = []
    for (let i = 0; i < shifts.length; i++) {
        whole_text.push(decrypted(whole_data, shifts[i]))
    }
    return whole_text
}




var grid = create_grid()
var plaintext = 'Hello, I am Vivek, I am eighteen years old, I love to play soccer and drink with my friends. I am also an avid basketball player. I love chickens.I am 14 years Old. I am amazing at everything, I like to play the flute, I love charminar, I like cheese, i like chicken, I like hope, I like martyrs'
var key = "abc"
plaintext = plaintext.toLowerCase()
key = key.toLowerCase()
var encrypted_data = vencrypt(plaintext, key, grid)
    //var decrypted_data = vdecrypt(encrypted_data, key, grid)
var whole_data = create_container(encrypted_data, 3)
var sample_freqs = get_freqs(whole_data)
var shifts = get_shift(sample_freqs)
var decrypted = get_decrypt(whole_data, shifts)
    //console.log(decrypted)


//gets the shift
get_shift = (sample_freqs) => {
    var shifts = []
    var add1 = 0
    var add2 = 0
    for (let index = 0; index < sample_freqs.length; index++) {
        shifts.push(get_error(sample_freqs[index]))
    }
    return shifts
        //console.log(shifts)
    var mod_shift = []
    var final_shifts = []
        /*
            for (let i = 1; i < 28; i++) {
                for (let j = 0; j < sample_freqs.length; j++) {
                    if (j == 0) {
                        //console.log(add2 + ' this is add2')
                        mod_shift.push(shifts[j][add2])
                            //console.log(shifts[j][add2])
                    }
                    if (j == 1) {
                        //console.log(add1 + ' this is add1')
                        mod_shift.push(shifts[j][add1])
                            //console.log(shifts[j][add1])
                    }
                    if (j == 2) {
                        //console.log((i - 1) % 3 + ' this is i mod 3')
                        mod_shift.push(shifts[j][(i - 1) % 3])
                            //console.log(shifts[j][(i - 1) % 3])
                    }
                }
                if ((i % 3) == 0) {
                    add1++
                }
                if ((i % 9) == 0) {
                    add2++
                    add1 = 0
                }
                //console.log("for loop finished")
                final_shifts.push(mod_shift)
                mod_shift = []
            }
            //console.log(final_shifts)
            return final_shifts*/
};


format_array = (shifts) => {
    var full_data = []
    var combos = []
        //console.log(shifts)
    for (let i = 0; i < shifts.length; i++) {
        full_data.push(shifts[i].join(''))
        for (let index = 0; index < full_data.length; index++) {
            combos.push((full_data[index]))
        }
        full_data = []
    }
    combos = combos.join('')
    return combos;
}