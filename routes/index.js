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
			res.json({ 'error': 'There was an error', 'errorMessage': data });
		});
	} else {
		res.json({'error': 'An attribute was null'});
	}
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
	}).then(function(){
		res.json({'message': 'success'});
	}).catch(function(error){
		res.json({'message': 'error', 'messageContent' : error});
	});
});

router.post('/sendCollegeInfo', function(req, res) {
	databaseHandler.getSpecificColleges(req.body).then(function(colleges) {
		res.json(colleges);
	}).catch(function(data) {
		res.json({ 'error': 'There was an error', 'errorMessage': data });
	});
});


router.get('/colleges', function(req, res) {
	models.College.findAll({}).then(function(colleges) {
		res.json(colleges);
	}).catch(function(data) {
		res.json({'error': 'There was an error', 'errorMessage': data });
	});
});

router.get('/checkUsername', function(req, res) {
	if(req.query.theUser !== '') {
		models.User.findAndCount({
			where: {'userName': req.query.theUser}
		}).then(function (theCount) {
			res.json({'theCount' : theCount});
		}).catch(function () {
			console.log('error');
			res.json(null);
		});
	} else {
		res.json(null);
	}
});

router.get('/getCertainColleges', function(req, res){
	if(req.query.search !== '') {
		models.College.findAll({
			where: {'name': {$like: '%' + req.query.search + '%' }},
			limit: 5
		}).then(function (colleges) {
			res.json(colleges);
		}).catch(function (data) {
			res.json({'error': 'There was an error', 'errorMessage': data});
		});
	} else {
		res.json(null);
	}
});


router.get('/getForms/:theCollege', function(req, res){
	models.form.findAll({where: {'college' : req.params.theCollege}}).then(function(forms) {
		res.status(200);
		res.json(forms);
	}).catch(function(data) {
		res.status(500);
		res.json({'error': 'There was an error', 'errorMessage': data });
	});
});

function checkAuthentication(req,res,next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(500);
		res.json({'Message': 'Can\'t perform action because you are not logged in.'});
	}
}

module.exports = router;
