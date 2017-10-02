var express = require('express');
var router = express.Router();
var models = require('../models/index');
const path = require('path');

router.post('/college', function(req, res) {
	if (req.body.name !== null && req.body.state !== null && req.body.students !== null && req.body.tuition !== null) {
		models.College.create({
			name: req.body.name,
			state: req.body.state,
			students: req.body.students,
			tuition: req.body.tuition,
			rank: req.body.rank
		}).then(function(college) {
			res.json(college);
		}).catch(function(data) {
			res.json({
				'error': 'There was an error',
				'errorMessage': data
			});
		});
	} else {
		res.json({
			'error': 'An attribute was null'
		});
	}
});

router.get('/college', function(req, res){
	res.sendFile(path.join(__dirname + '/../views/college.html'));
});

router.delete('/college/:theCollege', function(req, res){
	console.log(req.params.theCollege);
});

router.get('/colleges', function(req, res){
	res.sendFile(path.join(__dirname + '/../views/colleges.html'));
});

router.post('/addPost', function(req, res){
	console.log('Will allow users to post');
});

router.post('/sendCollegeInfo', function(req, res) {
	var collegeOne = {
		'name': 'Umass',
		'state': 'MA',
		'tuition': '1000',
		'rank': 3
	};
	var collegeTwo = {
		'name': 'UNH',
		'state': 'NH',
		'tuition': '2000',
		'rank': 2
	};
	var collegeThree = {
		'name': 'Stanford',
		'state': 'CA',
		'tuition': '5000',
		'rank': 1
	};
	res.json([collegeOne, collegeTwo, collegeThree]);
});


router.get('/showDatabase', function(req, res) {
	models.College.findAll({}).then(function(colleges) {
		res.json(colleges);
	}).catch(function(data) {
		res.json({
			'error': 'There was an error',
			'errorMessage': data
		});
	});
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/home.html'));
});

router.get('/API', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/api.html'));
});

module.exports = router;
