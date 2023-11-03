const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema({
    title: { type: String, required: true },
    url: String,
    courses: {
        label: String,
        list: { type: [{ id: String, or: { type: [ String ], default: undefined }}], default: undefined },
        info: { type: [{ index: Number, comment: String }], default: undefined }
    },
    credits: { type: [{
        area: { type: String, required: true },
        hours: { type: Number, required: true }
    }], default: undefined }
})

module.exports = mongoose.model('Certificate', certificateSchema)