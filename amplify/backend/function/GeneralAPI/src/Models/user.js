const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    major: { type: String, required: true },
    coursePlan: {
        semester: [{
            date: { type: Date },
            courses: [{
                inProgress: { type: Boolean, default: false },
                completed: { type: Boolean, required: true },
                completion_date: { type: Date }
            }]
        }]
    },
    generalEducationCompleted: { type: Boolean, required: true, default: false },
    programRequirements: [{
        description: String,
        completed: { type: Boolean, default: false },
        courses: [String],
        creditHours: Number
    }]
})

module.exports = mongoose.model('User', userSchema)