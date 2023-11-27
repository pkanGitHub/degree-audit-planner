const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    emailVerified: { type: Boolean, default: false } // Add this field for email verification
})

module.exports = mongoose.model('User', userSchema)