const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
  db.insert({ title, contents })
    .then(({ id }) => {
      getPost(id, res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error inserting post" });
    });

  router.get("/", (req, res) => {
    db.find()
      .then(posts => res.status(200).json(posts))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "This post couldn't be retrieved." });
      });
  });
});
module.exports = router;
