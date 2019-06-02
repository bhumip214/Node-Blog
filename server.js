const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRouter = require("./router/users-router");
const postsRouter = require("./router/posts-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", async (req, res, next) => {
  res.send(`
    <h2>Lambda Blog API</h2>
    <p>Welcome to the Lambda Blog API</p>
  `);
});

module.exports = server;
