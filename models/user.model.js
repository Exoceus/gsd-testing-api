const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    UID: {
        type: String
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;