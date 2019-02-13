const express = require("express");

const Users = require("../data/helpers/userDb");

const router = express.Router();

router.use(express.json());

// GET users request
router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users"
    });
  }
});

//GET user by ID request

// POST user request

// DELETE user request

// UPDATE user request

module.exports = router;
