var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/users.controller')

var isLoggedin = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.render('login');
}


module.exports = function(passport) {

  /* GET login page. */
  router.get('/', function(req, res) {
    var tempName;
    if(req.isAuthenticated()) {
        tempName = req.user.firstName + " " + req.user.lastName;
        console.log(tempName);
    }
    res.render('index', {
      title: 'BYU Startups',
      isLoggedIn: req.isAuthenticated(),
    });
  });

  /* Handle Login POST */

  // router.post('/login', passport.authenticate('login', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/login',
  //   failureFlash: true
  // }));

  router.route('/login')
     .get(users.renderSignin)
     .post(passport.authenticate('login', {
       successRedirect: '/profile',
       failureRedirect: '/login',
       failureFlash: true
     }));

  /* GET Login Page */
  // router.get('/login', function(req, res) {
  //   res.render('login');
  // });

  /* GET Registration Page */
  router.route('/signup')
     .get(users.renderSignup)
     .post(users.signup);

  // router.get('/signup', function(req, res) {
  //   res.render('signup');
  // });

  /* GET Profile Page */
  router.get('/profile', isLoggedin, function(req, res) {
    res.render('profile', {
      title: 'BYU Profile'
    });
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }));

  /* Handle Logout */
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

  router.get('/logout', users.signout);

  router.get('/users', function(req, res, next) {
    console.log(req.user.username);
    User.find(function(err, users) {
      if(err) {return next(err);}
      res.json(users);
    });
  });

  return router;
}
