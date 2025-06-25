const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { caption } = req.body;
  const imageUrl = req.file?.path;
  const userId = req.user._id;

  if (!caption || !imageUrl) {
    return res.status(400).json({ error: "Caption and image are required" });
  }

  try {
    const newPost = new Post({ caption, imageUrl, postedBy: userId });
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
};

// LIKE / UNLIKE a post

// exports.toggleLike = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.user?._id;

//     console.log("🔍 Toggle Like Called");
//     console.log("➡️ Post ID:", postId);
//     console.log("👤 User ID from token:", userId);

//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized: User not found" });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       console.log("❌ Post not found for ID:", postId);
//       return res.status(404).json({ error: "Post not found" });
//     }

//     const isLiked = post.likes.includes(userId.toString());
//     console.log("❤️ Already Liked:", isLiked);

//     if (isLiked) {
//       post.likes.pull(userId);
//       console.log("💔 User unliked the post");
//     } else {
//       post.likes.push(userId);
//       console.log("💖 User liked the post");
//     }

//     await post.save();
//     console.log("✅ Post saved successfully");

//     res.status(200).json({
//       message: isLiked ? "Post unliked" : "Post liked",
//       likes: post.likes,
//     });
//   } catch (error) {
//     console.error("❌ Error toggling like:", error);
//     res.status(500).json({ error: "Server error while toggling like" });
//   }
// };
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    console.log("🔍 Toggle Like Called");
    console.log("➡️ Post ID:", postId);
    console.log("👤 User ID from token:", userId);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      console.log("❌ Post not found for ID:", postId);
      return res.status(404).json({ error: "Post not found" });
    }

    const isLiked = post.likes.includes(userId.toString());
    console.log("❤️ Already Liked:", isLiked);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    // ✅ Skip schema validation
    await post.save({ validateBeforeSave: false });

    console.log("✅ Post saved successfully");

    res.status(200).json({
      message: isLiked ? "Post unliked" : "Post liked",
      likes: post.likes,
    });
  } catch (error) {
    console.error("❌ Error toggling like:", error);
    res.status(500).json({ error: "Server error while toggling like" });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = { text, user: userId };
    post.comments = post.comments || []; // in case it's undefined
    post.comments.push(comment);

    await post.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};




exports.toggleSave = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const isSaved = post.savedBy.includes(userId);
    if (isSaved) {
      post.savedBy.pull(userId);
    } else {
      post.savedBy.push(userId);
    }

   await post.save({ validateBeforeSave: false });

    res.status(200).json({
      message: isSaved ? "Post unsaved" : "Post saved",
      savedBy: post.savedBy,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Server error while saving post" });
  }
};



exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ postedBy: userId })
      .populate("postedBy", "username _id")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Server error while fetching user posts" });
  }
};



// controllers/postController.js

exports.getPaginatedPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; // you can change this value
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("postedBy", "username profilePic");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching paginated posts" });
  }
};


// ✅ Get all saved posts by the logged-in user
exports.getSavedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const savedPosts = await Post.find({ savedBy: userId })
      .populate("postedBy", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching saved posts" });
  }
};
