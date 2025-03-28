const express = require('express');
const TeacherProfile = require('../models/TeacherProfile');

const router = express.Router();

// Create Teacher Profile
router.post('/create', async (req, res) => {
    try {
        const { name, bio, skills, profilePicture } = req.body;
        const teacher = new TeacherProfile({ name, role: 'teacher', bio, skills, profilePicture });
        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Teacher Profile by ID
router.get('/:id', async (req, res) => {
    try {
        const teacher = await TeacherProfile.findById(req.params.id).populate('coursesTaught reviews.user');
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Teacher Profile
router.put('/:id', async (req, res) => {
    try {
        const updatedTeacher = await TeacherProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Teacher Profile
router.delete('/:id', async (req, res) => {
    try {
        await TeacherProfile.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
