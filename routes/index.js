var express = require('express');
var router = express.Router();
var models = require('../models/index');
const path = require('path');

router.post('/addToDatabase', function(req, res){
    models.College.create({
        name: req.body.name
    }).then(function(college) {
        res.json(college);
    });
});

router.get('/showDatabase', function(req, res){
    models.College.findAll({}).then(function(college) {
        res.json(college);
    });
});

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/../views/home.html'));
});

module.exports = router;