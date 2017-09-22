var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var Sequelize = require('sequelize');

app.use(express.static(__dirname + '/'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const sequelize = new Sequelize('postgres://new_user:new_password@localhost:5432/colleges');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


app.post('/addToDatabase', function(req, res){

});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

server.listen(process.env.PORT || 3000);
console.log('Server running');

module.exports = app;