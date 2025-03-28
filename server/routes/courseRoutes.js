const express = require('express');
const Course = require('../models/course');
const UserProfile = require('../models/UserProfile');
const GenerateQuiz = require('../LLM/Quiz');

const router = express.Router();

// CREATE COURSE (Teacher Only)
router.post('/create', async (req, res) => {
    try {
        console.log("Creating course with data:", req.body);
        
        const { image, title, description, teacher, price, category, gmeetLink } = req.body;
        const quiz = await GenerateQuiz(description);
        const course = new Course({ image, title, description, teacher, price, category, gmeetLink ,quiz: quiz });
        console.log("Quiz generated:", quiz);
        
       
        await course.save();
        res.json(course);
    } catch (err) {

        
        res.json({ error: err.message }).status(500);
    }
});

// GET ALL COURSES
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET COURSES IN TEACHER ACCOUNT
router.get('/admin/:adminId', async (req, res) => {
     try {
         const { adminId } = req.params;
         const courses = await Course.find({ teacher: adminId }).populate('teacher', 'name');
         res.status(200).json(courses);
     } catch (err) {
         res.status(500).json({ error: err.message });
     }
 });

// GET COURSE BY ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher students reviews.user');
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ENROLL IN COURSE (Student Only)
router.post('/:id/enroll', async (req, res) => {
    try {
        const { userId } = req.body;
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const student = await UserProfile.findById(userId);
        if (!student) return res.status(404).json({ message: "User not found" });

        if (course.students.includes(userId)) {
            return res.status(400).json({ message: "Already enrolled" });
        }

        course.students.push(userId);
        await course.save();
        res.status(200).json({ message: "Enrolled successfully", course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE COURSE (Teacher Only)
router.put('/:id', async (req, res) => {
    try {
        const { title, description, price, category, gmeetLink } = req.body;
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, price, category, gmeetLink },
            { new: true }
        );
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE COURSE (Teacher Only)
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
