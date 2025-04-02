const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    },
},
{
    timestamps:true
});

commentSchema.index({ content: "text" });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

