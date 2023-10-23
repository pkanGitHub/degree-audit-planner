const mongoose = require('mongoose')

const minorSchema = mongoose.Schema({
    title: { type: String, required: true },
    totalCredit: { type: Number },
    courses:[
        { course: String, required: Boolean },
    ]
})

module.exports = mongoose.model('Minor', minorSchema)