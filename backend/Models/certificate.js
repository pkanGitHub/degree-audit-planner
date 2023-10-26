const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema({
    title: { type: String, required: true },
    url: String,
    courses: {
        label: String,
        list: [{ id: String, or: [ String ]}],
        info: [{ index: Number, comment: String }]
    },
    credits: [{
        area: { type: String, required: true },
        hours: { type: Number, required: true }
    }]
})

module.exports = mongoose.model('Certificate', certificateSchema)