const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    major: [String],
    minor: [String],
    certificate: [String],
    courses: [{
        id: String,
        plan: [Number]
    }],
    generalEducationCompleted: { type: Boolean, default: false }
})

module.exports = mongoose.model('User2', userSchema)