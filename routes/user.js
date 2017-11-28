

module.exports = function(passport, user) {

    var express = require('express');
    var models = require('../models/index');
    const path = require('path');
//var passport = require('passport');
    var databaseHandler = require('../Objects/databaseHandler');
    var application = require('../Objects/application');
    var router = express.Router();

    router.post('/createUser', function (req, res) {

    });

    router.get('/getUsernames', function (req, res) {
        models.User.findAll({
            attributes: ['userName']
        }).then(function (userNames) {
            res.json(userNames);
        }).catch(function () {
            res.status(500);
            res.json({'error': 'Can\' get usernames'});
        });
    });

    router.get('/getEmails', function (req, res) {
        models.User.findAll({
            attributes: ['email']
        }).then(function (emails) {
            res.json(emails);
        }).catch(function () {
            res.status(500);
            res.json({'error': 'Can\' get emails'});
        });
    });


    router.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/user/success-sign-in',
            failureRedirect: '/user/failure-sign-in'
    }));

    router.get('/signout', function(req, res){
        req.session.destroy(function(err) {
            res.json({'status': 'success'});
        });
    });

    router.get('/success-sign-in', function (req, res) {
        res.json({'status': 'success'});
    });

    router.get('/failure-sign-in', function (req, res) {
        res.json({'status': 'failure'});
    });

    router.get('/currentUser', function (req, res) {
        if(req.user === undefined){
            res.json({'userName': 'null'})
        } else {
            res.json({'user': req.user});
        }
    });

    router.post('/register', function (req, res) {
        delete req.body.password_confirm;
        models.User.generateHash(req.body.password).then(function (password) {
            req.body.password = password;
            models.User.create(req.body).then(function (user) {
                res.json(user);
            }).catch(function (data) {
                res.json({'error': 'There was an error', 'errorMessage': data});
            });
        }).catch(function (data) {
            res.json({'error': 'There was an error', 'errorMessage': data});
        });
    });

    router.post('/addForm', checkAuthentication, function(req, res){
        models.form.create(req.body).then(function() {
            res.status(200);
            res.json({'Message':'Success!'});
        }).catch(function(data) {
            res.status(500);
            res.json({ 'error': 'There was an error', 'errorMessage': data });
        });
    });

    router.delete('/form/:title', checkAuthentication, function(req, res){
        models.form.destroy({
            where: {'title' : req.params.title, 'owner' : req.user.userName, 'college' : req.query.theCollege}
        }).then(function(){
            res.json({'message': 'success'});
        }).catch(function(error){
            res.json({'message': 'error', 'messageContent' : error});
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

    return router;
};

//module.exports = router;