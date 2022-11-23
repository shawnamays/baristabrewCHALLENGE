//Morning Challenge: A local coffee house is finally starting to take off ever since they introduced cold brew made from Kopi Luwak. They can’t handle their order volume and are starting to drop orders. Create an app that enables the cashier to enter the customer's name and their order. Then add that order to a queue that the baristas can see and give them the ability to mark an order complete. Completed orders should show which barista completed the order and have their own list. Bonus points if the app automatically says the customer's name out loud when an order is complete.


const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const commentsController = require("../controllers/comments")

const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", postsController.getProfile);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);



module.exports = router;


