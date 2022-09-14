const mongoose  = require('mongoose');
const {Schema} = require('mongoose');
const UserValidator = require('./private/Users');

const UserSschema = new Schema({
    
    fullname  : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required: true,
        
    },
    blogs  :{
        type : Schema.Types.ObjectId,
        ref : "Blogs"
    },
    thumbnail : {
        type : String
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
    
})

UserSschema.statics.Validating = async (body) => {
    await UserValidator.validate(body)
}

const User = mongoose.model("users" ,UserSschema)


module.exports = User