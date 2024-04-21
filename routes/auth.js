// routes/auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');

// Google authentication route
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Login post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Register post
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
// Profile page
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
  });
  
  // Middleware to check if user is authenticated
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

module.exports = router;
