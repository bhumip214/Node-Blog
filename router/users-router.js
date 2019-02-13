const express = require("express");

const Users = require("../data/helpers/userDb");

const usersRouter = express.Router();

usersRouter.use(express.json());

module.exports = usersRouter;
