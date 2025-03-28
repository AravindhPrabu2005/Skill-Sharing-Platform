const mongoose = require('mongoose');

const SkillBarterSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requiredSkill: { type: String, required: true },
    teachableSkill: { type: String, required: true },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('SkillBarter', SkillBarterSchema);
