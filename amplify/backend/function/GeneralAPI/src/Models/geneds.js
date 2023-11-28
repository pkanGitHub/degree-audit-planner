const mongoose = require("mongoose");

module.exports = mongoose.Schema({
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