const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const Sequelize = require('sequelize');
const models = require('./models');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));
app.use('/js', express.static(__dirname + '/node_modules/angular-tablesort/js'));
app.use('/', routes);

server.listen(process.env.PORT || 3000);
console.log('Server running');

module.exports = app;
