const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    major: [String],
    minor: [String],
    certificate: [String],
    courses: [{
        id: String,
        plan: [Number],
        status: String,
        credits: String
    }],
    generalEducationCompleted: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false }, // Add this field for email verification
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date }
});