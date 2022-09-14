const mongoose  = require('mongoose');
const {Schema} = require('mongoose');
const user = require('./Users');
const Blog = require('./Blogs');
const CMValidator = require('./private/Comments');


const CommentsSschema = new Schema({
        body: {
            type: String,
        },
        writer: {
            type : Schema.Types.ObjectId,
            ref : user,
        },
        Createddate: {
            type: Date,
            default : Date.now
        },
        post : {
            type : Schema.Types.ObjectId,
            ref : Blog,
        }
}
)
CommentsSschema.statics.CMvalidating =async function (body) {
    await CMValidator.validate(body)
}


const comment = mongoose.model("Comments" ,CommentsSschema)

module.exports = comment