const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherProfile', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    gmeetLink: { type: String, required: true }, 
    ratings: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
            comment: String,
            rating: { type: Number, min: 1, max: 5 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
