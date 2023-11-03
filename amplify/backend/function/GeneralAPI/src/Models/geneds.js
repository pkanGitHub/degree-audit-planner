const mongoose = require("mongoose");

const genedSchema = mongoose.Schema({
    year: Number,
    requirements: [{
        label: String,
        hours: Number,
        completion: Boolean,
        info: String,
        categories: { type: [String], default: undefined },
            properties: { type: [String], default: undefined },
        sub: { type: [{
            label: String,
            hours: Number,
            info: String,
            categories: { type: [String], default: undefined },
            properties: { type: [String], default: undefined }
        }], default: undefined }
    }]
});

module.exports = mongoose.model('GenEds', genedSchema)