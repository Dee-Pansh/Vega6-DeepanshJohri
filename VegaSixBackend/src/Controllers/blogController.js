const Blog = require("../Models/Blog");
const { uploadMediaToCloudinary } = require("../Utils/uploadMediaToCloudinary");

const addBlog = async (req, res) => {
    console.log("Add blog end point hits...")
    try {
        const { title, description } = req.body;
        let imageUrl = "";
        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;

            console.log(`File details : fileName: ${originalname}, fileType:  ${mimetype}`);

            console.log("uploading to cloudinary starting...");

            const imageResult = await uploadMediaToCloudinary(buffer);

            const { public_id, secure_url } = imageResult;

            console.log(`File uploaded successfully to cloudinary, Public Id : ${public_id}`);

            imageUrl = secure_url;
        }

        const newBlog = await Blog({ title, description, imageUrl, userId: req.user._id });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            savedBlog
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

const getAllBlogs = async (req, res) => {
    console.log("Get all blogs end point hits...");
    try {
        const userId = req.user._id;
        const allBlogs = await Blog.find({ userId }).select("-userId");
        res.status(200).json({
            success: true,
            blogs: allBlogs
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

const updateBlog = async (req, res) => {
    console.log("Update Blog endpoint hits...");
    try {

        const data = req.body;
        const { blogId } = req.query;

        const existingBlog = await Blog.findById({ _id: blogId });

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        if(existingBlog.userId !== req.user._id)
            {
                return res.status(400).json({
                    success: false,
                    message: "This blog is not associated with you"
                });
            }

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;

            console.log(`File Details : File Name : ${originalname}, File Type : ${mimetype}`);

            console.log("Uploading to cloudinary starts....")

            const imageResult = await uploadMediaToCloudinary(buffer);

            const { public_id, secure_url } = imageResult;

            console.log(`Image uploaded to cloudinary , PublicId : ${public_id}`);

            imageUrl = secure_url;
            data.imageUrl = imageUrl;
        }

        const updatedUser = await Blog.updateOne({ _id: blogId }, data)

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            updatedUser
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

const deleteBlog = async(req,res)=>{
    console.log("Delete Blog endpoint hits...");
    try {

        const {blogId} = req.params;

        const existingBlog = await Blog.findById({ _id: blogId });

        if(existingBlog.userId !== req.user._id)
        {
            return res.status(400).json({
                success: false,
                message: "This blog is not associated with you"
            });
        }

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const deletedBlog = await Blog.deleteOne({_id:blogId});

        res.status(200).json({
            success:true,
            message:`Blog with blogId : ${blogId} deleted successfully!!`
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}



module.exports = { addBlog, getAllBlogs, updateBlog, deleteBlog };