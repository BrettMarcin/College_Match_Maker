var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

server.listen(process.env.PORT || 3000);
console.log('Server running');

module.exports = app;