const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Blog = require('./Blog');


var userSchema = new mongoose.Schema({   
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true},
    fullname : {
        firstname : {type : String, default: ""},
        lastname : {type: String, default : ""},
        middlename: {type: String, default : ""},
    },
    profilePictureUrl: {type: String, default: "https://i.stack.imgur.com/l60Hf.png"},
    mobile_no: {type: String, default: "not updated!"},
    created_on : {
        type : String,
        default : ""
    },
    blogContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

module.exports = User;