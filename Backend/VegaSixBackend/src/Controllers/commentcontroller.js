const Comment = require("../Models/Comment");

const addComment = async(req,res)=>{
    console.log("Add Comment end point hits...");
    try {
        const {blogId} = req.query;

        const userId = req.user._id;

        const {content} = req.body;

        const comment = await Comment({content,userId,blogId});

        await comment.save();

        res.status(201).json({
            success:true,
            message:"Comment added successfully",
            comment
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

const addReply = async(req,res)=>{
    console.log("Comment end point hits...");
    try {
        const {blogId,parentCommentId} = req.query;
        const userId = req.user._id;

        const {content} = req.body;

        const comment = await Comment({content,userId,blogId,parentComment:parentCommentId});

        await comment.save();

        res.status(201).json({
            success:true,
            message:"Comment added successfully",
            comment
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

module.exports = {addComment,addReply};