const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    fieldname: {
        type: String,
        required: true,
        unique: true
    },
    originalname: {
        type: String
    },
    encoding: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
})

const Files = mongoose.model('Files', filesSchema);

module.exports = Files;