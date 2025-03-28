const express = require('express');
const router = express.Router();
const CommunityPost = require('../models/Community');

// Create a new community post
router.post('/posts', async (req, res) => {
    try {
        const { user, content } = req.body;
        const post = new CommunityPost({ user, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Get all community posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await CommunityPost.find().populate('user', 'name avatar'); 
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


// Like a post
router.post('/posts/:id/like', async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        
        post.likes += 1;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to like post' });
    }
});

// Add a comment to a post
router.post('/posts/:id/comment', async (req, res) => {
    try {
        const { user, content } = req.body;
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.comments.push({ user, content });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

module.exports = router;
