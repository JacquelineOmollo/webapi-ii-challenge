const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.get("/:post_id/comments", (req, res) => {
  const { post_id } = req.params;
  db.findById(post_id)
    .then(([post]) => {
      if (post) {
        db.findPostComments(post_id).then(comments => {
          res.status(200).json(comments);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("get comments", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });

  router.post("/:post_id/comments", (req, res) => {
    const { post_id } = req.params;
    const { text } = req.body;

    if (text === "" || typeof text !== "string") {
      return res.status(400).json({ error: "Comment requires text" });
    }

    db.insertComment({ text, post_id })
      .then(({ id: comment_id }) => {
        db.findCommentById(comment_id)
          .then(([comment]) => {
            if (comment) {
              res.status(200).json(comment);
            } else {
              res.status(404).json({ error: "Comment with id not found" });
            }
          })
          .catch(err => {
            console.log("post comment get", err);
            res.status(500).json({ error: "Error getting comment" });
          });
      })
      .catch(err => {
        console.log("post comment", err);
        res.status(500).json({ error: "Error adding comment" });
      });
  });
});
module.exports = router;
