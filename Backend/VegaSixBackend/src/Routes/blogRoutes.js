const express = require("express");
const { addBlog, getAllBlogs, updateBlog, deleteBlog } = require("../Controllers/blogcontroller");

const router = express.Router();
const multer = require("multer");
const { userAuth } = require("../Middlewares/Auth");
const upload = multer();

router.post("/addBlog",upload.single("image"),userAuth,addBlog);

router.get("/getAllBlogs",upload.single("image"),userAuth,getAllBlogs);

router.patch("/updateBlog",upload.single("image"),userAuth,updateBlog);

router.delete("/deleteBlog/:blogId",userAuth,deleteBlog);

module.exports = router;