const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comments:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Comment"
            }
        ]
    }
});

blogSchema.index({title:"text"});

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;

