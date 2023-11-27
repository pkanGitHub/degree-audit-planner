const mongoose = require('mongoose')

const minorSchema = mongoose.Schema({
    year: String,
    programs: [{
        title: { type: String, required: true },
        totalCredit: Number,
        requirements: { type: [{
            label: String,
            credits: String,        // if credits has a value but required is false, trust credits
            required: String,       // Will be either true(all required), false(none required), or a number(representing total classes required)
            list: { type: [{ id: String, or: { type: [String], default: undefined }}], default: undefined },
            info: { type: [{ index: Number, comment: String }], default: undefined }
        }], default: undefined },
        url: { type: String }
    }]
})

module.exports = mongoose.model('Minor', minorSchema)