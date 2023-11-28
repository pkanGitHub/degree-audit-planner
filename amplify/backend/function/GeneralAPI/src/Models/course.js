const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    courseID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    credit: { type: Number },
    category: { type: String },
    prerequisites: { type: String },
    description: { type: String },
    available: { type: Boolean }
});