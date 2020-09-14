add_nums = (x, y) => {
    var sum = x + y
    return sum;
}

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

getfreqs = () => {
    freqs = [0.081, 0.015, 0.028, 0.043, 0.127, 0.022, 0.020, 0.061,
        0.070, 0.0015, 0.0077, 0.04025, 0.02406, 0.06749,
        0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758,
        0.00978, 0.02360, 0.00150, 0.01974, 0.00074
    ]
    for (let index = 0; index < freqs.length; index++) {
        freqs[index] = freqs[index] * 100
            // console.log(freqs[index])
    }
    return freqs
}

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


get_decrypt = (data, shift) => {
    var new_data = []
    if (typeof shift === "string") {
        shift = parseInt(shift, 10)
    }
    if (typeof shift === "number") {
        shift = shift
    }
    for (let index = 0; index < data.length; index++) {
        var my_character = data.charCodeAt(index)
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


get_encrypt = (data, shift) => {
    var new_data = []
    shift = parseInt(shift, 10)
    for (let index = 0; index < data.length; index++) {
        var my_character = data.charCodeAt(index)
        if (my_character > 64 && my_character < 91 || my_character > 96 && my_character < 123) {
            var num = my_character + shift
            if (my_character < 91 && my_character + shift < 91) {
                my_character += shift
            } else
            if (my_character < 91 && my_character + shift > 90) {
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

module.exports = get_encrypt
module.exports = get_decrypt
module.exports = get_error
module.exports = format_data