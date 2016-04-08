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

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

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


var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};
exports.renderSignup = function(req, res, next) {
  if (!req.user) {
    res.render('signup', {
      title: 'Sign-up Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

exports.signup = function(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, function(err) {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};
