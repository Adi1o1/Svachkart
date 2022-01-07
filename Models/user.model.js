/**
 * @file User schema.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

//imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema Definition of 'users'
const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3 
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    role:{
        type: Number,
        require: true,
        trim: true,
        minlength: 1
    },
    address:{
        type: String,
        minlength: 0,
        maxlength: 50,
    },
    phone:{
        type: Number,
        minlength: 10,
        maxlength: 14,
    },
    gender:{
        type: String,
        maxlength: 6,
    },
    DOB:{
        type: Date,
    }
}, {
    timestamps: true,
});

//exporting the schema
module.exports = mongoose.model('user', userSchema);