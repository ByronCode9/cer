const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
