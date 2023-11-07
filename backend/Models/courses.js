const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    area: {type: String, unique: true, required: true},
    courses: {type: [{
        courseID: { type: String, required: true },
        name: { type: String, required: true },
        credit: String,
        category: String,
        prerequisites: String,
        description: String,
        pastTerms: [ String ],
        available: Boolean
    }], required: true}
})

module.exports = mongoose.model('Courses', coursesSchema)