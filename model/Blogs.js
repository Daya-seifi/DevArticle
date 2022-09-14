const mongoose  = require('mongoose');
const {Schema} = require('mongoose');
const user = require('./Users');
const BlogValidator = require('./private/Blogs');
const { string } = require('yup');

const BlogSschema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : user
    },
    title : {type : String, required : true},
    description : {type : String, required : true},
    thumbnail : {
        type : String,
    },
    likers : [{
        type : String,
        default : []
    }],
    likecount : {
        type : Number,
        default : 0,
    },
    ViewersIp : [{
     type : String,
     
    }],
    ViewCounter : {
        type : Number,
        default : 0
    }
} , {timestamps : true })

BlogSschema.statics.BlogValidation = async function (body) {
    await BlogValidator.validate(body)
}

BlogSschema.index({title: 'text'});

const Blog = mongoose.model("Blogs" ,BlogSschema)

module.exports = Blog