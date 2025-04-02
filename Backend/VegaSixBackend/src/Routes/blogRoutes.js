const express = require("express");
const { addBlog, getAllBlogs, updateBlog, deleteBlog } = require("../Controllers/blogcontroller");

const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/addBlog",upload.single("image"),addBlog);

router.get("/getAllBlogs",upload.single("image"),getAllBlogs);

router.patch("/updateBlog",upload.single("image"),updateBlog);

router.delete("/deleteBlog/:blogId",deleteBlog);

module.exports = router;