// db.js
const mongoose = require('mongoose');

// MongoDB connection string
const uri = "mongodb+srv://root:gmQ3kZT9aKJBQF7W@mernapp.9jdlshy.mongodb.net/?retryWrites=true&w=majority";

// Create a reusable connection
const connection = mongoose.connect(uri);

// Export the connection
module.exports = connection;
