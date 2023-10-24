const mongoose = require('mongoose')

const courseListSchema = mongoose.Schema({
    area: {type: String, required: true, unique: true},
    courses: {type: [{
        courseID: { type: String, required: true },
        name: { type: String, required: true },
        credit: { type: String },
        category: { type: String },
        prerequisites: { type: String },
        recommended: { type: String },
        description: { type: String },
        available: { type: Boolean },
        pastTerms: {type: [{type: String}]}
    }],
    required: true}
})

module.exports = mongoose.model('Courses', courseListSchema)