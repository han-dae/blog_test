const express = require("express");
const { auth } = require("../../middleware/auth");
const { Post } = require("../../models/category");
const { Category } = require("../../models/category");
const { Comment } = require("../../models/comment");
const { User } = require("../../models/user");

const router = express.Router();

const dotenv = require("dotenv");
const moment = require("moment");
const { isNullOrUndefined } = require("util");

dotenv.config();

//loading all posts / get
router.get("/", async (req, res) => {
  try {
    const postFindResult = await Post.find();
    const categoryFindResult = await Category.find();
    const result = { postFindResult, categoryFindResult };

    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "NO POST" });
  }
});

router.post("/write", auth, async (req, res, next) => {
  try {
    const { title, contents, fileUrl, creator, category } = req.body;

    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator: req.user.id,
      date: moment().format("MMMM DD, YYYY"),
    });

    const categoryFindResult = await Category.findOne({
      categoryName: category,
    });
    if (isNullOrUndefined(categoryFindResult)) {
      const newCategory = await Category.create({
        categoryName: category,
      });

      await Post.findByIdAndUpdate(newPost._id, {
        $push: {
          category: newCategory._id,
        },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          posts: newPost._id,
        },
      });

      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else {
      await Category.findByIdAndUpdate(categoryFindResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: categoryFindResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    }

    return res.redirect(`/api/post/${newPost_id}`);
  } catch (e) {
    console.log(e);
  }
});

// post detail / get
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();

    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      post: req.params.id,
      comments: { post_id: req.params.id },
    },
  });

  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }

  return res.json({ success: true });
});

module.exports = router;
