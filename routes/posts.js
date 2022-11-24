const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", postsController.createPost);

router.put("/completeOrder", postsController.completeOrder);

router.delete("/deleteOrder", postsController.deleteOrder);

module.exports = router;

