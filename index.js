const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const Sequelize = require('sequelize');
const models = require('./models');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session    = require('express-session');
const routes = require('./routes/index.js');
var passport   = require('passport');
var cors = require('cors');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/client/dist')));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, 'client', 'src')));
app.use(express.static(path.join(__dirname, 'client', 'src', 'app')));
app.use('/college-web', express.static(path.join(__dirname, 'college-web')));
app.use('/views', express.static(path.join(__dirname, '/views')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));
app.use('/js', express.static(__dirname + '/node_modules/angular-tablesort/js'));
app.use('/api', routes);

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
	server.listen(process.env.PORT || 3000);
	server.on('error', onError);
	server.on('listening', onListening);
});

function normalizePort(val) { /* ... */ }
function onError(error) {
	console.log('There was an error: ' );
	console.log(error);
}
function onListening() {
	console.log('Server running');
}

module.exports = app;
