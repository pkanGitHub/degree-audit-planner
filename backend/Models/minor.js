const mongoose = require('mongoose')

const minorSchema = mongoose.Schema({
    _id: { type: String, unique: true },
    title: { type: String, required: true },
    totalCredit: { type: Number },
    courses:[
        { course: String, required: Boolean },
    ]
})

module.exports = mongoose.model('Minor', minorSchema)