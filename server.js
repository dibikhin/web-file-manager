var path = require('path');
var fs = require('fs');

var express = require('express');
var multer = require('multer');
var _ = require('underscore');

var app = express();
var upload = multer({ dest: 'uploads/' });

app.use('/node_modules', express.static('node_modules'));
app.use(express.static('public'));


app.get('/files', function (req, res) {

});

app.post('/files', upload.any(), function (req, res) {

});

app.get('/files/:name', function (req, res) {

});

app.delete('/files/:name', function (req, res) {

});


app.listen(3000, function () {
    console.log('File Manager listening on port 3000!');
});
