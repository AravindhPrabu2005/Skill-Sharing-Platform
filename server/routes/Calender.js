const express = require('express');
const CourseRegistration = require('../models/CourseRegistration');
const Course = require('../models/course');

const router = express.Router();

// Get courses a user is registered for on a specific date
router.get('/courses', async (req, res) => {
    try {
        const { userId, date } = req.query;

        if (!userId || !date) {
            return res.status(400).json({ message: "Missing userId or date" });
        }

        const formattedDate = new Date(date);
        formattedDate.setHours(0, 0, 0, 0); 

        // Find course registrations matching the user and date
        const registrations = await CourseRegistration.find({ user: userId })
            .populate({
                path: 'course',
                select: 'title description gmeetLink createdAt',
                match: { createdAt: { $gte: formattedDate, $lt: new Date(formattedDate.getTime() + 86400000) } }
            });

        const courses = registrations
            .filter(reg => reg.course) 
            .map(reg => reg.course);

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
