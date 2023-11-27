const mongoose = require('mongoose')

const courseListSchema = mongoose.Schema({
    area: {type: String, required: true, unique: true},
    courses: {type: [{
        courseID: { type: String, required: true },
        name: { type: String, required: true },
        credit: String,
        categories: [ String ],
        prerequisites: String,
        description: String,
        pastTerms: [ String ],
        available: Boolean
    }], required: true}
})

module.exports = mongoose.model('Courses', courseListSchema)
