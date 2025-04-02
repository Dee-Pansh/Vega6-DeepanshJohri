const express = require("express");
const { addComment, addReply } = require("../Controllers/commentcontroller");

const router = express.Router();

router.post("/addComment",addComment);
router.post("/addReply",addReply);

module.exports = router;