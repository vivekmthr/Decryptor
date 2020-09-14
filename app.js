var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var get_data = require('./web.js')

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/', function(req, res) {
    var data = req.body.data
    var shift1 = req.body.shift1
    var shift2 = req.body.shift2
    var encrypt_data = req.body.encrypt_data
    data = Decrypt(data, shift2)
    encrypt_data = get_encrypt(encrypt_data, shift1)
    res.render('home1', {
        data: data,
        encrypt_data: encrypt_data,
    })
})

app.listen(3000);



Decrypt = (data, shift) => {
    console.log(shift)
    if (shift != 0) {
        data = get_decrypt(data, shift)
        return data
    }
    letter_freqs = format_data(data);
    freqs = getfreqs()
    shift = get_error(letter_freqs)
    data = get_decrypt(data, shift)
    console.log(data + 'this is modified data')
    return data
}