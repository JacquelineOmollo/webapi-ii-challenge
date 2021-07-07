const express = require("express");
const dbRouter = require("./routers/dbRouter");
const server = express();
server.use(express.json());

// const db = require("./data/routers/db-router");
// const messageRouter = require("./data/routers/messages-router");

server.use("/api/posts", dbRouter);
// server.use("/api/comment", messageRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>You got this Jackie!!!</p>
  `);
});

module.exports = server;
