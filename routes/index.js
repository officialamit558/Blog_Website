// routes/index.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');
const User = require('../models/User');

// Passport.js configuration
router.use(passport.initialize());
router.use(passport.session());

// Define route for the root URL ('/')
router.get('/', async (req, res) => {
  try {
      const posts = await Post.find().sort({ createdAt: 'desc' });
      res.render('index', { posts });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});


// Define routes for user authentication
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        await User.register(user, password);
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Define route for creating a new post
router.get('/posts/new', (req, res) => {
    res.render('create');
});

router.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new Post({ title, content });
        await post.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Define route for updating a post
router.get('/posts/:id/edit', async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      res.render('edit', { post });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
      const { title, content } = req.body;
      await Post.findByIdAndUpdate(req.params.id, { title, content });
      res.redirect('/posts');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

// Define route for deleting a post
router.delete('/posts/:id', async (req, res) => {
  try {
      await Post.findByIdAndDelete(req.params.id);
      res.redirect('/');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
