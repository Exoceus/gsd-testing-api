const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String
    },
    alloted_time: {
        type: String
    },
    alloted_break: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true
    },
    time_left: {
        type: String
    },
    ongoing: {
        type: Boolean
    },
}, {
    timestamps: true,
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;