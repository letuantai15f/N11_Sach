const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    gender: {
        type: String
    },
    date: { type: String },

    email: { type: String },
    
    password: { type: String }


});
let User = mongoose.model('User', userSchema);
module.exports = { User };