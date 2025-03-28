const express = require('express');
const UserProfile = require('../models/UserProfile');

const router = express.Router();

// Create Student Profile
router.post('/create', async (req, res) => {
    try {
        const { id , name, bio, skills, profilePicture } = req.body;
        const student = new UserProfile({id, name, role: 'student', bio, skills, profilePicture });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Student Profile by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await UserProfile.findOne({
            id: req.params.id,
        }).populate('coursesEnrolled');
        if (!student) return res.json({ message: "Student not found" }).status(404);
        res.status(200).json(student);
    } catch (err) {
        return res.json({ error: err.message });
    }
});

// Update Student Profile
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Student Profile
router.delete('/:id', async (req, res) => {
    try {
        await UserProfile.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
