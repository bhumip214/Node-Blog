const express = require("express");

const Posts = require("../data/helpers/postDb");

const router = express.Router();

router.use(express.json());

// GET posts request
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved."
    });
  }
});

module.exports = router;
