const express = require("express");

const dbRouter = require("./data/routers/db-router");

const messageRouter = require("./data/routers/messages-router");

const server = express();

server.use(express.json());

server.use("/api/posts", dbRouter);
server.use("/api/message", messageRouter);

module.exports = server;
