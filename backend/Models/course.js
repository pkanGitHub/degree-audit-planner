const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
<<<<<<< Updated upstream
    _id: { type: String, unique: true },
=======
>>>>>>> Stashed changes
    courseID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    credit: { type: Number },
    category: { type: String },
    prerequisites: { type: String },
    description: { type: String },
    available: { type: Boolean }
})

module.exports = mongoose.model('Course', courseSchema)