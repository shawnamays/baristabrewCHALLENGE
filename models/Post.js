const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: false,
  },
  
  customerOrder: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Boolean,
    required: false,
  }
});

module.exports = mongoose.model("Post", PostSchema);
