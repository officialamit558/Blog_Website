// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/Post')

// Define route for creating a new post
router.get('/new', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
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
router.get('/:id/edit', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit', { post });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// Route for updating a post
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, content }); // Assuming Post model has update method
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// Define route for deleting a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
