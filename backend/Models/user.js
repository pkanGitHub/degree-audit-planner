const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    major: [{title: String, year: String}],
    minor: [{title: String, year: String}],
    certificate: [{title: String, year: String}],
    courses: [{
        id: String,
        plan: [Number],
        status: String,
        credits: String
    }],
    generalEducationCompleted: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    loginVerificationCode: { type: String },
})

module.exports = mongoose.model('User', userSchema)