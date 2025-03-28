const mongoose = require('mongoose');

const CourseRegistrationSchema = new mongoose.Schema({
    user: {type:String} ,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    registrationDate: { type: Date, default: Date.now },
    name: {type:String},
    status: { type: String, enum: ['registered', 'completed', 'cancelled'], default: 'registered' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    gmeetLink: { type: String, required: true },
    points: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('CourseRegistration', CourseRegistrationSchema);
