var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var isLoggedin = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.render('login');
}


module.exports = function(passport) {

  /* GET login page. */
  router.get('/', function(req, res) {
    res.render('index', {
      title: 'BYU Startups',
      isLoggedIn: req.isAuthenticated()
    });
  });

  /* Handle Login POST */
  // router.post('/login', passport.authenticate('login', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/login'
  // }));

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.render('login', { message: "Invalid username or password." }); }
      return res.redirect('/profile');
    })(req, res, next);
  });


  /* GET Login Page */
  router.get('/login', function(req, res) {
    res.render('login', { message: "" });
  });

  /* GET Registration Page */
  router.get('/signup', function(req, res) {
    res.render('signup');
  });

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
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/users', function(req, res, next) {
    console.log(req.body);
    User.find(function(err, users) {
      if(err) {return next(err);}
      res.json(users);
    });
  });

  return router;
}
