const mongoose = require('mongoose')

const minorSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    totalCredit: { type: Number },
    courses: { type: [{
        label: String,
        list: [{ id: String, or: [ String ]}],
        info: [{ index: Number, comment: String }]
    }]},
    hasPlan: { type: Boolean },
    url: { type: String }
})

module.exports = mongoose.model('Minor', minorSchema)