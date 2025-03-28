const express = require('express');
const CourseRegistration = require('../models/CourseRegistration');
const Course = require('../models/course');
const User = require('../models/UserProfile');

const router = express.Router();

// Register a user for a course
router.post('/register', async (req, res) => {
    try {
        const { userId, courseId, gmeetLink } = req.body;

        if (!userId || !courseId || !gmeetLink) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Check if the user is already registered for the course
        const existingRegistration = await CourseRegistration.findOne({ user: userId, course: courseId });
        if (existingRegistration) {
            return res.status(400).json({ message: "User already registered for this course" });
        }

        // Register the user for the course
        const registration = new CourseRegistration({
            user: userId,
            course: courseId,
            gmeetLink
        });

        await registration.save();
        res.status(201).json({ message: "Registration successful", registration });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all courses a user is registered for
router.get('/user/:userId', async (req, res) => {
    try {
        const registrations = await CourseRegistration.find({ user: req.params.userId })
            .populate('course', 'title description')
            .populate('user', 'name role');

        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all users registered for a specific course
router.get('/course/:courseId', async (req, res) => {
    try {
        const registrations = await CourseRegistration.find({ course: req.params.courseId })
            .populate('user', 'name role')
            .populate('course', 'title description');

        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cancel a course registration
router.delete('/cancel/:registrationId', async (req, res) => {
    try {
        const registration = await CourseRegistration.findByIdAndDelete(req.params.registrationId);
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json({ message: "Registration cancelled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
