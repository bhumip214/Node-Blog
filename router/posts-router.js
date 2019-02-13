const express = require("express");

const Posts = require("../data/helpers/postDb");

const postsRouter = express.Router();

postsRouter.use(express.json());

module.exports = postsRouter;
