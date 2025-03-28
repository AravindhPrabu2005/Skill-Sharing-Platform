const mongoose = require('mongoose');

const TeacherProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ['teacher'], required: true },
    bio: { type: String },
    skills: [{ type: String }],
    profilePicture: { 
        type: String, 
        default: 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg' 
    },
    coursesTaught: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    ratings: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
            comment: String,
            rating: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', TeacherProfileSchema);
