const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema({
    title: { type: String, required: true },
    url: String,
    requirements: { type: [{
        label: String,
        credits: String,        // if credits has a value but required is false, trust credits
        required: String,       // Will be either true(all required), false(none required), or a number(representing total classes required)
        list: { type: [{ id: String, or: { type: [String], default: undefined }}], default: undefined },
        info: { type: [{ index: Number, comment: String }], default: undefined }
    }], default: undefined },
    years: {type: [{
        label: String,
        courses: { type: [{ id: String, or: { type: [String], default: undefined }, misc: String}], default: undefined },
    }], default: undefined},
})

module.exports = mongoose.model('Certificate', certificateSchema)