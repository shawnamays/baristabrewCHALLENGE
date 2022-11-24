// const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");


module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({completed: true});
      const notDone = await Post.find({completed: false});
      // if(posts)
      res.render("profile.ejs", { posts: posts || [], user: req.user, notDone: notDone || []});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({commentFor: req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.body)
    try {
     
      await Post.create({
        customerName: req.body.customerName,
        customerOrder: req.body.customerOrder,
        user: req.user.id,
        completed: false
      });
      console.log("Order has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  completeOrder: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.body._id },
        {
         completed: true
        }
      );
      console.log("Likes +1");
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },

// //this is where im creating the ability to comment.=====================
//   comment: async (req, res) => {
//     try {
//       // Upload image to cloudinary
//       // const result = await cloudinary.uploader.upload(req.file.path);

//       await Post.create({
//         // title: req.body.title,
//         // image: result.secure_url,
//         // cloudinaryId: result.public_id,
//         // caption: req.body.caption,
//         // likes: 0,
//         user: req.user.id,
//         comment: req.body.comment
//       });
//       console.log("comment has been added!");
//       res.redirect("/profile");
//     } catch (err) {
//       console.log(err);
//     }
//   }, 


  

  deleteOrder: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.body._id });
      // Delete post from db
      await Post.remove({ _id: req.body._id });
      console.log("Deleted Order");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
