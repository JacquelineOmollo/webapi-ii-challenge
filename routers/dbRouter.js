const express = require("express");
const router = express.Router();
const db = require("../data/db");

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
  db.insert({ title, contents })
    .then(({ id }) => {
      getComment(id, res);
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

  function getComment(id, res) {
    return db
      .findById(id)
      .then(([post]) => {
        console.log(post);
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ error: "Post with id does not exist" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error getting post", id: id });
      });
  }

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    getPost(id, res);
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    if (!title && !contents) {
      return res.status(400).json({ error: "Need changes" });
    }

    db.update(id, { title, contents })
      .then(updated => {
        if (updated) {
          getPost(id, res);
        } else {
          res.status(404).json({ error: "Post with id does not exist" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error updating post" });
      });
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
      .then(removed => {
        if (removed) {
          res.status(204).end();
        } else {
          res.status(404).json({ error: "Post with id does not exist" });
        }
      })
      .catch(err => {
        console.log("delete", err);
        res.status(500).json({ error: "Error deleting post" });
      });
  });
});
module.exports = router;
