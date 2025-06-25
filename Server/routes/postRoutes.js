const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");


router.get("/", postController.getPaginatedPosts);
// ✅ Create a post (with image)
router.post("/", authMiddleware, upload.single("image"), postController.createPost);

// ✅ Get all posts
router.get("/", authMiddleware, postController.getAllPosts);


router.put("/:id/like", authMiddleware, postController.toggleLike);

router.post('/:id/comment', authMiddleware, postController.commentOnPost);


router.put('/:id/save', authMiddleware, postController.toggleSave);



// Get Posts by Specific User
router.get("/user/:userId", postController.getUserPosts);


// saved post 

router.get("/saved", authMiddleware, postController.getSavedPosts);

module.exports = router;
