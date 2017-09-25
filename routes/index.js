var express = require('express');
var router = express.Router();
var models = require('../models/index');
const path = require('path');

router.post('/addToDatabase', function(req, res) {
	if (req.body.name !== null && req.body.state !== null && req.body.students !== null && req.body.tuition !== null) {
		models.College.create({
			name: req.body.name,
			state: req.body.state,
			students: req.body.students,
			tuition: req.body.tuition
		}).then(function(college) {
			res.json(college);
		});
	} else {
		res.json({
			'error': 'An attribute was null'
		});
	}
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
	});
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/home.html'));
});

module.exports = router;
