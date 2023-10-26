const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    area: {type: String, unique: true, required: true},
    courses: {type: [{
        courseID: { type: String, required: true },
        name: { type: String, required: true },
        credit: { type: Number },
        category: { type: String },
        prerequisites: { type: String },
        description: { type: String },
        available: { type: Boolean }
    }], required: true}
})

module.exports = mongoose.model('Courses', coursesSchema)