var express = require('express');
var router = express.Router();
var models = require('../models/index');
const path = require('path');
var databaseHandler = require('../Objects/databaseHandler');

router.post('/college', function(req, res) {
	var theCollege = databaseHandler.createCollegeObject(req.body);
	if (theCollege !== null) {
		models.College.create(theCollege).then(function(college) {
			res.json(college);
		}).catch(function(data) {
			res.json({
				'error': 'There was an error',
				'errorMessage': data
			});
		});
	} else {
		res.json({'error': 'An attribute was null'});
	}
});

router.get('/getCollege/:theCollege', function(req, res){
	res.sendFile(path.join(__dirname + '/../views/college.html'));
});

router.get('/college/:theCollege', function(req, res){
	models.College.findOne({
		where: {'name' : req.params.theCollege}
	}).then(function(theCollege){
		res.json(theCollege.dataValues);
	}).catch(function(){
		res.json(null);
	});
});

router.delete('/college/:theCollege', function(req, res){
	models.College.destroy({
		where: {'name' : req.params.theCollege}
	}).then(function(theCollege){
		res.json({'message': 'sucess'});
	}).catch(function(error){
		res.json({'message': 'error', 'messageContent' : error});
	});
});

router.get('/colleges', function(req, res){
	res.sendFile(path.join(__dirname + '/../views/colleges.html'));
});

router.post('/addPost', function(req, res){
	console.log('Will allow users to post');
});

router.post('/sendCollegeInfo', function(req, res) {
	models.College.findAll({}).then(function(colleges) {
		res.json(colleges);
	}).catch(function(data) {
		res.json({
			'error': 'There was an error',
			'errorMessage': data
		});
	});
});


router.get('/getColleges', function(req, res) {
	models.College.findAll({}).then(function(colleges) {
		res.json(colleges);
	}).catch(function(data) {
		res.json({
			'error': 'There was an error',
			'errorMessage': data
		});
	});
});

router.get('/angular', function(req, res) {
	res.sendFile(path.join(__dirname + '/../college-web/src/index.html'));

});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/home.html'));
});

router.get('/API', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/api.html'));
});

module.exports = router;
