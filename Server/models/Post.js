const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   caption: {
//     type: String,
//     required: true
//   },
//   imageUrl: {
//     type: String,
//     required: true
//   },
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, { timestamps: true });

const postSchema = new mongoose.Schema({
  caption: String,
  imageUrl: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
   comments: [
    {
      text: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now }
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);