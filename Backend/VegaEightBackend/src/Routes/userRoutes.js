const express = require("express");
const {loginController,signUpController} = require("../Controllers/usercontroller");
const router = express.Router();
const multer = require("multer");
const upload = multer();


router.post("/login",loginController);
router.post("/signup",upload.single("image"),signUpController);

module.exports = router;

