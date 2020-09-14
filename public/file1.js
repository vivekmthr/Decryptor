function add_nums(x, y) {
    return x * y;
}

function alertme() {
    alert("this is a page")
}
get_data = (data, shift) => {
    console.log(data + 'this is data')
    console.log(shit + 'this is shift')
}


get_decrypt = (data, shift) => {
    var new_data = []
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
    console.log(new_data)
    return new_data;
}




get_decrypt('Maxkx bl gxbmaxk', 7)