const mongoose = require('mongoose')

const minorSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    totalCredit: Number,
    courses: { type: [{
        label: String,
        list: { type: [{ id: String, or: [ String ]}], default: undefined },
        info: { type: [{ index: Number, comment: String }], default: undefined }
    }], default: undefined },
    hasPlan: { type: Boolean },
    url: { type: String }
})

module.exports = mongoose.model('Minor', minorSchema)