const mongoose = require('mongoose')

const majorSchema = mongoose.Schema({
    year: String,
    programs: [{
        title: { type: String, required: true },
        requirements: { type: [{
            label: String,
            credits: String,        // if credits has a value but required is false, trust credits
            required: String,       // Will be either true(all required), false(none required), or a number(representing total classes required)
            list: { type: [{ id: String, or: { type: [String], default: undefined }}], default: undefined },
            info: { type: [{ index: Number, comment: String }], default: undefined }
        }], default: undefined },
        years: {type: [{
            label: String,
            semesters: { type: [{ 
                label: { type: String, required: true },
                courses: { type: [{ id: String, or: { type: [String], default: undefined }, misc: String}], default: undefined },
            }], default: undefined },
        }]},
        url: String
    }]

})

module.exports = mongoose.model('Major2', majorSchema)