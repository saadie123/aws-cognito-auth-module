const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate:{
            validator: (value)=>{
                return validator.isEmail(value)
            },
            message: "{VALUE} is not a valid Email address"
        }
    }
});

module.exports = mongoose.model('users', userSchema);