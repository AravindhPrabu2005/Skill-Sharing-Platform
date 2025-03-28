const express = require('express');
const SkillBarter = require('../models/SkillBarter');
const router = express.Router();

// Create a skill barter post
router.post('/create', async (req, res) => {
    try {
        const { user, requiredSkill, teachableSkill } = req.body;
        const newPost = new SkillBarter({ user, requiredSkill, teachableSkill });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
});

// Get all skill barter posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await SkillBarter.find().populate('user', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Accept a barter deal
router.post('/accept/:id', async (req, res) => {
    try {
        const post = await SkillBarter.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        post.acceptedBy = req.body.userId;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to accept deal" });
    }
});

module.exports = router;
