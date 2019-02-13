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
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const user = await Users.insert(req.body);

    if (name) {
      res.status(201).json(user);
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide name for the user." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the user to the database"
    });
  }
});

// DELETE user request

// UPDATE user request

module.exports = router;
