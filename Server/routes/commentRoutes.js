const express = require("express");
const router = express.Router();
const { createComment, getCommentsByPost } = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", getCommentsByPost);

module.exports = router;
