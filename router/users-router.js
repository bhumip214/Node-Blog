const express = require("express");

const Users = require("../data/helpers/userDb");
const Posts = require("../data/helpers/postDb");

const router = express.Router();

router.use(express.json());

const nameUppercase = (req, res, next) => {
  const name = req.body.name;
  if (name[0] !== name[0].toUpperCase()) {
    res.status(400).json({ message: "Username must be in uppercase." });
  } else {
    next();
  }
};

// GET users request
router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The users information could not be retrieved."
    });
  }
});

//GET user by ID request
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The user information could not be retrieved."
    });
  }
});

// POST user request
router.post("/", nameUppercase, async (req, res) => {
  try {
    const user = await Users.insert(req.body);

    if (user.name) {
      res.status(201).json(user);
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide name for the user." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the user."
    });
  }
});

// DELETE user request
router.delete("/:id", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res
        .status(200)
        .json({ message: "The user has been successfully deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The user could not be deleted"
    });
  }
});

// UPDATE user request
router.put("/:id", nameUppercase, async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The user information could not be modified."
    });
  }
});

//GET user posts request
router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The posts information for user could not be retrieved."
    });
  }
});

//GET post by ID request
router.get("/:id/posts/:postId", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.postId);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
});

// // POST post request
router.post("/:id/posts", async (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  try {
    const post = await Posts.insert(postInfo);

    if (post.text && post.user_id) {
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: "Please provide the text for the post."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the post."
    });
  }
});

// DELETE post request
router.delete("/:id/posts/:postId", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.postId);
    if (count > 0) {
      res
        .status(200)
        .json({ message: "The post has been successfully deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post could not be deleted"
    });
  }
});

// UPDATE post request
router.put("/:id/posts/:postId", async (req, res) => {
  try {
    const post = await Posts.update(req.params.postId, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be modified."
    });
  }
});

module.exports = router;
