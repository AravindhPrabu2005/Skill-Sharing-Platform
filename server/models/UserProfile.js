const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ['student'], required: true },
    bio: { type: String },
    skills: [{ type: String }],
    profilePicture: { 
        type: String, 
        default: 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg' 
    },
    coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', UserProfileSchema);
