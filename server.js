var path = require('path');

var express = require('express');
var multer = require('multer');

var app = express();
var upload = multer({ dest: 'uploads/' });

app.use('/node_modules', express.static('node_modules'));
app.use('/js', express.static('js'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/test', upload.any(), function (req, res, next) {
    console.log(req.files);
    res.send('');
})

app.get('/files', function (req, res) {
    res.json([
        { title: 'dat rolling.gif' },
        { title: 'holy melanholy.jpg' }
    ]);
    // res.json([]);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
