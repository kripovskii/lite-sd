const mongoose = require ('mongoose');

 const filesSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    customer: {
        type: String
    },
    file: { 
        type: String,
        required: true
    }
 })

 const Files = mongoose.model('Files', filesSchema);
 
module.exports = Files;