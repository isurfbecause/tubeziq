var express = require('express');
var https = require('https');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

//Enable cors
app.use(cors());

//For handling ajax request via angular
app.use(bodyParser.json());

app.post('/search', function(req, res) {
    request.get(req.body.searchUrl, function(err, resp, body) {
        res.send(JSON.parse(body));
    });
});

var server = app.listen(4000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example happning at http://%s:%s', host, port);
});
