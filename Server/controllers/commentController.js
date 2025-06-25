const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const comment = new Comment({
      post: postId,
      user: req.user._id,
      text,
    });

    await comment.save();
    const populatedComment = await comment.populate("user", "username");

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
